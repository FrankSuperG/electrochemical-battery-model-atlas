# spectral-li-ion-spm

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/davidhowey/Spectral_li-ion_SPM>
- Local checkout: `<atlas-root>/.upstream/davidhowey__Spectral_li-ion_SPM`

## Environment
- OS: macOS
- Runtime: MATLAB R2021b

## Run
```bash
matlab -batch "set(0,'DefaultFigureVisible','off'); addpath('<atlas-root>/REPRODUCTIONS/shims/spectral-li-ion-spm'); cd('<atlas-root>/.upstream/davidhowey__Spectral_li-ion_SPM'); addpath(genpath(pwd)); EXAMPLE_constant_current_discharge; disp('SPECTRAL_SPM_OK')"
```

## Outcome
- Result: success
- Actual output: the constant-current discharge example completed and printed `SPECTRAL_SPM_OK`.

## Notes
- The repository requires `chebdif.m` from DMSUITE; it was not present in MATLAB's path.
- The official MathWorks File Exchange download page requires login, so this reproduction used a local `chebdif` shim in `REPRODUCTIONS/shims/spectral-li-ion-spm`.
- MATLAB batch mode printed harmless font warnings on this machine.
