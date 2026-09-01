# RetractionRadar demo script (under three minutes)

## 0:00–0:20 — Problem and product

“A retracted paper can remain in a manuscript long after the retraction is published. RetractionRadar is a reference-integrity workbench where a researcher and an agent investigate the same live bibliography.”

Show the empty import screen and emphasize that the public sample contains real DOI identifiers; metadata is not fictional or pre-seeded.

## 0:20–0:50 — Live verification

Click **Load real sample**. The records resolve from Crossref and OpenAlex. Open the red citation and show:

- the real paper title;
- the registry finding;
- the linked publisher notice;
- Crossref and OpenAlex provenance;
- the OpenAlex citation count.

## 0:50–1:25 — WebMCP investigation

Ask the agent: “Inspect the retracted reference and find replacement candidates. Explain that these are leads, not equivalent papers.”

The agent calls the site tools. Candidate cards appear in the shared Repair desk. Open one DOI to show it is a real publication.

## 1:25–1:55 — Protected handoff

Ask the agent: “Stage the strongest-looking lead, but do not approve it.”

The staged candidate appears as **Pending human approval**. Show the activity log attributing the action to the agent. Explain that there is deliberately no approval tool.

Review the candidate and click **Approve repair** yourself.

## 1:55–2:30 — Auditable export

Ask the agent: “Prepare the integrity export preview.”

Show the BibTeX plus integrity report. The approved DOI is substituted; unapproved flags would remain unchanged and documented. Click **Download .bib** manually.

## 2:30–2:50 — Why WebMCP

“Without WebMCP, this is either manual tab-hopping or an opaque agent pipeline. With WebMCP, the agent handles the repetitive investigation inside a product the researcher can see and control. The agent stages; the human decides; the export proves what happened.”
