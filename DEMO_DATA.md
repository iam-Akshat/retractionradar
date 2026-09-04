# RetractionRadar recording data

All identifiers below are real. The uploadable bibliography contains Crossref-sourced publication metadata for three papers on chitosan/zinc-oxide wound dressings. Status relations, citation counts, and candidates must still be fetched live during the recording.

## Fixed DOI set

| Role | DOI | Expected live identity |
| --- | --- | --- |
| Flagged record | `10.1021/am300292v` | *Flexible and Microporous Chitosan Hydrogel/Nano ZnO Composite Bandages for Wound Dressing: In Vitro and In Vivo Evaluation* |
| Publisher notice | `10.1021/acsami.9b11759` | Retraction notice linked through Crossref update relations |
| Related record | `10.1016/j.ijbiomac.2017.05.020` | *Antibacterial and wound healing properties of chitosan/poly(vinyl alcohol)/zinc oxide beads (CS/PVA/ZnO)* |
| Related record | `10.1016/j.ijbiomac.2018.04.010` | *Incorporation of ZnO nanoparticles into heparinised polyvinyl alcohol/chitosan hydrogels for wound dressing application* |

The two related records returned no warning in the live app check on 2026-09-04. Describe them as “no retraction relation returned by these sources,” not “proven valid.” Citation counts are live and must not be memorized in narration. The file is a curated topical sample, not a bibliography taken from an actual manuscript, and inclusion does not establish replacement suitability.

Useful source links:

- `https://doi.org/10.1021/am300292v`
- `https://doi.org/10.1021/acsami.9b11759`
- `https://doi.org/10.1016/j.ijbiomac.2017.05.020`
- `https://doi.org/10.1016/j.ijbiomac.2018.04.010`

## Uploadable demo file

Use `demo-data/retractionradar-sample.bib` to demonstrate `.bib` upload. It contains authors, titles, journals, publication years, volumes, page ranges, DOIs, and DOI URLs, plus the issue number where returned by Crossref. Neutral author/year citation keys do not disclose integrity status. Metadata was retrieved from Crossref on 2026-09-04; the app extracts the three unique DOI identifiers and fetches current findings independently of the file's metadata.

Metadata sources:

- [Sudheesh Kumar et al. (2012), Crossref](https://api.crossref.org/works/10.1021%2Fam300292v)
- [Gutha et al. (2017), Crossref](https://api.crossref.org/works/10.1016%2Fj.ijbiomac.2017.05.020)
- [Khorasani et al. (2018), Crossref](https://api.crossref.org/works/10.1016%2Fj.ijbiomac.2018.04.010)

## Copy-ready agent prompts

### 1. Load and verify

> Load and verify these DOI identifiers using the site tools: `10.1021/am300292v`, `10.1016/j.ijbiomac.2017.05.020`, and `10.1016/j.ijbiomac.2018.04.010`. Summarize only what the linked Crossref and OpenAlex evidence supports. Absence of a retraction relation is not proof that a paper is scientifically valid.

### 2. Find leads

> Inspect `10.1021/am300292v` and find replacement candidates. Treat every candidate only as a research lead, never as an equivalent paper.

### 3. Stage one visible candidate

Replace the bracketed value with a DOI currently shown in the Repair desk:

> Stage candidate `[VISIBLE CANDIDATE DOI]` for `10.1021/am300292v` with this rationale: “Related non-retracted work surfaced from OpenAlex. Relevance to the manuscript’s exact claim still requires expert review.” Do not approve or apply the change.

Previously observed real leads include `10.3390/ijms20235889` and `10.1016/j.jare.2017.01.005`, but live OpenAlex ordering can change. Use one only if it is visible in the current run.

### 4. Prepare export after manual approval

> Prepare the integrity export preview. Use only human-approved repairs and do not download a file.

## Expected visible result

- The site reports `7 site tools ready`.
- `10.1021/am300292v` is flagged with a publisher retraction relation and linked notice.
- Candidate cards are explicitly framed as leads.
- An agent-staged candidate is **Pending human approval**.
- No site tool can approve, reject, or download; those remain human UI actions.
- Before approval, export preserves the original DOI and documents the unresolved flag.
- After human approval, export substitutes only the approved DOI and adds an integrity report.

## Five-minute preflight

1. Open the live app in a WebMCP-capable browser and hard refresh.
2. Confirm `7 site tools ready` and load the three DOI identifiers.
3. Confirm the publisher notice link resolves and both providers show provenance.
4. Run candidate search and open one candidate DOI; reject any clearly irrelevant lead.
5. Test the pending export once: it must retain `10.1021/am300292v`.
6. Reload, test `demo-data/retractionradar-sample.bib`, then reset to a clean screen.
7. Close extra tabs, zoom to 90–100%, and start capture.

Never expose the OpenAlex API key in the page, prompt, terminal, repository, or video.
