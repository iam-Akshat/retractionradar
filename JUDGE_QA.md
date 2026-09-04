# RetractionRadar: five judge questions

## 1. Why is this more than a retraction alert?

The alert starts the work. RetractionRadar keeps the original citation, registry evidence, candidate proposal, and human review state together. The agent can investigate and stage a lead; the researcher reviews it; the export applies only approved substitutions and preserves findings for unresolved references.

## 2. Why use WebMCP instead of querying Crossref and OpenAlex directly?

Those services return scholarly records. They do not know which bibliography the person uploaded to RetractionRadar or which proposal they rejected. WebMCP connects the agent to that application state and its research actions. It can contribute to the visible Repair desk, then read the person's decision before preparing the export.

A custom integration or browser automation could also support this. WebMCP is the standard interface used here, not the only possible implementation. The app's review rules determine what can be applied; the exposed tools include no approval or download action.

## 3. How do you know a replacement supports the original claim?

The app does not establish that. Topic similarity and registry metadata identify leads, not scientific equivalence. A researcher must read the candidate and evaluate it against the actual manuscript claim. Without that basis, a proposal should stay pending or be rejected. The verification-set demo does not invent a claim just to justify approval.

## 4. What does the demo prove about collaboration?

The person uploads references without copying them into chat. The agent reads that queue, investigates evidence, and can stage a proposal in the page. The person reviews it using the UI. The agent then reads the changed review state and prepares an export that respects it. A rejection is a valid demonstration: the candidate is not substituted and the original integrity finding remains.

## 5. What are the current limits?

Checks accept up to 25 DOI identifiers and depend on live source coverage. The absence of a warning is not proof of validity. The browser session owns the workspace; this is not a multi-user reference manager. The report preserves original findings and approved replacement details, but explicit rejection history is currently visible only in the workspace and activity log, not as a rejection entry in the exported report.
