# dfn-scott-moura

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/scott-moura/dfn>
- Upstream commit: `702d7f38be4cd29b00d6791f7892de5e73952006`
- Upstream checkout: `<atlas-root>/.upstream/scott-moura__dfn`

## Environment
- OS: macOS
- Runtime: Octave 11.1.0

## Run
```bash
octave --no-gui --quiet --eval "cd('<atlas-root>/.upstream/scott-moura__dfn'); addpath(genpath(pwd)); dfn_federico; disp('DFN_FEDERICO_OK');"
```

## Outcome
- Result: success
- Actual output: the `dfn_federico` entry integrated through the complete drive-cycle-style simulation, printed `Simulation Time : 1.46 min`, and finished with `DFN_FEDERICO_OK`.
- Sample trace:
  - `Time : -2.00 sec | Current : 0.0000 A/m^2 | SOC : 0.584 | Voltage : 3.9000V`
  - `Time : 499.00 sec | Current : -24.9362 A/m^2 | SOC : 0.472 | Voltage : 3.8920V`

## Notes
- `dfn_rg.m` does not run unchanged in Octave because it calls a missing `c_e_mats` entry point; `dfn_federico.m` is the working top-level script in this repository snapshot.
- Octave emitted filename/function-name mismatch warnings for `cn_dfn_federico.m` and `dae_dfn_federico.m`, but the simulation still completed.
