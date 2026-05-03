<div align="center">
  <p align="center">
    <img src="assets/logo.png" alt="Electrochemical Battery Model Atlas logo" width="100%" style="max-width: 480px; height: auto;" />
  </p>

  <h1>Electrochemical Battery Model Atlas</h1>

</div>

<p align="center">
  <a href="https://github.com/FrankSuperG/electrochemical-battery-model-atlas/actions/workflows/validate.yml"><img alt="Validate Atlas" src="https://github.com/FrankSuperG/electrochemical-battery-model-atlas/actions/workflows/validate.yml/badge.svg" /></a>
  <a href="LICENSE"><img alt="License: CC BY 4.0" src="https://img.shields.io/badge/license-CC--BY--4.0-blue" /></a>
  <img alt="Models indexed: 19" src="https://img.shields.io/badge/models-19-2f855a" />
  <img alt="Successful reproductions: 14" src="https://img.shields.io/badge/reproduced-14%2F19-2b6cb0" />
</p>

**Electrochemical Battery Model Atlas (E-BatMA)** is a curated, reproducibility-focused guide to publicly available electrochemical battery model repositories and workflows. It emphasizes the **Doyle-Fuller-Newman / pseudo-two-dimensional (DFN/P2D)** family and reduced or extended variants: **Single Particle Model (SPM)**, **Single Particle Model with electrolyte (SPMe)**, thermal coupling, and degradation/aging.

The project is built for three audiences:

| Audience | What to use first |
| --- | --- |
| Newcomers | Start with [`FIRST_RUN.md`](FIRST_RUN.md), then follow [`LEARNING_PATH.md`](LEARNING_PATH.md). |
| Researchers | Use the model index below, [`NUMERICS.md`](NUMERICS.md), and the reproduction dashboard in [`REPRODUCTIONS/`](REPRODUCTIONS/). |
| Contributors | Add or improve entries through [`data/models.yaml`](data/models.yaml), model pages, and [`CONTRIBUTING.md`](CONTRIBUTING.md). |

## What This Atlas Provides

| Area | Where to look |
| --- | --- |
| Comparable model reviews | [`MODELS/`](MODELS/) and the generated model index below. |
| Local reproduction evidence | [`REPRODUCTIONS/SUMMARY.md`](REPRODUCTIONS/SUMMARY.md), [`REPRODUCTIONS/COVERAGE.md`](REPRODUCTIONS/COVERAGE.md), and [`REPRODUCTIONS/DEPENDENCIES.md`](REPRODUCTIONS/DEPENDENCIES.md). |
| Environment recipes | [`REPRODUCTIONS/environments/`](REPRODUCTIONS/environments/) for selected successful reproduction paths. |
| Numerical methods | [`NUMERICS.md`](NUMERICS.md), including PyBaMM spatial methods and solver notes. |
| Framework reuse notes | [`FRAMEWORK_DEPENDENCIES.md`](FRAMEWORK_DEPENDENCIES.md), especially for PyBaMM-backed workflows. |
| Learning references | [`REFERENCES.md`](REFERENCES.md) and [`references.bib`](references.bib). |

## Current Snapshot

| Metric | Current state |
| --- | --- |
| Model entries | 19 public model repositories or workflows. |
| Successful reproductions | 14 entries with command-level evidence. |
| Unreproduced after targeted attempts | 5 entries with documented blockers. |
| Curated reference set | 35 BibTeX entries with a staged reading roadmap. |
| Validation | `node scripts/models.js check` regenerates docs, validates metadata, checks links, validates BibTeX anchors, and checks README snapshot counts. |

## Start Here

