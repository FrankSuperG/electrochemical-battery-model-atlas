# PETLION.jl

- Repo: <https://github.com/MarcBerliner/PETLION.jl>
- License: MIT
- Language/Framework: Julia

## Model lineage
- Family: porous-electrode-theory (P2D/DFN-class) Li-ion simulation
- Positioning: high-performance implementation focused on fast porous-electrode simulations

## Extensions (if any)
- Thermal: not the primary focus in base repository description
- Degradation: not the primary focus in base repository description

## Reproducibility
- Not reproduced in this Zoo yet (summary based on upstream README/repository metadata).

### Quickstart
- Clone: `git clone https://github.com/MarcBerliner/PETLION.jl.git`
- In Julia, activate project and instantiate dependencies, then run a bundled example (see upstream README)

### Entry point(s)
- `src/` Julia package source
- Example scripts/notebooks included upstream

### Beginner notes
- If you are new to Julia, validate one stock example end-to-end before editing model equations.
- For fair comparisons with PyBaMM/BattMo/LIONSIMBA, align protocol and initial conditions carefully.

## Strengths
- Julia-based high-performance porous-electrode modelling
- Good candidate for users balancing physical detail and speed

## Known limitations
- Smaller user ecosystem than PyBaMM/MATLAB-based toolchains
- Requires Julia environment familiarity

## Who is it for?
- Users wanting P2D/DFN-class simulation in Julia with performance-oriented workflows

## References
- Berliner, Marc D., Canty, Richard B., others. “Methods---PETLION: Open-Source Software for Millisecond-Scale Porous Electrode Theory-Based Lithium-Ion Battery Simulations.” Journal of The Electrochemical Society vol. 168(9) pp. 090546 2021. DOI: 10.1149/1945-7111/ac201c

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B
