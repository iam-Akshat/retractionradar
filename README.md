# RetractionRadar

RetractionRadar is a reference-integrity workbench for researchers, editors, reviewers, and their agents. Paste DOI identifiers or upload a `.bib` file; the app verifies each citation against current Crossref and OpenAlex records, exposes the evidence, and helps review possible replacements without silently changing the bibliography.

## Why WebMCP

Citation repair is not a one-shot chatbot task. An agent is useful for checking many identifiers, investigating the scholarly graph, and staging candidate replacements. A person must still judge scientific relevance and approve changes. WebMCP lets both operate on the same visible workspace:

- the agent loads and verifies DOI sets;
- the agent opens provenance and searches candidate leads;
- the agent may stage a replacement, visibly marked as pending;
- only the person can approve or reject the repair;
- export uses approved repairs only and includes an integrity report.

The normal interface remains fully usable without WebMCP.

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