| Goal | Recommended path |
| --- | --- |
| Run your first model | [`FIRST_RUN.md`](FIRST_RUN.md) → choose PyBaMM, CPG-SPMT, or SLIDE. |
| Learn the model hierarchy | [`MODEL_MAP.md`](MODEL_MAP.md) → SPM → SPMe → DFN/P2D. |
| Pick a model for a project | Use **Choose a model** below, then read the corresponding `MODELS/*.md` page. |
| Compare numerical methods | Read [`NUMERICS.md`](NUMERICS.md) before comparing runtime or accuracy. |
| Reproduce an existing result | Start from [`REPRODUCTIONS/SUMMARY.md`](REPRODUCTIONS/SUMMARY.md), then use [`REPRODUCTIONS/DEPENDENCIES.md`](REPRODUCTIONS/DEPENDENCIES.md). |
| Build background knowledge | Follow the reading roadmap in [`REFERENCES.md`](REFERENCES.md#beginner-reading-roadmap). |

If acronym-heavy pages feel dense, start with [`GLOSSARY.md`](GLOSSARY.md).

## Quickstart

1. Read [`FIRST_RUN.md`](FIRST_RUN.md).
2. Pick one model from **Choose a model** below.
3. Run one standard test: **1C constant-current (CC) discharge** at **25°C**.
4. Record at least voltage vs time `V(t)` and, when available, temperature `T(t)` and state of charge `SOC(t)`.
5. Keep parameter set, initial condition, current sign convention, and voltage cutoffs fixed when comparing models.

## Reproduction Status

<!-- REPRODUCTION_STATUS_START -->
Reproduction records are maintained in [REPRODUCTIONS/](REPRODUCTIONS/). As of 2026-05-02, the Atlas has 14 successful reproductions, 5 unreproduced entries, 0 partial entries, and 0 blocked entries.

Start with the [reproduction dashboard](REPRODUCTIONS/SUMMARY.md) for a high-level view, then use the [dependency matrix](REPRODUCTIONS/DEPENDENCIES.md) and [coverage matrix](REPRODUCTIONS/COVERAGE.md) for exact environments and blockers.
<!-- REPRODUCTION_STATUS_END -->

## Choose a Model

| Need | Start with | Why |
| --- | --- | --- |
| Widely used, reproducible baseline | **PyBaMM** | Modern Python framework covering SPM, SPMe, DFN, thermal, and degradation options. |
| Fast long-horizon degradation simulation | **SLIDE** | C++ SPM-based simulator with thermal and degradation focus; local CTest suite reproduced. |
| MATLAB-based DFN framework | **BattMo** | Broader MATLAB/MRST continuum framework; reproduced with MATLAB R2021b. |
| Lightweight educational DFN/SPMe examples | **dfn-scott-moura**, **fastDFN**, **SPMeT** | Small MATLAB/Octave-oriented examples that are useful for reading equations. |
| Control-oriented SPM with thermal effects | **CPG-SPMT** | Focused Python implementation with validation workflow. |
| Solver internals and harder reproducibility cases | **p2d_solver**, **batP2dFoam** | Useful for studying implementation issues, but currently unreproduced or blocked. |

Rule of thumb: use SPM/SPMe for speed and control, DFN/P2D for physics baseline, thermal models when temperature matters, and degradation models when lifetime or aging is the target.

## Implementation Base Notes

<!-- IMPLEMENTATION_BASE_START -->
Use this table to avoid double-counting PyBaMM-backed workflows as independent PDE implementations.

| Entry      | Implementation role                      | Note                                                                                                   |
|------------|------------------------------------------|--------------------------------------------------------------------------------------------------------|
| `pybamm`   | Primary framework                        | Primary PyBaMM framework entry; solves SPM, SPMe, DFN, and extensions directly.                        |
| `spme-oed` | PyBaMM-backed workflow                   | Delegates the SPMe battery solve to PyBaMM via `pybamm.lithium_ion.SPMe()` and `pybamm.Simulation`.    |
| `battmo`   | Independent core; PyBaMM comparison only | Core BattMo battery models are MATLAB/MRST-based; PyBaMM appears in comparison/loading utilities only. |
| `slide`    | Independent core; PyBaMM comparison only | Core SLIDE simulator is C++; PyBaMM appears in Python benchmark scripts only.                          |

Rule: keep PyBaMM itself as the primary framework entry; keep PyBaMM-backed papers/workflows as separate Atlas entries only when they add a distinct research task, dataset, protocol, or workflow around the framework.
<!-- IMPLEMENTATION_BASE_END -->

## Model index (core info in one view)
All entries below link to a short review page with **Quickstart**, **entry point(s)**, and **beginner notes**.

> Note on licensing rigor: upstream licenses are listed explicitly in the model index. Some public repositories do not include a standard open-source license file; those entries are marked as `NO-LICENSE`. Noncommercial or restrictive licenses are not equivalent to permissive open-source licenses.

<!-- MODEL_INDEX_START -->

| Slug                          | Name                | Family       | Language     | License                      | Reuse risk    | Extensions           | Best for                                         | Page                                                                           |
|-------------------------------|---------------------|--------------|--------------|------------------------------|---------------|----------------------|--------------------------------------------------|--------------------------------------------------------------------------------|
| `batp2dfoam`                  | batP2dFoam          | DFN          | C++          | GPL-3.0                      | copyleft      | —                    | solver, openfoam, performance                    | [MODELS/batp2dfoam.md](MODELS/batp2dfoam.md)                                   |
| `battmo`                      | BattMo              | DFN          | MATLAB       | GPL-3.0                      | copyleft      | thermal, degradation | framework, continuum, research                   | [MODELS/battmo.md](MODELS/battmo.md)                                           |
| `battsimpy`                   | battsimpy           | SPM/DFN      | Python       | GPL-3.0                      | copyleft      | —                    | framework, educational                           | [MODELS/battsimpy.md](MODELS/battsimpy.md)                                     |
| `cpg-spmt`                    | CPG-SPMT            | SPM          | Python       | PolyForm-Noncommercial-1.0.0 | noncommercial | thermal              | fast-simulation, control, estimation             | [MODELS/cpg-spmt.md](MODELS/cpg-spmt.md)                                       |
| `dfn-scott-moura`             | dfn                 | DFN/P2D      | MATLAB       | NO-LICENSE                   | no-license    | —                    | reference-implementation, educational, research  | [MODELS/dfn-scott-moura.md](MODELS/dfn-scott-moura.md)                         |
| `fastdfn`                     | fastDFN             | DFN/P2D      | MATLAB       | NO-LICENSE                   | no-license    | thermal              | fast-simulation, solver, research                | [MODELS/fastdfn.md](MODELS/fastdfn.md)                                         |
| `jubat`                       | JuBat               | DFN/SPM/SPMe | Julia        | GPL-3.0                      | copyleft      | —                    | framework                                        | [MODELS/jubat.md](MODELS/jubat.md)                                             |
| `lionsimba`                   | LIONSIMBA           | DFN          | MATLAB       | MIT                          | permissive    | —                    | framework, control, educational                  | [MODELS/lionsimba.md](MODELS/lionsimba.md)                                     |
| `mpet`                        | MPET                | P2D/DFN      | Python       | MIT                          | permissive    | —                    | framework, research                              | [MODELS/mpet.md](MODELS/mpet.md)                                               |
| `p2d-li-ion-battery-decaluwe` | p2d_li_ion_battery  | DFN          | Python       | BSD-3-Clause                 | permissive    | —                    | reference-implementation, educational            | [MODELS/p2d-li-ion-battery-decaluwe.md](MODELS/p2d-li-ion-battery-decaluwe.md) |
| `p2d-model-dkong8s93`         | p2d-model           | DFN          | MATLAB       | NO-LICENSE                   | no-license    | —                    | finite-difference, educational                   | [MODELS/p2d-model-dkong8s93.md](MODELS/p2d-model-dkong8s93.md)                 |
| `p2d-solver-hanrach`          | p2d_solver          | DFN          | Python       | NO-LICENSE                   | no-license    | —                    | solver, finite-difference, jax                   | [MODELS/p2d-solver-hanrach.md](MODELS/p2d-solver-hanrach.md)                   |
| `petlion-jl`                  | PETLION.jl          | P2D/DFN      | Julia        | MIT                          | permissive    | —                    | solver, performance, research                    | [MODELS/petlion-jl.md](MODELS/petlion-jl.md)                                   |
| `pseudo-sim-liuyang12`        | Pseudo_sim          | DFN          | MATLAB       | NO-LICENSE                   | no-license    | —                    | educational                                      | [MODELS/pseudo-sim-liuyang12.md](MODELS/pseudo-sim-liuyang12.md)               |
| `pybamm`                      | PyBaMM              | DFN/SPM/SPMe | Python       | BSD-3-Clause                 | permissive    | thermal, degradation | framework, research, reproducibility             | [MODELS/pybamm.md](MODELS/pybamm.md)                                           |
| `slide`                       | SLIDE               | SPM          | C++ + MATLAB | BSD-3-Clause                 | permissive    | thermal, degradation | fast-simulation, degradation                     | [MODELS/slide.md](MODELS/slide.md)                                             |
| `spectral-li-ion-spm`         | Spectral_li-ion_SPM | SPM          | MATLAB       | BSD-3-Clause                 | permissive    | —                    | spectral-method, educational                     | [MODELS/spectral-li-ion-spm.md](MODELS/spectral-li-ion-spm.md)                 |
| `spme-oed`                    | SPMe_OED            | SPMe         | Python       | NO-LICENSE                   | no-license    | —                    | parameter-inference, optimal-experimental-design | [MODELS/spme-oed.md](MODELS/spme-oed.md)                                       |
| `spmet`                       | SPMeT               | SPMe         | MATLAB       | GPL-3.0                      | copyleft      | thermal              | control, estimation, educational                 | [MODELS/spmet.md](MODELS/spmet.md)                                             |

<!-- MODEL_INDEX_END -->

---

## Scope

Included:
- **DFN/P2D** (Newman-type porous-electrode electrochemical models)
- **SPM / SPMe**
- Thermal coupling
- Degradation / aging (SEI, lithium plating, LAM/LLI, cracking, etc.)

Out of scope (by design):
- Equivalent circuit model (**ECM**) collections

Why: this Atlas focuses on **physics-based electrochemical models**, not equivalent-circuit abstractions.

## FAQ

- **Why do two models disagree a lot?**
  Most commonly: different parameter sets, different initial state of charge (**SOC**) / stoichiometry, or different current sign/units.
- **How do I make comparisons meaningful?**
  Keep protocol and assumptions aligned: same parameter set, same experiment profile, same temperature, same cutoffs/sign conventions, and (if available) similar solver tolerances.
- **Which entry should I trust most as a baseline?**
  Usually **PyBaMM**, because it is well-tested and widely used.
- **Are all successful reproductions equivalent?**
  No. Some are minimal smoke tests, some are upstream examples, and some are full test-suite builds. Read each `REPRODUCTIONS/<slug>.md` file for exact scope.
- **Can I use the listed upstream models commercially?**
  Do not assume that. The Atlas license is CC-BY-4.0 for this curated content, but every upstream model keeps its own license. Check the `License` and `Reuse risk` columns before reuse.

## Repository Structure

| Path | Purpose |
| --- | --- |
| [`MODELS/`](MODELS/) | Human-readable model reviews and quickstarts. |
| [`REPRODUCTIONS/`](REPRODUCTIONS/) | Reproduction logs, blockers, dependency matrix, and environment recipes. |
| [`data/models.yaml`](data/models.yaml) | Machine-readable model metadata used to generate the README index. |
| [`data/reproductions.yaml`](data/reproductions.yaml) | Machine-readable reproduction status and blocker metadata. |
| [`REFERENCES.md`](REFERENCES.md) | Staged reading roadmap and representative papers. |
| [`references.bib`](references.bib) | Citation-ready BibTeX keys used by the Atlas. |
| [`scripts/models.js`](scripts/models.js) | Lightweight generator and validation script. |

## Validation

Run the release check before opening a pull request:

```bash
node scripts/models.js check
```

Equivalent Make target:

```bash
make check
```

These commands regenerate generated files, validate model and reproduction metadata, check internal Markdown/HTML links and anchors, verify BibTeX keys and reference anchors, and check that README snapshot counts match the metadata.

## Contributing (models + key papers welcome)

Contributions are welcome—especially from people who have run a model or used it in research.

### Add a new model
Add:
1. A model page: `MODELS/<slug>.md`
2. A matching entry in: `data/models.yaml`
3. In the model page, add `## References` with complete reference entries (preferably sourced from `references.bib`)

### Add important references
If you know “must-cite” papers (foundational formulation, key validation, numerical method, degradation model, etc.), please add them to:
- `REFERENCES.md` (human-readable list)
- `references.bib` (BibTeX; canonical key source for model pages)

Then run `node scripts/models.js check` so generated files and citation anchors stay consistent.

See: [`CONTRIBUTING.md`](CONTRIBUTING.md)

For larger repository improvements, see [`ROADMAP.md`](ROADMAP.md).

## Contributors
- Feng Guo (VITO/UHasselt) — [Google Scholar](https://scholar.google.com/citations?user=z2SHUxkAAAAJ&hl=en), [ORCID](https://orcid.org/0000-0002-5141-8672)
- Luis D. Couto (VITO) — [Google Scholar](https://scholar.google.com/citations?user=_qgWXF4AAAAJ&hl=en)
- Nicola Courtier (University of Oxford) — [Google Scholar](https://scholar.google.com/citations?user=TXaON-EAAAAJ&hl=en)
- Ross Drummond (University of Sheffield) — [Google Scholar](https://scholar.google.com/citations?hl=en&user=_fqk_tkAAAAJ)

## Disclaimer
Reviews are subjective and based on public information and independent reproduction attempts when available.
