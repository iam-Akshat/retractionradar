export type IntegrityStatus =
  | 'verified'
  | 'retracted'
  | 'corrected'
  | 'concern'
  | 'unresolved'
  | 'unchecked';

export type EvidenceItem = {
  source: 'Crossref' | 'OpenAlex';
  label: string;
  url: string;
  checkedAt: string;
};

export type ScholarlyReference = {
  id: string;
  doi: string;
  title: string;
  authors: string;
  journal: string;
  year: number | null;
  status: IntegrityStatus;
  finding: string;
  noticeDoi: string | null;
  openAlexId: string | null;
  citedByCount: number | null;
  topics: string[];
  evidence: EvidenceItem[];
};

export type ReplacementCandidate = {
  id: string;
  doi: string;
  title: string;
  authors: string;
  journal: string;
  year: number | null;
  citedByCount: number;
  openAccess: boolean;
  openAlexUrl: string;
  topics: string[];
};

export type StagedRepair = {
  referenceDoi: string;
  candidate: ReplacementCandidate;
  rationale: string;
  status: 'pending' | 'approved' | 'rejected';
  stagedBy: 'agent' | 'human';
};
