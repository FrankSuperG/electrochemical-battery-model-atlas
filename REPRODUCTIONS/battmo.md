# battmo

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/BattMoTeam/BattMo>
- Upstream commit: `4eb6435ac9ad4050b6e8cb6d06f729ae6b62b76e`
- Local checkout: `<atlas-root>/.upstream/BattMoTeam__BattMo`

## Environment
- OS: macOS
- Runtime: MATLAB R2021b

## Run
```bash
git -C <atlas-root>/.upstream/BattMoTeam__BattMo submodule update --init --recursive
matlab -batch "set(0,'DefaultFigureVisible','off'); cd('<atlas-root>/.upstream/BattMoTeam__BattMo'); startupBattMo; run('Examples/Basic/runBatteryP2D.m'); disp('BATTMO_P2D_OK')"
```

## Outcome
- Result: success
- Actual output: MRST initialized, the P2D example advanced through the simulation, printed `Simulation complete. Solved 138 control steps in 20 Seconds, 880 Milliseconds`, and ended with `BATTMO_P2D_OK`.

## Notes
- Submodules are required. `Externals/agmg`, `Externals/mrst`, and `Externals/upr` must be initialized before startup.
- Octave startup can be made to reach `BATTMO_STARTUP_OK`, but the basic P2D example is blocked by MATLAB-only class syntax `properties (SetAccess = immutable)`.
- MATLAB batch mode printed harmless font warnings on this machine.
