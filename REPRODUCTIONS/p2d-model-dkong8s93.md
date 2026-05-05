# p2d-model-dkong8s93

- Status: `unreproduced`
- Date: 2026-05-05
- Upstream repo: <https://github.com/dkong8s93/p2d-model>
- Upstream commit: `85d867773b623d89e45c5a2a32a4ca1a46e813e9`
- Upstream checkout: `<atlas-root>/.upstream/dkong8s93__p2d-model`

## Environment
- OS: macOS
- Runtime: MATLAB R2021b and Octave 11.1.0

## Run
```bash
octave --no-gui --quiet --eval "cd('<atlas-root>/.upstream/dkong8s93__p2d-model/reduced_temperature_model'); script; disp('DKONG_REDUCED_TEMP_OK');"
matlab -batch "set(0,'DefaultFigureVisible','off'); cd('<atlas-root>/.upstream/dkong8s93__p2d-model/reduced_temperature_model'); script; disp('DKONG_REDUCED_TEMP_OK')"
```

## Outcome
- Result: unreproduced
- Actual output:
  - Octave reaches `initializePlotting`, then fails creating scatter handles with `error: __go_scatter__: set: invalid number of arguments`
  - MATLAB gets past plotting and enters the Newton solve, but repeatedly warns that the matrix is nearly singular at `script` line 50; the run was interrupted after sustained high CPU without completion
  - `two_term_approximation_model/script.m` shows the same sustained near-singular matrix behavior around line 55, with `RCOND` values around `1e-23`
  - turning `MATLAB:nearlySingularMatrix` into an error catches the first failure in `reduced_temperature_model/script.m` at line 42, before the time loop, with `RCOND = 2.240467e-21`
  - 2026-05-05 retest promoted `MATLAB:nearlySingularMatrix` to an error and checked all four official `script.m` variant entries:
    - `ficks_model/script.m` failed at line 42 with `RCOND = 3.576152e-24`
    - `reduced_temperature_model/script.m` failed at line 42 with `RCOND = 2.240467e-21`
    - `reduced_big_Phi_model/script.m` failed at line 42 with `RCOND = 4.995168e-23`
    - `two_term_approximation_model/script.m` failed at line 47 with `RCOND = 6.116040e-23`
  - diagnostic dimensions for the initial reduced-temperature Jacobian: `Np=80`, `Ns=25`, `Nn=88`, `Nr=8`, `lenU=2247`, `nnzJ=8330`, `rankFull=2077`, `condest=4.46336e+20`
  - a definite source typo was found and patched locally in `reduced_temperature_model/assemble_vDv.m`: `Dv(id_cn+1:id_T+1)=...` should be `Dv(id_cn+1,id_T+1)=...`; the patch did not resolve the rank deficiency
  - final alternate attempt with `reduced_big_Phi_model/script.m` failed at line 42 with `MATLAB:nearlySingularMatrix`, `RCOND = 4.995168e-23`
- Basic case status: no clean full-script baseline was found. All four official variant scripts fail at the first Newton linear solve when singular-matrix warnings are treated as fatal.

## Notes
- The same plotting compatibility issue was previously observed from `ficks_model/script.m`.
- MATLAB is the better runtime for this repository, but the Newton loops need iteration guards, conditioning diagnostics, or damping before a clean reproduction is defensible.
- The failure may involve inconsistent initial guesses or boundary constraints, but the repeated first-solve singularity across all variants also points to equation/matrix assembly issues. This is not an ordinary MATLAB dependency problem.
