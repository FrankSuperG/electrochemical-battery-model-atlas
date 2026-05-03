# Pseudo_sim (liuyang12)

- Repo: <https://github.com/liuyang12/Pseudo_sim>
- License: License not detected via the GitHub license API
- Language/Framework: MATLAB

## Model lineage
- Family: DFN/P2D (pseudo two-dimensional model)
- Discretization: finite difference method with method-of-lines conversion.

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Reproduced in this Atlas using MATLAB R2021b plus TOMLAB/KNITRO compatibility shims backed by `fmincon`.

### Quickstart
- Requires MATLAB
- Main battery-model driver appears to be: `T1master.m` (calls `T1params`, `T1initialize`, etc.)

### Entry point(s)
- `T1master.m` — main driver script (pseudo-2D Li-ion battery model)
- `T1params.m` — constants/parameters
- `T1initialize.m` — initialization
- `T1potential.m`, `T1Temp.m` — subroutines (potential/thermal)

### Environment lock
- No environment lock; reproducibility depends on MATLAB version and file/path setup.
### Beginner notes
- Begin at `T1master.m` and follow the call chain into `T1params.m` and initialization; that will reveal the state variables and solver loop.
- If you want to adjust operating conditions, do it in the parameter script (not by editing inside the time loop).
- MATLAB scripts often rely on globals; search for `global` to understand hidden dependencies before refactoring.

### Numerics note
- Pseudo_sim uses finite difference method-of-lines style discretization with MATLAB ODE solving; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- MATLAB implementation may be easier to read for some learners (depends on code organization)

## Known limitations
- Older repositories often lack clear environment/run instructions; this one required TOMLAB/KNITRO compatibility shims for the reproduced path.

## Who is it for?
- Users who want a MATLAB P2D example for learning or cross-checking

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: C
- Clarity: C
- Extensibility: C

Rationale: Older MATLAB example repo; documentation and packaging are minimal, so reproducing results and extending code will take extra manual effort.
