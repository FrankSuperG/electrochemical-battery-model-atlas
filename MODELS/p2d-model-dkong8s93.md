# p2d-model (dkong8s93)

- Repo: <https://github.com/dkong8s93/p2d-model>
- License: License not detected via the GitHub license API
- Language/Framework: MATLAB (with a small amount of Mathematica)

## Model lineage
- Family: DFN/P2D
- Numerics: finite difference

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Not reproduced in this Atlas (summary below is based on upstream repository structure).

### Quickstart
- Requires MATLAB
- Choose a variant folder and run its script:
  - `ficks_model/script.m`
  - `reduced_big_Phi_model/script.m`
  - `reduced_temperature_model/script.m`
  - `two_term_approximation_model/script.m`

### Entry point(s)
- `*/script.m` — runnable driver scripts (one per variant folder)
- `assemble_*.m`, `*_Eqn*.m`, etc. — discretization/assembly helpers within each variant

### Environment lock
- No environment lock; reproducibility depends on MATLAB version and toolbox availability.
### Beginner notes
- Pick one folder (e.g., `ficks_model/`) and run/read `script.m` first; each folder is its own self-contained variant.
- Make a quick map of “where parameters live” in that variant (often a `params` struct or constants at the top of scripts).
- When comparing variants, keep the same operating conditions and only change the approximation—otherwise differences are hard to attribute.

## Strengths
- A MATLAB DFN/P2D implementation can be helpful for teaching and understanding discretization details

## Known limitations
- Reproducibility depends on clear run scripts + parameter files (needs verification)

## Who is it for?
- Users who want to study a finite-difference DFN/P2D implementation in MATLAB

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: C
- Clarity: C
- Extensibility: C

Rationale: Educational MATLAB scripts with multiple variants, but lacks clear top-level run instructions and environment details, limiting reproducibility and extensibility.
