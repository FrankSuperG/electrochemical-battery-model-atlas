# fastdfn

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/scott-moura/fastDFN>
- Upstream commit: `140fdfc335cbae99efe8f5b609851fed672ec0e4`
- Upstream checkout: `<atlas-root>/.upstream/scott-moura__fastDFN`

## Environment
- OS: macOS
- Runtime: Octave 11.1.0

## Run
```bash
octave --no-gui --quiet --eval "cd('<atlas-root>/.upstream/scott-moura__fastDFN'); dfn_rg_new; disp('FASTDFN_OK');"
```

## Outcome
- Result: success
- Actual output: the model advanced through the full simulation, printed `Simulation Time : 2.17 min`, suggested `plot_dfn` and `animate_dfn`, and ended with `FASTDFN_OK`.
- Sample trace:
  - `Time : 0.00 sec | C-rate : -5.00 | Temp : 25.0degC | SOC : 0.503 | Voltage : 4.307V | Newton Iters : 40`
  - `Time : 119.00 sec | C-rate : -0.76 | Temp : 27.6degC | SOC : 0.555 | Voltage : 4.228V | Newton Iters : 5`

## Notes
- No source edits were needed.
- This is a stronger Octave result than the atlas entry currently suggests because the solver ran to completion, not just startup.
