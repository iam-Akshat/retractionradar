# RetractionRadar

RetractionRadar is a reference-integrity workbench for researchers, editors, reviewers, and their agents. Paste DOI identifiers or upload a `.bib` file; the app verifies each citation against current Crossref and OpenAlex records, exposes the evidence, and helps review possible replacements without silently changing the bibliography.

## Why WebMCP matters

Finding a retraction and deciding what to cite instead are different jobs. The agent can check registry records and find related work. The researcher must read the sources and decide whether a candidate supports the manuscript's actual claim. They need a shared place to inspect the finding, review a proposed change, and keep unresolved problems visible.

Crossref and OpenAlex provide scholarly records. RetractionRadar's WebMCP tools connect the agent to the person's current bibliography, selected reference, findings, staged repairs, and review decisions. The agent contributes to the same Repair desk the researcher is using, rather than leaving a separate list of suggestions in chat.

The collaboration works in both directions:

1. The person uploads a bibliography. The agent reads the visible queue, investigates flagged citations, and stages a candidate with a rationale for review.
2. The person opens the linked sources and approves or rejects the proposal in the page. That decision changes the state the agent can read.
3. The agent reads the updated decisions and prepares the export preview. Only approved replacements change DOI entries; rejected or pending proposals leave the original DOI and its integrity finding in the export. The person controls the download.

The researcher does not have to copy the bibliography or retype every approval into chat. A rejection is useful work too: the proposed change is not applied, and the flagged reference remains visible for further investigation.

A direct scholarly API connection alone cannot see which replacement the researcher rejected in RetractionRadar. A custom agent integration or browser automation could support this collaboration; WebMCP provides a standard interface for the site's declared actions and current workspace. RetractionRadar implements the review rules and export behavior itself. WebMCP is not a guarantee of scientific validity or a security boundary against arbitrary browser automation.

The normal interface remains fully usable without WebMCP. Shared state here means a person and their agent in the same browser workspace, not a multi-user bibliography service.

## Data sources

- [Crossref REST API](https://www.crossref.org/documentation/retrieve-metadata/rest-api/) for DOI metadata and update relations, including Retraction Watch data integrated into Crossref.
- [OpenAlex API](https://help.openalex.org/api/) for scholarly-graph metadata, retraction flags, topics, and candidate discovery.
- [DOI content negotiation](https://www.crossref.org/documentation/retrieve-metadata/content-negotiation/) for reviewed BibTeX export.

RetractionRadar does not claim that a returned candidate is scientifically equivalent to the original citation. Candidates are leads for expert review. The absence of a registry warning is not a guarantee that a paper is scientifically valid.

## Run locally

Requirements: Node.js 22.13 or later.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Add an OpenAlex API key to `.env.local` for deployment-grade access. The key is read only by the server route and is never exposed to client JavaScript.

Then open `http://localhost:3000`. In ChatGPT’s built-in browser, the seven WebMCP tools are discovered automatically. In Chrome, enable WebMCP testing first.

## WebMCP tools

| Tool | Effect |
| --- | --- |
| `load_and_verify_dois` | Replaces the local session with a real DOI set and checks it live |
| `verify_workspace_references` | Re-checks the visible queue |
| `get_integrity_workspace_state` | Reads findings and review state |
| `inspect_reference_evidence` | Opens one source-backed finding |
| `find_replacement_candidates` | Shows related, non-retracted OpenAlex leads |
| `stage_citation_repair` | Stages a visible candidate for human approval |
| `prepare_integrity_export_preview` | Prepares, but does not download, the reviewed export |

## Privacy and safety

- `.bib` content is parsed in the browser; only extracted DOI identifiers are sent for lookup.
- At most 25 DOI identifiers are accepted per check.
- External scholarly metadata is treated as untrusted source content.
- API credentials stay server-side.
- Agent actions are visible in the shared activity log.
- Agents cannot approve repairs or trigger a download.

## License

[MIT](./LICENSE)
