# dfn (scott-moura)

- Repo: <https://github.com/scott-moura/dfn>
- License: No standard LICENSE file detected
- Language/Framework: MATLAB

## Model lineage
- Family: DFN/P2D (Doyle–Fuller–Newman)
- Discretization: finite difference in the through-thickness direction with Pade approximation for solid diffusion.
- Positioning: MATLAB implementation of a DFN electrochemical battery model

## Extensions (if any)
- Thermal: not primary in this repository
- Degradation: not primary in this repository

## Reproducibility
- Reproduced in this Atlas using local Octave 11.1.0; `dfn_federico` is the working smoke entry in this snapshot.

### Quickstart
- Clone: `git clone https://github.com/scott-moura/dfn.git`
- Run the top-level MATLAB script(s) in repo (see README and root `.m` files)

### Entry point(s)
- Root MATLAB scripts/functions in repository
- Parameter and solver-related `.m` files under root

### Beginner notes
- Start from the simplest provided script first, then map where parameters and initial conditions are defined.
- Keep current sign convention and units consistent for cross-framework comparisons.

### Numerics note
- This model uses finite difference through-thickness discretization with Pade-style solid diffusion reduction; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Direct DFN/P2D-oriented MATLAB codebase from a well-known battery modeling group
- Useful as a compact reference implementation for equation-level study

## Known limitations
- No standard license metadata in repo (currently `NO-LICENSE` in this Atlas)
- Reproducibility depends on MATLAB version and missing environment pinning

## Who is it for?
- Users who want to inspect and run a MATLAB DFN/P2D implementation for learning/research

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B
