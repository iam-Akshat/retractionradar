import { NextRequest, NextResponse } from 'next/server';

import type {
  EvidenceItem,
  IntegrityStatus,
  ReplacementCandidate,
  ScholarlyReference,
} from '@/lib/references';

const DOI_PATTERN = /^10\.\d{4,9}\/[-._;()/:a-z0-9]+$/i;
const MAX_REFERENCES = 25;
const OPENALEX_ROOT = 'https://api.openalex.org';
const CROSSREF_ROOT = 'https://api.crossref.org';

type JsonRecord = Record<string, unknown>;

function record(value: unknown): JsonRecord {
  return value && typeof value === 'object' ? (value as JsonRecord) : {};
}

function array(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function string(value: unknown): string | null {
  return typeof value === 'string' ? value : null;
}

function number(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null;
}

function cleanDoi(raw: string): string {
  return raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/[),.;]+$/, '')
    .toLowerCase();
}

function safeDois(value: unknown): string[] {
  return [...new Set(array(value).filter((item): item is string => typeof item === 'string').map(cleanDoi))]
    .filter((doi) => DOI_PATTERN.test(doi))
    .slice(0, MAX_REFERENCES);
}

function authorSummary(value: unknown): string {
  const names = array(value)
    .map(record)
    .map((author) => [string(author.given), string(author.family)].filter(Boolean).join(' '))
    .filter(Boolean);
  if (!names.length) return 'Authors unavailable';
  if (names.length <= 3) return names.join(', ');
  return `${names.slice(0, 3).join(', ')} et al.`;
}

function openAlexAuthors(value: unknown): string {
  const names = array(value)
    .map(record)
    .map((authorship) => string(record(authorship.author).display_name))
    .filter((name): name is string => Boolean(name));
  if (!names.length) return 'Authors unavailable';
  if (names.length <= 3) return names.join(', ');
  return `${names.slice(0, 3).join(', ')} et al.`;
}

function yearFromCrossref(message: JsonRecord): number | null {
  const date = record(message.published);
  const firstPart = array(date['date-parts'])[0];
  return Array.isArray(firstPart) && typeof firstPart[0] === 'number' ? firstPart[0] : null;
}

function relationStatus(message: JsonRecord, openAlex: JsonRecord): {
  status: IntegrityStatus;
  finding: string;
  noticeDoi: string | null;
} {
  const updates = array(message['updated-by']).map(record);
  const normalized = updates.map((item) => ({
    type: (string(item.type) || '').toLowerCase(),
    label: string(item.label),
    doi: string(item.DOI),
    source: string(item.source),
  }));
  const retraction = normalized.find((item) => item.type.includes('retract'));
  if (retraction || openAlex.is_retracted === true) {
    const notice = retraction?.doi || null;
    return {
      status: 'retracted',
      noticeDoi: notice,
      finding: notice
        ? `Publisher retraction relation found. Notice DOI: ${notice}.`
        : 'OpenAlex marks this work as retracted; inspect the linked publisher record before relying on it.',
    };
  }
  const concern = normalized.find((item) => item.type.includes('concern'));
  if (concern) {
    return {
      status: 'concern',
      noticeDoi: concern.doi,
      finding: `Expression-of-concern relation found${concern.doi ? `. Notice DOI: ${concern.doi}.` : '.'}`,
    };
  }
  const correction = normalized.find((item) => item.type.includes('correct'));
  if (correction) {
    return {
      status: 'corrected',
      noticeDoi: correction.doi,
      finding: `Correction relation found${correction.doi ? `. Correction DOI: ${correction.doi}.` : '.'}`,
    };
  }
  return {
    status: 'verified',
    noticeDoi: null,
    finding: 'DOI resolved. No retraction, correction, or expression-of-concern relation was returned by the checked sources.',
  };
}

