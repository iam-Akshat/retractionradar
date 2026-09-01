# RetractionRadar demo script — target 2:35

Use the live site and the real DOI set in `DEMO_DATA.md`. Keep that file open off-camera.

## 0:00–0:18 — Problem and product

**Show:** Empty import screen, `7 site tools ready`, and “No fictional records.”

**Say:** “Retraction notices can appear after a paper has already entered manuscripts and reference libraries. RetractionRadar is a reference-integrity workbench where a researcher and an agent investigate the same live bibliography.”

## 0:18–0:52 — Live verification

Paste:

> Load and verify these DOI identifiers using the site tools: `10.1021/am300292v`, `10.1038/s41586-021-03819-2`, and `10.1126/science.1225829`. Summarize only what the linked Crossref and OpenAlex evidence supports. Absence of a retraction relation is not proof that a paper is scientifically valid.

**Show:** The flagged record, publisher notice link, Crossref and OpenAlex provenance, and the two controls.

**Say:** “These are real identifiers. Crossref returns a publisher retraction relation for this paper; OpenAlex supplies scholarly metadata and citation context. The app does not invent a status or claim that an unflagged paper is automatically valid.”

## 0:52–1:28 — WebMCP investigation

Paste:

> Inspect `10.1021/am300292v` and find replacement candidates. Treat every candidate only as a research lead, never as an equivalent paper.

**Show:** Candidate cards appearing in the Repair desk. Open the DOI of one visible candidate in a new tab.

**Say:** “The website exposes seven structured WebMCP tools. The agent can verify a bibliography, inspect evidence, follow the scholarly graph, and surface non-retracted leads directly in the workspace I can see.”

## 1:28–1:58 — Protected handoff

Using the DOI of a currently visible candidate, paste:

> Stage candidate `[VISIBLE CANDIDATE DOI]` for `10.1021/am300292v` with this rationale: “Related non-retracted work surfaced from OpenAlex. Relevance to the manuscript’s exact claim still requires expert review.” Do not approve or apply the change.

**Show:** **Pending human approval** and the agent entry in Activity. Then inspect the candidate and click **Approve repair** yourself.

**Say:** “There is deliberately no WebMCP approval tool. The agent stages a lead; only the researcher can approve or reject a citation change.”

## 1:58–2:22 — Auditable export

Paste:

> Prepare the integrity export preview. Use only human-approved repairs and do not download a file.

**Show:** BibTeX plus integrity report, then manually download if useful.

**Say:** “Only the human-approved DOI changes. Pending or rejected suggestions leave the original citation untouched, and the report preserves findings, sources, and the review rationale.”

## 2:22–2:35 — Why WebMCP

**Say:** “Without WebMCP, this is manual tab-hopping or an opaque agent pipeline. With WebMCP, repetitive investigation happens through safe product actions while the consequential decision stays visible and human-owned.”

End on the approved repair and integrity report.

## Recording rules

- Never hard-code a candidate as “the replacement”; live ordering can change.
- Never call a candidate scientifically equivalent without reading the manuscript’s claim and the candidate paper.
- Never show the OpenAlex API key.
- Final submission needs audible narration. Existing silent rehearsal: `outputs/retractionradar-demo/retractionradar-demo.mp4` (36.04 seconds).
