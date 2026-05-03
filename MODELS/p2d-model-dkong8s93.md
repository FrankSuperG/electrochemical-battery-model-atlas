# p2d-model (dkong8s93)

- Repo: <https://github.com/dkong8s93/p2d-model>
- License: License not detected via the GitHub license API
- Language/Framework: MATLAB (with a small amount of Mathematica)

## Model lineage
- Family: DFN/P2D
- Discretization: finite difference method; variants include full Fickian particle diffusion and reduced/two-term approximations.

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Unreproduced in this Atlas. MATLAB reaches the Newton setup, but tested variants fail at the initial nearly singular matrix solve before a clean time loop completes.

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

### Numerics note
- The variants use finite difference discretization and reduced solid-diffusion approximations; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- A MATLAB DFN/P2D implementation can be helpful for teaching and understanding discretization details

## Known limitations
- Octave can fail first in plotting. MATLAB gets farther, but `reduced_temperature_model/script.m` hits a nearly singular initial Jacobian (`rcond` around `2e-21`).
- `reduced_big_Phi_model/script.m` also fails at the initial solve with `RCOND` around `5e-23`.
- A typo fix in `assemble_vDv.m` corrected bad Jacobian indexing, but it did not resolve the rank deficiency.

## Who is it for?
- Users who want to study a finite-difference DFN/P2D implementation in MATLAB

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: C
- Clarity: C
- Extensibility: C

Rationale: Educational MATLAB scripts with multiple variants, but the tested variants need conditioning diagnostics and Newton iteration guards before clean reproduction.
