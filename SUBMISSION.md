# RetractionRadar — WebMCP Challenge submission

## One-line pitch

RetractionRadar lets researchers and their agents catch compromised citations, inspect live registry evidence, and repair bibliographies with explicit human approval.

## Why this use case fits WebMCP

A citation-integrity review moves between registry checks and scientific judgment. The agent can investigate up to 25 DOI identifiers per check, inspect publisher update relations, and find related papers. The researcher must decide whether a candidate supports the manuscript's actual claim. Their work needs to meet in the same bibliography, with a visible record of proposed changes and review decisions.

WebMCP gives the agent seven tools connected to that workspace. It can read a bibliography the person uploaded, open evidence in the page, and stage a candidate in the Repair desk. The person approves or rejects it there. The agent can then read those decisions and prepare the export without asking the person to paste the bibliography or repeat their choices in chat. Read-only state inspection and visible research actions support both directions of the handoff.

Crossref and OpenAlex provide records, not the researcher's RetractionRadar review state. A custom integration or browser automation could connect an agent to that state too; WebMCP provides a standard interface for the site's declared actions. The application implements approval rules and export behavior. Its WebMCP tools expose no approval, rejection, or download action.

## Better user experience

Today, citation checks are fragmented across DOI resolvers, publisher pages, retraction databases, literature searches, and bibliography editors. RetractionRadar turns that into one auditable workflow. The app parses `.bib` files locally, retrieves live Crossref and OpenAlex evidence, links directly to notices, shows candidate leads, records who did what, and exports both BibTeX and an integrity report.

The product is useful without an agent. With WebMCP, a person can upload a bibliography and ask, "Which references need attention, and what's the evidence?" The agent investigates the existing queue and can stage a promising lead for review. After deciding in the page, the person asks, "Check my decisions and prepare the bibliography and report." The agent continues from that updated state. A rejected or pending proposal leaves the original DOI unchanged and the integrity finding visible; only approved replacements change DOI entries in the export.

## What was difficult before

When an agent's suggestions live in chat and bibliography edits happen elsewhere, a researcher must transfer identifiers, preserve provenance, and explain which proposals they accepted. RetractionRadar attaches the proposal and review state to the reference itself. WebMCP lets the agent read that shared record and act on it at the next handoff. Batch lookup is useful, but the two-way review workflow is the reason for using WebMCP here.

## Implementation

The site registers imperative tools with `document.modelContext.registerTool`. A server-side route validates and caps DOI requests, queries Crossref and OpenAlex, normalizes a minimal response, and keeps the OpenAlex credential out of the browser. DOI content negotiation produces reviewed BibTeX. The browser owns the workspace, approvals, activity log, and final download.

## Three-minute judge workflow

Follow `DEMO_SCRIPT.md` for the recording prompts and timing. `DEMO_DATA.md` and `demo-data/retractionradar-sample.bib` supply real preflight records, not predetermined replacement answers.

1. The person uploads the three-DOI verification set; the app checks the records live.
2. Ask the agent which references need attention. It reads the existing workspace and opens the evidence, including the publisher notice when confirmed by the live records.
3. Ask for related papers worth reviewing. The agent can stage a promising live candidate with a rationale, visibly pending human approval.
4. The person inspects the proposal. For this set, reject an unverified substitution: no manuscript claim has been supplied to establish suitability. Approve only when a real claim and source review justify it.
5. Ask the agent to read the current decisions and prepare the export, without retyping those decisions into chat.
6. Show that a rejected candidate is not applied, while the original DOI and integrity finding remain. For a justified approval, show the approved substitution instead. Download stays a human action.

## Why it can win

- **WebMCP leverage:** the demo shows a round trip: the agent investigates the person's uploaded references and stages a proposal, the person reviews it, and the agent reads the decision to prepare the export.
- **Execution:** working import, live verification, provenance, candidate search, approval, and export—not a mockup.
- **Impact:** directly addresses a costly, common research-integrity failure for authors, journals, libraries, and systematic-review teams.
- **Creativity and ambition:** treats citation repair as a reviewable proposal attached to a reference. Human decisions become workspace state the agent can use, including the decision to leave a flagged citation unresolved.

## Honest scope

Candidates are research leads, not proven replacements. No registry warning does not mean scientific validity. Rejected proposals remain visible in the Repair desk and Activity; the current exported report preserves their original findings but does not include an explicit rejection entry or rejection rationale. The workspace is local to the browser session, not a multi-user reference manager.
