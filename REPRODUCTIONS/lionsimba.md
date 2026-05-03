# lionsimba

- Status: `unreproduced`
- Date: 2026-05-01
- Upstream repo: <https://github.com/lionsimbatoolbox/LIONSIMBA>
- Upstream commit: `4eb6435ac9ad4050b6e8cb6d06f729ae6b62b76e`
- Local checkout: `<atlas-root>/.upstream/lionsimbatoolbox__LIONSIMBA`

## Environment
- OS: macOS
- Runtime: MATLAB R2021b and Octave 11.1.0

## Run
```bash
octave --no-gui --quiet --eval "cd('<atlas-root>/.upstream/lionsimbatoolbox__LIONSIMBA'); addpath(genpath(pwd)); run('example_scripts/isothermal_simulations.m');"
matlab -batch "set(0,'DefaultFigureVisible','off'); cd('<atlas-root>/.upstream/lionsimbatoolbox__LIONSIMBA'); addpath(genpath(pwd)); run('example_scripts/isothermal_simulations.m'); disp('LIONSIMBA_ISOTHERMAL_OK')"
```

## Outcome
- Result: unreproduced
- Actual output:
  - final MATLAB check printed `LIONSIMBA_EXIST IDAInit=0 IDASolve=0 IDAFree=0 casadi=0`
  - `example_scripts/isothermal_simulations.m` fails in `checkEnvironment.m` with the missing SUNDIALS MATLAB interface error

## Notes
- MATLAB alone is not enough for this repository. The SUNDIALS MATLAB interface must be installed and visible on the MATLAB path before `startSimulation` can run.
