# RetractionRadar manual demo script: 2:45 target

Record ChatGPT and the in-app browser together. Keep the conversation visible whenever a WebMCP tool runs. Do not show terminals, source code, credentials, or fabricated scholarly data.

## Before recording

1. Open `https://retractionradar.masterakshata.chatgpt.site/` in ChatGPT's in-app browser. Confirm **7 site tools ready** and **No fictional records**.
2. Run the live checks in `DEMO_DATA.md` off-camera, then reset to an empty workspace and start a fresh conversation. Do not carry staged repairs or approvals over from rehearsal.
3. Have `demo-data/retractionradar-sample.bib` ready to upload. It contains complete publication metadata for three real papers on chitosan/zinc-oxide wound dressings. Call it a small topical bibliography, not a real manuscript's bibliography.
4. Keep the known flagged DOI, publisher notice, and previously observed candidates in `DEMO_DATA.md` as preflight references. Use the natural prompts below on camera, not that file's detailed check prompts.
5. No candidate is a predetermined correct replacement. The sample supplies no manuscript claim against which to establish scientific suitability. The default demo therefore rejects an unverified replacement and preserves the unresolved flag.

## 0:00-0:20: Problem and human starting point

**Do:** Upload `demo-data/retractionradar-sample.bib` using **Upload .bib / .tex**. Upload starts the live checks; let the queue load and show the red flagged reference. This detection is automatic app behavior, not agent work.

**Say:**

> "I'm uploading a small bibliography on chitosan wound dressings. The app checks it automatically and flags this reference in red. That tells me where to look, but I still need to investigate the evidence and decide what to do next."

## 0:20-0:43: Why WebMCP fits this work

**Show:** The loaded citation queue, Evidence trail, Repair desk, and tool badge.

**Say:**

> "The red flag doesn't need an agent. WebMCP is useful for what follows: the agent can investigate the flagged reference and put a candidate in this Repair desk. I review it here, then the agent reads my decision and prepares the export. We work from the same bibliography without copying it into chat."

## 0:43-1:10: Agent investigates the flagged reference

Paste:

> Investigate the flagged paper in RetractionRadar and find related work worth reviewing. If there's a promising lead, put it in the Repair desk and explain its limitations.

The app has already identified the flagged reference. Let the agent read that state, inspect the available registry evidence, search related work, and stage a useful lead. Do not ask it to repeat detection, supply a candidate DOI, specify tool order, or reload the bibliography.

**Show:** The agent using site tools, opening a finding in the page, and linking the publisher notice and registry evidence. Describe only what the current results support.

**Say, if the live records confirm it:**

> "The agent is working from the reference already flagged in the app. It can inspect the linked registry evidence and look for related work, while I can open the original sources. A related paper still isn't a proven replacement."

Do not memorize live citation counts. If the agent only answers in chat, ask on camera:

> Open that finding in RetractionRadar so I can inspect it.

## 1:10-1:45: Agent proposes, human reviews

Continue the same agent run. The first prompt already asks for related work and a review proposal; no second search prompt is needed.

**Show:** Live candidate cards, a staged proposal marked **Pending human approval**, and its rationale. The agent chooses from the current results; do not paste a candidate DOI or a prepared rationale.

**Say:**

> "The proposal is attached to the flagged citation in our shared workspace. I can inspect the source and the agent's rationale before deciding. The site's tools let the agent stage a candidate, but don't give it an approval or download action."

If candidates appear but none is staged, ask only if one deserves closer review:

> Put that lead in the Repair desk for review.

Identify it by its visible title if needed. Keep the follow-up on camera. If none is promising, do not force a proposal; show the unresolved finding and proceed to export, without claiming to have demonstrated a staged repair.

## 1:45-2:07: Make a real human decision

**Do:** Open the staged candidate's source and inspect its title, DOI, and rationale. Return to the Repair desk. For this verification set, click **Reject** because suitability as a replacement has not been established.

**Say:**

> "Related subject matter isn't enough to justify replacing a citation. This set doesn't include a manuscript claim to check, so I'm rejecting the proposed substitution. That decision is now in the workspace for the agent to read."

An approval path is appropriate only if you have a real claim and have checked that the candidate supports it. Explain that basis on camera. Do not approve a candidate just to make the demo end with a replacement.

## 2:07-2:35: Hand the decision back to the agent

Paste:

> I've finished reviewing. Check my decisions in RetractionRadar and prepare the bibliography and report for me to download.

**Show:** The agent reading the current workspace and preparing **Reviewed bibliography + integrity report**. Do not repeat your decision or the candidate DOI in chat.

**For the rejection path, confirm:**

- the rejected candidate is not substituted into the bibliography;
- the original flagged DOI remains, with its finding and source links in the integrity report;
- the Repair desk and Activity show the rejection. The current exported report does not include an explicit rejection entry or rejection rationale; do not claim it does.

**Say:**

> "The agent reads my decision through WebMCP. The export keeps the original DOI and its warning instead of applying the rejected change. I can download the result, but this citation still needs investigation."

For a justified approval, show that only the approved DOI substitution is applied and that the report retains the original finding, provenance, and staged rationale. Describe the branch you actually recorded.

If the agent skips reading state, ask it on camera to check the current review decisions before preparing the preview. Never claim a tool action happened unless the recording shows it.

## 2:35-2:45: Closing

**End on:** Export preview or Repair desk, then the shared Activity.

**Say:**

> "WebMCP lets the agent contribute to the bibliography I'm reviewing and continue from my decisions. RetractionRadar keeps unresolved citations visible and leaves scientific judgment with the researcher."

## If something fails

- If metadata or the publisher relation fails to load, stop recording and repeat the live preflight. Do not fabricate results.
- If candidate search returns poor leads, say so. An unresolved flag is an honest result, not a reason to approve a weak replacement.
- Never call an unflagged record scientifically proven or a related candidate equivalent.
- These timestamps are editing targets, not a promise of tool speed. Pause between completed tool calls if needed, retain visible human-agent handoffs, and disclose cuts or speed-ups.
- Keep the final video under three minutes with audible narration.
