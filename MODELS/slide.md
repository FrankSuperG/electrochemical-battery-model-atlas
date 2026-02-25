# SLIDE

- Repo: <https://github.com/Battery-Intelligence-Lab/SLIDE>
- License: BSD-3-Clause
- Language/Framework: C++ (core) + MATLAB (post-processing/plot scripts)

## Model lineage
- Family: SPM (Single Particle Model)
- Core assumptions:
  - Reduced electrochemistry vs DFN/P2D; designed for fast simulation
  - Coupled bulk thermal model (temperature as an explicit state)
  - Degradation/aging models layered on top of the SPM

## Extensions (if any)
- Thermal: yes (bulk thermal model)
- Degradation: yes (multiple aging/degradation models; selectable)

## Reproducibility
- Not reproduced in this Atlas (summary below is based on upstream docs/structure).

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
