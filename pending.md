# RetractionRadar submission checklist

- [x] Replace the placeholder metadata base URL with the final deployment URL.
- [x] Configure `OPENALEX_API_KEY` as a hosting secret; confirm it never appears in client bundles or repository history.
- [ ] Add a real Crossref contact email to `CROSSREF_MAILTO` and include it in the server request identity.
- [ ] Perform a fresh live test of the public sample immediately before recording.
- [x] Validate all seven WebMCP tools in ChatGPT’s built-in browser.
- [ ] Test `.bib` upload with at least one real user-owned bibliography.
- [x] Confirm agent-staged repairs cannot be approved through WebMCP.
- [ ] Confirm rejected and pending candidates never alter exported BibTeX.
- [ ] Complete focused accessibility and responsive review. Production build and dependency audit already pass.
- [ ] Record the under-three-minute demo with real DOI records and audible narration.
- [ ] Publish a public Git repository with source, setup instructions, and visible MIT license.
- [ ] Make the hosted site public only after final review.
- [ ] Add live URL, repository URL, and YouTube URL to the submission form.
