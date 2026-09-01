# RetractionRadar manual demo script — 2:30 target

Record ChatGPT and the in-app browser together. Keep the agent conversation visible whenever a WebMCP tool runs. Do not show terminals, source code, credentials, or fabricated scholarly data.

## Before recording

1. Open `https://retractionradar.masterakshata.chatgpt.site/` in ChatGPT’s in-app browser.
2. Confirm the empty workspace shows **7 site tools ready** and **No fictional records**.
3. Start a fresh ChatGPT conversation.
4. Run the live checks in `DEMO_DATA.md`; keep that file off-camera.
5. Copy the DOI of one relevant candidate currently visible in the Repair desk. Candidate ordering can change, so never memorize or claim a universal replacement.

## 0:00–0:18 — Problem and product

**Show:** Empty RetractionRadar workspace beside the ChatGPT conversation. Point out **7 site tools ready** and **No fictional records**.

**Say:**

> “A paper can be retracted after it has already entered manuscripts and reference libraries. RetractionRadar is a shared reference-integrity workspace where a researcher and an agent investigate the same real bibliography.”

## 0:18–0:30 — Why WebMCP

**Show:** Citation queue, Evidence trail, Repair desk, Activity, and export controls.

**Say:**

> “Instead of browsing several scholarly services and copying results manually, ChatGPT gets seven structured WebMCP tools. Every agent action updates the same visible workspace that I can inspect and control.”

## 0:30–1:02 — Verify a mixed bibliography

Paste this exact prompt into ChatGPT:

> Use RetractionRadar’s site tools only. Load and verify these DOI identifiers: `10.1021/am300292v`, `10.1038/s41586-021-03819-2`, and `10.1126/science.1225829`. Inspect the evidence for `10.1021/am300292v`. Report only what Crossref and OpenAlex support. Do not treat the absence of a retraction relation as proof that a paper is scientifically valid.

**While the agent runs, say:**

> “These are real DOI identifiers. Crossref links the first paper to a publisher retraction notice. OpenAlex supplies scholarly metadata and citation context. The other records have no retraction relation returned by these sources, which is not the same as proving their scientific validity.”

**Capture visibly:**

- the agent invoking the site tools;
- one flagged reference and two controls in the citation queue;
- the linked publisher notice;
- separate Crossref and OpenAlex evidence links.

Do not narrate a citation count because live counts can change.

## 1:02–1:27 — Find research leads

Paste:

> For flagged DOI `10.1021/am300292v`, find replacement candidates using the site tools. Treat every result only as a research lead—not an equivalent or automatically valid replacement. Stop after the candidates are visible.

**Show:** Candidate cards appearing in the Repair desk. Briefly open one candidate’s DOI link to prove it is a real scholarly record, then return to RetractionRadar.

**Say:**

> “The agent follows the scholarly graph and surfaces related, non-retracted leads. RetractionRadar deliberately does not claim that a candidate answers the manuscript’s exact scientific claim. That requires expert review.”

## 1:27–1:52 — Protected agent-to-human handoff

Choose a relevant DOI that is currently visible in the Repair desk and replace `[VISIBLE CANDIDATE DOI]` before pasting:

> Stage candidate `[VISIBLE CANDIDATE DOI]` for `10.1021/am300292v` with this rationale: “Related non-retracted work surfaced from OpenAlex. Relevance to the manuscript’s exact claim still requires expert review.” Do not approve, reject, apply, or download anything.

**Show:** **Pending human approval** and the staged action in Activity.

**Say:**

> “There is no WebMCP tool that can approve or reject a repair. The agent can stage a lead, but only the researcher can make the consequential citation decision.”

## 1:52–2:10 — Human decision

**Do manually:** Review the candidate title, DOI, rationale, and source link. If it is suitable for demonstrating the workflow, click **Approve repair** yourself.

**Say:**

> “I inspect the evidence and approve the staged change myself. Until this human action, the original DOI remains untouched.”

If the visible candidate is clearly irrelevant, click **Reject**, find another live candidate, and restart the recording. Never approve an obviously poor lead for convenience.

## 2:10–2:23 — Auditable export

Paste:

> Prepare the integrity export preview using only human-approved repairs. Do not copy or download a file.

**Show:** **Reviewed bibliography + integrity report**, the approved DOI substitution, original flagged DOI in the report, provenance, and review rationale.

**Say:**

> “Only the human-approved DOI changes in the bibliography. The integrity report preserves the original finding, sources, decision, and rationale. Copy and Download remain human-controlled actions.”

## 2:23–2:30 — Closing

**End on:** Approved repair or export report with **7 site tools ready** still visible.

**Say:**

> “WebMCP handles repetitive integrity research through safe product actions, while the researcher sees, verifies, and owns every consequential decision.”

## If something fails

- If live metadata or the publisher relation does not load, stop recording and repeat the preflight.
- If candidate results are irrelevant, reject them; never present one as a replacement merely to finish the demo.
- Never describe an unflagged record as proven valid.
- If the agent is slow, pause between completed tool calls without hiding the agent interaction.
- Keep the final video under three minutes with audible narration.
