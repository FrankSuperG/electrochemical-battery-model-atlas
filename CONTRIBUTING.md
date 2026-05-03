# Contributing

Contributions are welcome! You can add new model entries, fix metadata, improve classifications, and refine the review rubric.

## How to contribute
### 1) Add a new model (recommended)
1. Fork this repository
2. Create: `MODELS/<slug>.md`
3. Append an entry to `data/models.yaml` (keep fields consistent)
4. Open a PR

If the entry is based on a larger framework, add `implementation_role` and `implementation_note` in `data/models.yaml`. For example, PyBaMM-backed workflows should be marked separately from independent PDE implementations so the Atlas does not double-count framework wrappers as new solvers.

### 2) Fix or enrich existing entries
- Open an Issue (please include links / citations)
- Or submit a PR editing the relevant `MODELS/*.md` page and `data/models.yaml`

### 3) Update reproduction records
- Edit `data/reproductions.yaml` for per-model reproduction status, blockers, runtime, dependencies, and notes.
- Edit `data/reproduction-tools.yaml` for global tool/runtime versions observed during a reproduction pass.
Regenerate generated files with:
```bash
node scripts/models.js check
```
- Do not edit `REPRODUCTIONS/SUMMARY.md`, `REPRODUCTIONS/COVERAGE.md`, or `REPRODUCTIONS/DEPENDENCIES.md` by hand unless you are also updating the generator.

## Model page template
Copy: [`MODELS/_TEMPLATE.md`](MODELS/_TEMPLATE.md)

## References policy (required for model pages)
- Every model page must include:
  - `## References`
- For new model entries, provide complete reference details (author, title, venue, year, DOI when available).
- Prefer using entries from [`references.bib`](references.bib) as the canonical source.
- If upstream README/docs does **not** provide a citation, keep the section and write:
  - `No primary reference was identified in upstream docs for this entry.`
- If a needed paper is missing from [`references.bib`](references.bib), add it in the same PR.
- Run `node scripts/models.js check-bib` or the full `node scripts/models.js check` after editing citation keys.
- Run `node scripts/models.js check-readme` or the full check after changing model/reproduction counts shown in the README snapshot.

## Review principles (short)
- Prefer describing **model assumptions and physics** over vague opinions
- If you did not run the code, explicitly state that ("not reproduced")
- Be respectful and actionable when pointing out issues

## Terminology style guide (please keep wording consistent)
Use these preferred forms across README/model pages/PRs:

- **SPM**: Single Particle Model
- **SPMe**: Single Particle Model with electrolyte (preferred casing: `SPMe`, not `SPME`)
- **DFN/P2D**: Doyle–Fuller–Newman / pseudo-two-dimensional (prefer this order)
- **SOC**: state of charge
- **OCV**: open-circuit voltage
- **SEI**: solid–electrolyte interphase
- **LLI**: loss of lithium inventory
- **LAM**: loss of active material
- Prefer wording **degradation/aging** (either is fine, but avoid mixing multiple variants in one paragraph)

### First-use acronym rule
At first mention in each document, write **full term + acronym**.

Examples:
- Doyle–Fuller–Newman (**DFN**)
- pseudo-two-dimensional (**P2D**)
- Single Particle Model with electrolyte (**SPMe**)
- open-circuit voltage (**OCV**)

## Slug naming
- Use lowercase with `-` separators, e.g. `pybamm-spme`, `dfn-sei-plating`
