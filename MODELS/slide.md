# SLIDE

- Repo: <https://github.com/Battery-Intelligence-Lab/SLIDE>
- License: BSD-3-Clause
- Language/Framework: C++ (core) + MATLAB (post-processing/plot scripts)
- PyBaMM note: SLIDE has Python benchmark scripts that call PyBaMM, but the core simulator reproduced here is the independent C++ implementation.

## Model lineage
- Family: SPM (Single Particle Model)
- Discretization: spectral/Chebyshev collocation for solid diffusion matrices.
- Core assumptions:
  - Reduced electrochemistry vs DFN/P2D; designed for fast simulation
  - Coupled bulk thermal model (temperature as an explicit state)
  - Degradation/aging models layered on top of the SPM

## Extensions (if any)
- Thermal: yes (bulk thermal model)
- Degradation: yes (multiple aging/degradation models; selectable)

## Reproducibility
- Independently reproduced in this Atlas on 2026-05-02 by building the C++ project with CMake/Ninja and running the upstream CTest unit suite.
- Evidence: `100% tests passed, 0 tests failed out of 8`; total test time `64.62 sec`.

### Quickstart
- Build: configure/compile with CMake (see upstream docs)
- Run: compile and execute the generated binary; select procedure in `src/main.cpp` (often by enabling/uncommenting the desired procedure)
- Plot: run MATLAB scripts (e.g., `matlab/readCCCV.m`) on generated CSV outputs

### Entry point(s)
- `src/main.cpp` — main driver (procedure selection)
- `src/` — simulator implementation
- `examples/` — example procedures/datasets
- `matlab/` — result readers/plotting scripts

### Environment lock
- `CMakeLists.txt` present (C++ build); no single cross-platform environment lock (toolchain + MATLAB version are the main constraints).

### Beginner notes
- Start by running one documented procedure unchanged, then inspect the generated CSV outputs before changing degradation settings.
- SLIDE is optimized for long aging simulations; keep a small smoke case for quick checks.

### Numerics note
- SLIDE uses spectral/Chebyshev collocation matrices generated through the MATLAB workflow; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Very fast (explicitly optimized for long degradation simulations)
- Clear focus: degradation/aging on top of an SPM baseline
- Good engineering hygiene for a research codebase (CMake, tests/CI, docs site)

## Known limitations
- SPM-based: electrolyte dynamics and spatially resolved porous-electrode physics are not the default emphasis
- “Choose procedure by uncommenting code” can be less reproducible than a pure config-driven interface (unless you discipline it with version control)

## Who is it for?
- Users who need **fast long-horizon degradation simulations** and are comfortable compiling/running C++ projects
- Great complement to DFN/P2D frameworks when you want speed over full physics

## References
- Reniers, J. M., Mulder, G., Howey, D. A.. “Review and performance comparison of mechanical-chemical degradation models for lithium-ion batteries.” Journal of The Electrochemical Society vol. 166(14) pp. A3189--A3200 2019. DOI: 10.1149/2.0281914jes

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: A

Rationale: C++ core with clear build/docs and a focused scope; reproducibility is good, but compiling and selecting procedures (often via code/config) can add friction compared to a pure-Python workflow.
