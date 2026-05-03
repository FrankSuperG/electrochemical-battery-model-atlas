# Spectral_li-ion_SPM

- Repo: <https://github.com/davidhowey/Spectral_li-ion_SPM>
- License: BSD-3-Clause (based on the LICENSE.txt header and clause structure)
- Language/Framework: MATLAB

## Model lineage
- Family: SPM
- Discretization: spectral/Chebyshev collocation for SPM solid diffusion and related subproblems.

## Extensions (if any)
- Electrolyte dynamics not verified here (classic SPM typically neglects electrolyte dynamics)
- Thermal/degradation not verified here

## Reproducibility
- Reproduced in this Atlas using MATLAB R2021b plus a `chebdif.m` compatibility shim.

### Quickstart
- Requires MATLAB (upstream notes it was developed/tested on MATLAB R2015b)
- Run the provided example script: `EXAMPLE_constant_current_discharge.m`
- If it errors on differentiation matrices, install the external `DMSUITE` dependency and add it to your MATLAB path (as described upstream)

### Entry point(s)
- `EXAMPLE_constant_current_discharge.m` — step-by-step runnable example (MATLAB publish-formatted)
- `source/get_model.m` — model assembly
- `source/derivs_spm.m` — SPM ODE/PDE semi-discrete dynamics
- `model_parameters/` — parameter and OCV data helpers

### Environment lock
- MATLAB version not pinned; upstream suggests R2015b+ and external DMSUITE dependency.

### Beginner notes
- Run `EXAMPLE_constant_current_discharge.m` first; it is the most direct path from parameters to output.
- If the differentiation matrix helper is missing, solve that dependency before changing model code.

### Numerics note
- This model is a compact spectral/Chebyshev collocation reference for SPM solid diffusion; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Spectral methods for SPM are a useful reference for accuracy vs speed trade-offs
- MATLAB implementation can be convenient for teaching and numerical-method comparisons

## Known limitations
- Requires MATLAB

## Who is it for?
- Users interested in numerical discretization/acceleration for SPM
- Users comparing FDM/FVM vs spectral methods for solid diffusion in SPM

## References
- Bizeray, A. M., Zhao, S., Duncan, S. R., Howey, D. A.. “Lithium-ion battery thermal-electrochemical model-based state estimation using orthogonal collocation and a modified extended Kalman filter.” Journal of Power Sources vol. 296 pp. 400--412 2015. DOI: 10.1016/j.jpowsour.2015.07.019

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: Clear educational MATLAB code and method description; reproducibility mainly depends on MATLAB availability and a minimal run script.
