# BattMo

BattMo is counted as **one project** in this Atlas. Its language implementations and user interfaces belong to the same project family, not additional models in the project count.

## Project family

| Implementation or interface | Role | Local evidence |
| --- | --- | --- |
| BattMo (MATLAB) | Original MATLAB/MRST implementation | [MATLAB reproduction](../REPRODUCTIONS/battmo.md) |
| [BattMo.jl](battmo-jl.md) | Julia/Jutul implementation | [Default P2D discharge passed](../REPRODUCTIONS/battmo-jl.md) |
| [PyBattMo](https://github.com/BattMoTeam/PyBattMo) | Python wrapper for BattMo.jl | No separate local test; not an additional solver project |
| BattMoApp | Web application for the BattMo family | No separate local test; not an additional solver project |

The family descriptions follow the upstream BattMo Family overview supplied during this review. Shared identity does not imply identical feature coverage: that overview describes Julia as still evolving toward the MATLAB feature set. Licenses and execution evidence remain implementation-specific (MATLAB: GPL-3.0; Julia: MIT). The technical details below concern MATLAB; the linked Julia page retains its own dependencies and limitations.

## MATLAB implementation

- Repo: <https://github.com/BattMoTeam/BattMo>
- License: GPL-3.0 (COPYING)
- Language/Framework: Mostly MATLAB (plus notebooks and a small amount of other languages)
- PyBaMM note: BattMo has PyBaMM comparison/loading utilities, but the core battery model implementation is MATLAB/MRST-based.

## Model lineage
- Family: continuum modelling for electrochemical devices
- Discretization: finite volume method via MRST grids.
- Note: This is a broader framework; battery DFN/P2D-style models are typically provided via specific modules/examples

## Extensions (if any)
- Targets continuum modelling for electrochemical devices; often multiphysics-oriented (thermal/degradation depend on the specific modules)

## Reproducibility
- Reproduced in this Atlas using MATLAB R2021b after upstream submodules were available.

### Quickstart
- Prereq: install **Git LFS** (upstream requirement)
- Clone with submodules: `git clone --recurse-submodules https://github.com/BattMoTeam/BattMo.git`
- In MATLAB (from the repo root): run `startupBattMo`
- Sanity-check example: run `runBatteryP2D`

### Entry point(s)
- `startupBattMo.m` — sets up BattMo/MRST paths
- `runBatteryP2D.m` — quick installation check (example runner)
- `examples/` — runnable MATLAB example scripts

### Environment lock
- No pinned MATLAB environment lock; major dependency is MRST (vendored via git submodules upstream).

### Beginner notes
- Run `startupBattMo` first and confirm MATLAB paths are configured before opening examples.
- Start from `runBatteryP2D.m`; BattMo is framework-oriented, so jumping directly into internals is slower.

### Numerics note
- BattMo uses finite volume grids through the MRST ecosystem; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- A general continuum modelling framework (not just a single battery code)
- Useful if you want to go beyond Li-ion batteries into other electrochemical devices

## Known limitations
- GPL license may be restrictive for some commercial use cases
- Onboarding may require learning the framework structure and examples

## Who is it for?
- Users who want a continuum/multiphysics-oriented open-source framework for electrochemical device modelling

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: A

Rationale: Active framework with documentation and examples; modular multiphysics design makes extensions straightforward, but setup requires MATLAB + framework familiarity.
