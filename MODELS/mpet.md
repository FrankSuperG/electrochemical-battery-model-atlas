# MPET

- Repo: <https://github.com/TRI-AMDD/mpet>
- License: MIT (see LICENSE)
- Language/Framework: Python

## Model lineage
- Family: porous-electrode-theory (P2D/DFN-class) lithium-ion simulator
- Discretization: finite volume over electrolyte/electrode control volumes and particle discretization domains.
- Positioning: multiphase porous-electrode theory; can represent phase-separating active materials

## Extensions (if any)
- Thermal: noted as limited/missing in upstream description for some workflows
- Degradation: depends on configured model choices

## Reproducibility
- Reproduced locally in this Atlas with Docker `python:3.12-bookworm`, SourceForge `daetools=2.3.0`, `PyQt5`, and native OpenGL/Fortran libraries.

### Quickstart
- Clone: `git clone https://github.com/TRI-AMDD/mpet.git`
- Follow install docs: <https://mpet.readthedocs.io>
- Run a baseline case from example config files in repo/docs
- Tested smoke run: `PYTHONPATH=. python bin/run_tests.py --test_dir tests --output_dir /tmp/mpet-test-out test001`

### Entry point(s)
- Python package source under repository modules
- Config-driven simulation workflows (see docs + examples)

### Beginner notes
- Start from a published example input set before creating new chemistry/config files.
- For cross-model comparison, align parameter sets and operating protocols first.

### Numerics note
- MPET uses finite volume over electrolyte/electrode control volumes plus particle-domain discretization; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Physics-rich porous-electrode framework with multiphase capabilities
- Useful for research problems beyond standard single-phase DFN assumptions

## Known limitations
- Steeper learning curve than minimal teaching repos
- Some workflows may require careful dependency/environment setup
- Reproduction depends on obtaining the large `daetools` binary/runtime; minimal Docker images also need `libgfortran5`, `libgl1`, `PyQt5`, and related GUI/OpenGL dependencies.

## Who is it for?
- Research users exploring advanced porous-electrode physics in an open Python codebase

## References
- Smith, Raymond B., Bazant, Martin Z.. “Multiphase Porous Electrode Theory.” Journal of The Electrochemical Society vol. 164(11) pp. E3291--E3310 2017. DOI: 10.1149/2.0171711jes

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: A
