# Project Roadmap

This roadmap focuses on making the Atlas more useful as a reproducible, community-maintained reference rather than only a curated link list.

## Completed Baseline Improvements

| Date | Improvement | Evidence |
| --- | --- | --- |
| 2026-05-02 | Added machine-readable reproduction metadata. | `data/reproductions.yaml` now generates `REPRODUCTIONS/SUMMARY.md`, `REPRODUCTIONS/COVERAGE.md`, and `REPRODUCTIONS/DEPENDENCIES.md`. |
| 2026-05-02 | Added lightweight CI validation. | `.github/workflows/validate.yml` regenerates docs, validates metadata, checks internal links, and fails on uncommitted generated changes. |
| 2026-05-02 | Added license visibility and reuse-risk classification. | README model index now includes `License` and `Reuse risk` columns. |
| 2026-05-02 | Added per-model beginner notes and numerical-method links. | Every `MODELS/*.md` entry links back to `NUMERICS.md` and includes `### Beginner notes`. |
| 2026-05-02 | Added selected environment recipes. | `REPRODUCTIONS/environments/` includes Python, Docker, Julia, and Octave recipes for clean successful paths. |

## Highest-Impact Remaining Improvements

| Priority | Improvement | Why it matters |
| --- | --- | --- |
| P0 | Expand environment recipes to all successful entries. | Current recipes cover the cleanest paths, but not every successful entry has a dedicated pinned recipe. |
| P1 | Expand CI from metadata/link checks to optional model smoke tests. | Prevents stable runnable examples from silently drifting without making every PR run heavy MATLAB/Docker jobs. |
| P1 | Add reproduction badges to the model index. | Readers can immediately distinguish easy-to-run, legacy, and unreproduced models. |
| P1 | Store output artifacts for successful runs. | Voltage curves, logs, and small result summaries make success criteria auditable. |
| P1 | Automate dependency capture. | Current dependency metadata is structured, but version capture is still manual. |
| P2 | Add comparison protocols. | A shared 1C discharge / 25 degC protocol would make model behavior easier to compare. |
| P2 | Add upstream issue templates for unreproduced entries. | Makes it easier to report precise blockers back to original authors. |
| P2 | Add richer license/compliance review fields. | Current reuse-risk classification is coarse; commercial users still need explicit due-diligence notes. |

## Current Audit Notes (2026-05-02)

- License visibility improved: the README model index now includes license and reuse-risk columns generated from `data/models.yaml`.
- `cpg-spmt` uses PolyForm Noncommercial 1.0.0; commercial reuse should be treated as restricted unless separately licensed.
- `package.json` should remain metadata-only for local validation scripts; its license must match the repository license (`CC-BY-4.0`) rather than an npm default.
- Generated solver artifacts such as `saved_models/` should not be committed accidentally unless they are intentionally curated as reproduction evidence.
- Model pages now include per-entry beginner notes and links to the numerical-method summary.
- Selected pinned env/Dockerfile recipes now exist for `pybamm`, `spme-oed`, `mpet`, `battsimpy`, `petlion-jl`, `slide`, and Octave-based examples.
- `slide` has been upgraded to `independent-local` after a local CMake/Ninja Release build and full CTest run.

## Suggested Implementation Order

1. Add optional CI jobs that run only fast model smoke tests first, then expand to manual jobs for heavy models.
2. Add a standard output artifact policy: store logs, final voltage plot, run time, and exact command for each successful reproduction.
3. Add issue-ready blocker reports for the five unreproduced entries.
4. Add upstream commit hashes to `data/reproductions.yaml` so generated pages can report exact source snapshots.
5. Add optional MATLAB post-processing smoke evidence for `slide` if plot workflow coverage is needed.

## Reproduction Infrastructure Targets

| Target | Scope |
| --- | --- |
| `node scripts/models.js check` | Regenerate generated docs, validate metadata, check internal Markdown/HTML links and anchors, validate BibTeX/reference anchors, and verify README snapshot counts. |
| `node scripts/models.js validate` | Validate model and reproduction metadata. |
| `node scripts/models.js check-links` | Validate internal Markdown/HTML file links and anchors. |
| `node scripts/models.js check-bib` | Validate BibTeX key uniqueness and `REFERENCES.md` anchors. |
| `node scripts/models.js check-readme` | Validate hardcoded README badges/snapshot counts against metadata. |
| `node scripts/models.js render-reproductions` | Regenerate reproduction summary, coverage, and dependency matrix. |
| `node scripts/models.js render-readme` | Regenerate README model index and reproduction status snippet. |
| `make check` | Convenience wrapper around the full Node validation command. |
| `make check-bib` | Convenience wrapper around BibTeX/reference-anchor validation. |
| `make check-readme` | Convenience wrapper around README snapshot-count validation. |

## Planned Smoke-Test Targets

| Target | Scope |
| --- | --- |
| `make smoke-python` | Run the fastest Python success cases. |
| `make smoke-octave` | Run Octave examples that do not require MATLAB licenses. |
| `make smoke-julia` | Instantiate and run Julia smoke cases. |
| `make docker-mpet` | Rebuild and run the MPET Docker smoke test. |
| `make docker-battsimpy` | Rebuild and run the Python 2.7 battsimpy smoke test. |

## Content Improvements

- Add a beginner-facing "Which model should I start with?" decision tree with reproducibility status.
- Split model pages into consistent sections: purpose, model family, quickstart, reproduction status, known pitfalls, and citations.
- Add screenshots or plots for successful reproductions where outputs are graphical.
- Add a short "not suitable for" note to each model page to reduce misuse.
- Add exact upstream commit hashes to every reproduction record.
