# fastDFN

- Repo: <https://github.com/scott-moura/fastDFN>
- License: No standard LICENSE file detected
- Language/Framework: MATLAB

## Model lineage
- Family: DFN/P2D
- Discretization: finite difference in the through-thickness direction with Pade approximation for solid diffusion.
- Positioning: fast electrochemical-thermal DFN simulator

## Extensions (if any)
- Thermal: yes (electrochemical-thermal coupling is core positioning)
- Degradation: not primary in base repository positioning

## Reproducibility
- Reproduced in this Atlas using local Octave 11.1.0.

### Quickstart
- Clone: `git clone https://github.com/scott-moura/fastDFN.git`
- Open MATLAB and run the main example/demo script listed in upstream README

### Entry point(s)
- Root-level MATLAB run scripts
- Core DFN + thermal solver functions under source folders

### Beginner notes
- Validate a stock run first; only then change mesh/order/solver settings.
- For fair comparisons against standard DFN, keep protocol and thermal assumptions aligned.

### Numerics note
- fastDFN uses finite difference through-thickness discretization with Pade-style solid diffusion reduction; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Emphasis on speed while retaining DFN-class electrochemical-thermal structure
- Good candidate when thermal behavior matters but full high-cost DFN runs are too slow

## Known limitations
- No standard license metadata in repo (`NO-LICENSE` here)
- MATLAB-dependent; reproducibility tied to environment/toolboxes

## Who is it for?
- Users needing faster DFN-class electrochemical-thermal simulations in MATLAB

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B
