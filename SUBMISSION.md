# RetractionRadar — WebMCP Challenge submission

## One-line pitch

RetractionRadar lets researchers and their agents catch compromised citations, inspect live registry evidence, and repair bibliographies with explicit human approval.

## Why this use case fits WebMCP

A citation-integrity review combines repetitive machine work with consequential human judgment. An agent can verify dozens of DOI identifiers, follow publisher update relations, search the scholarly graph, and stage plausible alternatives. A researcher or editor must inspect provenance and decide whether a candidate supports the manuscript’s actual claim. WebMCP connects those roles inside one shared, visible web app instead of forcing an agent to guess at UI controls or perform invisible changes.

RetractionRadar exposes seven narrow tools for loading, verifying, inspecting, searching, staging, reading state, and preparing an export preview. Every tool updates the same interface the person sees. Source records are labeled untrusted, potentially consequential changes remain pending, and only human UI controls can approve a repair or download the final bibliography.

## Better user experience

Today, citation checks are fragmented across DOI resolvers, publisher pages, retraction databases, literature searches, and bibliography editors. RetractionRadar turns that into one auditable workflow. The app parses `.bib` files locally, retrieves live Crossref and OpenAlex evidence, links directly to notices, shows candidate leads, records who did what, and exports both BibTeX and an integrity report.

The product is useful without an agent. With WebMCP, a person can ask an agent to investigate an entire bibliography, explain high-risk findings, and stage the strongest candidate while the person stays responsible for the final scientific decision.

## What was difficult before

- Batch-checking a bibliography without manually visiting every DOI page.
- Preserving provenance while moving from detection to repair.
- Letting an agent help without granting it authority to silently rewrite citations.
- Keeping machine research and human decisions synchronized in one visible state.

## Implementation

The site registers imperative tools with `document.modelContext.registerTool`. A server-side route validates and caps DOI requests, queries Crossref and OpenAlex, normalizes a minimal response, and keeps the OpenAlex credential out of the browser. DOI content negotiation produces reviewed BibTeX. The browser owns the workspace, approvals, activity log, and final download.

## Three-minute judge workflow

1. Load the public verification set: three real DOI records are checked live.
2. Open the red retracted paper and the publisher retraction notice.
3. Ask the agent to inspect evidence and find replacement candidates.
4. The agent stages one OpenAlex-backed lead; the app shows “Pending human approval.”
5. The person reviews the DOI and approves it.
6. Ask the agent to prepare the export preview.
7. Show the approved DOI in BibTeX and the attached integrity report, then download manually.

## Why it can win

- **WebMCP leverage:** seven non-trivial tools form a complete shared-state workflow, including visible agent actions and protected human decisions.
- **Execution:** working import, live verification, provenance, candidate search, approval, and export—not a mockup.
- **Impact:** directly addresses a costly, common research-integrity failure for authors, journals, libraries, and systematic-review teams.
- **Creativity and ambition:** moves beyond retraction alerts into auditable human-agent citation repair, while respecting the boundary between retrieval and scientific judgment.