async function crossrefWork(doi: string): Promise<JsonRecord | null> {
  const url = new URL(`${CROSSREF_ROOT}/works/${encodeURIComponent(doi)}`);
  if (process.env.CROSSREF_MAILTO) {
    url.searchParams.set('mailto', process.env.CROSSREF_MAILTO);
  }
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'RetractionRadar/0.1 (reference-integrity-workbench)',
    },
    next: { revalidate: 3600 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Crossref returned ${response.status}`);
  const root = record(await response.json());
  return record(root.message);
}

async function openAlexWork(doi: string): Promise<JsonRecord | null> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (process.env.OPENALEX_API_KEY) headers.Authorization = `Bearer ${process.env.OPENALEX_API_KEY}`;
  const response = await fetch(`${OPENALEX_ROOT}/works/${encodeURIComponent(`https://doi.org/${doi}`)}`, {
    headers,
    next: { revalidate: 3600 },
  });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
  return record(await response.json());
}

async function verifyOne(doi: string): Promise<ScholarlyReference> {
  const checkedAt = new Date().toISOString();
  const [crossrefResult, openAlexResult] = await Promise.allSettled([
    crossrefWork(doi),
    openAlexWork(doi),
  ]);
  const crossref = crossrefResult.status === 'fulfilled' ? crossrefResult.value : null;
  const openAlex = openAlexResult.status === 'fulfilled' ? openAlexResult.value : null;

  if (!crossref && !openAlex) {
    return {
      id: doi,
      doi,
      title: 'Metadata unresolved',
      authors: 'Authors unavailable',
      journal: 'Source unavailable',
      year: null,
      status: 'unresolved',
      finding: 'Neither Crossref nor OpenAlex returned a record for this DOI. Verify the identifier manually.',
      noticeDoi: null,
      openAlexId: null,
      citedByCount: null,
      topics: [],
      evidence: [],
    };
  }

  const title = string(array(crossref?.title)[0]) || string(openAlex?.title) || 'Untitled scholarly work';
  const container = string(array(crossref?.['container-title'])[0]) || string(record(record(openAlex?.primary_location).source).display_name) || 'Source unavailable';
  const status = relationStatus(crossref || {}, openAlex || {});
  const evidence: EvidenceItem[] = [];
  if (crossref) evidence.push({ source: 'Crossref', label: 'DOI registry metadata and update relations', url: `https://api.crossref.org/works/${encodeURIComponent(doi)}`, checkedAt });
  if (openAlex) evidence.push({ source: 'OpenAlex', label: 'Scholarly graph metadata and retraction flag', url: string(openAlex.id) || `https://openalex.org/works/https://doi.org/${encodeURIComponent(doi)}`, checkedAt });

  return {
    id: doi,
    doi,
    title,
    authors: crossref ? authorSummary(crossref.author) : openAlexAuthors(openAlex?.authorships),
    journal: container.replace(/&amp;/g, '&'),
    year: crossref ? yearFromCrossref(crossref) : number(openAlex?.publication_year),
    status: status.status,
    finding: status.finding,
    noticeDoi: status.noticeDoi,
    openAlexId: string(openAlex?.id),
    citedByCount: number(openAlex?.cited_by_count),
    topics: array(openAlex?.topics).map(record).map((topic) => string(topic.display_name)).filter((topic): topic is string => Boolean(topic)).slice(0, 4),
    evidence,
  };
}

async function searchOpenAlex(query: string, excludeDoi: string): Promise<ReplacementCandidate[]> {
  const url = new URL(`${OPENALEX_ROOT}/works`);
  url.searchParams.set('search', query.slice(0, 300));
  url.searchParams.set('filter', 'is_retracted:false,has_doi:true');
  url.searchParams.set('per-page', '8');
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (process.env.OPENALEX_API_KEY) headers.Authorization = `Bearer ${process.env.OPENALEX_API_KEY}`;
  const response = await fetch(url, { headers, next: { revalidate: 3600 } });
  if (!response.ok) throw new Error(`OpenAlex returned ${response.status}`);
  const root = record(await response.json());
  return array(root.results)
    .map(record)
    .map((work) => {
      const doi = cleanDoi(string(work.doi) || '');
      const location = record(work.primary_location);
      const source = record(location.source);
      return {
        id: string(work.id) || doi,
        doi,
        title: string(work.title) || 'Untitled scholarly work',
        authors: openAlexAuthors(work.authorships),
        journal: string(source.display_name) || 'Source unavailable',
        year: number(work.publication_year),
        citedByCount: number(work.cited_by_count) || 0,
        openAccess: record(work.open_access).is_oa === true,
        openAlexUrl: string(work.id) || '',
        topics: array(work.topics).map(record).map((topic) => string(topic.display_name)).filter((topic): topic is string => Boolean(topic)).slice(0, 3),
      } satisfies ReplacementCandidate;
    })
    .filter((candidate) => DOI_PATTERN.test(candidate.doi) && candidate.doi !== cleanDoi(excludeDoi))
    .slice(0, 5);
}

function json(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'private, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

export async function POST(request: NextRequest) {
  let body: JsonRecord;
  try {
    body = record(await request.json());
  } catch {
    return json({ error: 'Request body must be valid JSON.' }, 400);
  }

  const action = string(body.action);
  try {
    if (action === 'verify') {
      const dois = safeDois(body.dois);
      if (!dois.length) return json({ error: 'Provide at least one valid DOI.' }, 400);
      const references = await Promise.all(dois.map(verifyOne));
      return json({ references, checkedAt: new Date().toISOString(), sources: ['Crossref REST API', 'OpenAlex API'] });
    }

    if (action === 'search') {
      const query = string(body.query)?.trim().slice(0, 300) || '';
      const excludeDoi = cleanDoi(string(body.excludeDoi) || '');
      if (query.length < 8) return json({ error: 'Provide a more specific paper title or topic.' }, 400);
      const candidates = await searchOpenAlex(query, excludeDoi);
      return json({ candidates, source: 'OpenAlex API', searchedAt: new Date().toISOString() });
    }

    if (action === 'bibtex') {
      const doi = cleanDoi(string(body.doi) || '');
      if (!DOI_PATTERN.test(doi)) return json({ error: 'Provide a valid DOI.' }, 400);
      const response = await fetch(`https://doi.org/${encodeURIComponent(doi)}`, {
        headers: { Accept: 'application/x-bibtex' },
        redirect: 'follow',
      });
      if (!response.ok) return json({ error: `BibTeX lookup returned ${response.status}.` }, 502);
      const bibtex = (await response.text()).slice(0, 12000);
      return json({ doi, bibtex, source: 'DOI content negotiation' });
    }

    return json({ error: 'Unsupported action.' }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Scholarly data service unavailable.';
    return json({ error: message }, message.includes('429') ? 429 : 502);
  }
}
