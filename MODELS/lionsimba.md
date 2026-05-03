# LIONSIMBA

- Repo: <https://github.com/lionsimbatoolbox/LIONSIMBA>
- License: MIT
- Language/Framework: MATLAB (supports Octave in newer releases)

## Model lineage
- Family: DFN/P2D-style lithium-ion model (finite-volume formulation)
- Positioning: design, simulation, and control-oriented Li-ion electrochemical modelling

## Extensions (if any)
- Thermal: not the primary focus in the base description (check specific examples)
- Degradation: not the primary focus in the base description (check specific examples)

## Reproducibility
- Unreproduced in this Atlas. MATLAB R2021b cannot see the required SUNDIALS MATLAB interface (`IDAInit`, `IDASolve`, `IDAFree`) or `casadi`.

### Quickstart
- Clone: `git clone https://github.com/lionsimbatoolbox/LIONSIMBA.git`
- Open MATLAB/Octave and run one of the provided example scripts (see repository wiki/docs)

### Entry point(s)
- Repository root scripts + example cases (see project wiki)
- Main package code under toolbox source folders in repo

### Beginner notes
- Read the paper + wiki first to map symbols/notation before modifying equations.
- Keep current sign convention and units consistent when comparing against other DFN implementations.

### Numerics note
- LIONSIMBA uses finite volume through-thickness discretization and selectable solid-diffusion approximations; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Well-known MATLAB toolbox in the battery-modeling community
- Finite-volume implementation is useful for users interested in discretization details

## Known limitations
- MATLAB-centric workflow
- Documentation is spread across repository + wiki + paper
- A working SUNDIALS MATLAB interface and CasADi installation are hard requirements for the tested example scripts.

## Who is it for?
- Users who want a DFN/P2D-like MATLAB toolbox for simulation/control learning and research

## References
- Torchio, Marcello, Magni, Lalo, Gopaluni, R. Bhushan, Braatz, Richard D., Raimondo, Davide M.. “LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control.” Journal of The Electrochemical Society vol. 163(7) pp. A1192--A1205 2016. DOI: 10.1149/2.0291607jes

## Optional grades
- Reproducibility: C
- Clarity: B
- Extensibility: B
