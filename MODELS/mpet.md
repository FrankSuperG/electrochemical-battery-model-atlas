# MPET

- Repo: <https://github.com/TRI-AMDD/mpet>
- License: MIT (see LICENSE)
- Language/Framework: Python

## Model lineage
- Family: porous-electrode-theory (P2D/DFN-class) lithium-ion simulator
- Positioning: multiphase porous-electrode theory; can represent phase-separating active materials

## Extensions (if any)
- Thermal: noted as limited/missing in upstream description for some workflows
- Degradation: depends on configured model choices

## Reproducibility
- Not reproduced in this Atlas yet (summary based on upstream docs/repository).

### Quickstart
- Clone: `git clone https://github.com/TRI-AMDD/mpet.git`
- Follow install docs: <https://mpet.readthedocs.io>
- Run a baseline case from example config files in repo/docs

### Entry point(s)
- Python package source under repository modules
- Config-driven simulation workflows (see docs + examples)

### Beginner notes
- Start from a published example input set before creating new chemistry/config files.
- For cross-model comparison, align parameter sets and operating protocols first.

## Strengths
- Physics-rich porous-electrode framework with multiphase capabilities
- Useful for research problems beyond standard single-phase DFN assumptions

## Known limitations
- Steeper learning curve than minimal teaching repos
- Some workflows may require careful dependency/environment setup

## Who is it for?
- Research users exploring advanced porous-electrode physics in an open Python codebase

## References
- Smith, Raymond B., Bazant, Martin Z.. “Multiphase Porous Electrode Theory.” Journal of The Electrochemical Society vol. 164(11) pp. E3291--E3310 2017. DOI: 10.1149/2.0171711jes

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: A
