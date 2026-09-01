# RetractionRadar submission checklist

- [x] Replace the placeholder metadata base URL with the final deployment URL.
- [x] Configure `OPENALEX_API_KEY` as a hosting secret; confirm it never appears in client bundles or repository history.
- [ ] Add a real Crossref contact email to `CROSSREF_MAILTO` and include it in the server request identity.
- [ ] Perform a fresh live test of the public sample immediately before recording.
- [x] Validate all seven WebMCP tools in ChatGPT’s built-in browser.
- [x] Add a real three-DOI `.bib` recording fixture.
- [ ] Test `.bib` upload on the final hosted build immediately before recording.
- [x] Confirm agent-staged repairs cannot be approved through WebMCP.
- [x] Confirm a pending candidate does not alter exported BibTeX.
- [ ] Confirm a rejected candidate does not alter exported BibTeX.
- [x] Verify the mobile layout at 390×844 without horizontal overflow.
- [ ] Complete the final keyboard and screen-reader pass. Production build, targeted accessibility lint, TypeScript, and dependency audit already pass.
- [ ] Record the under-three-minute demo with real DOI records and audible narration.
- [x] Record and visually review a 36.04-second silent real-data rehearsal.
- [x] Prepare the final timed narration, copy-ready prompts, DOI sheet, and uploadable `.bib` fixture.
- [ ] Publish a public Git repository with source, setup instructions, and visible MIT license.
- [ ] Make the hosted site public only after final review.
- [ ] Add live URL, repository URL, and YouTube URL to the submission form.
