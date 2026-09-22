# battmo-jl

- Status: `success`
- Date: 2026-09-22
- Upstream repo: <https://github.com/BattMoTeam/BattMo.jl>
- Upstream commit: `95054b15e88a4b9bfdab92b729c71a7ccf2e5bda`

## Scope
The official default Chen 2020 P2D / `cc_discharge` example completed at 0.5C on native macOS ARM64. The cutoff controller's final `stopnow` flag was asserted. No thermal, degradation, geometry variants, parameter calibration or MATLAB/Julia equivalence was tested.

## Environment and command

Julia 1.12.6; BattMo 0.2.9 (commit above); Jutul 0.4.31; no graphics dependency. See the [environment recipe](environments/battmo-jl/README.md) and [assertion script](environments/battmo-jl/smoke.jl).

The actual local command was:

```sh
OPENBLAS_NUM_THREADS=1 julia --project=.envs/battmo-jl REPRODUCTIONS/environments/battmo-jl/smoke.jl
```

Exit 0 after the numerical and controller assertions. The local environment used `Pkg.develop` with an unmodified checkout; the portable recipe pins the same commit by URL.

## Numerical evidence

- 145 stored samples; all time, voltage and current values finite; time strictly increasing.
- Last stored time: 7048.4375 s.
- First/last stored voltage: 4.153960045385644 / 2.4170830348696746 V.
- Current range: 0.15026764262255132 to 2.545210901747287 A (includes the default startup ramp).
- Final report: `stopnow=true`. The default discharge controller stops at 2.4 V, but Jutul omits that final state from stored output; the last stored voltage is not the exact cutoff value.
- Solver-reported time approximately 3.3-3.5 s, excluding initial dependency precompilation (about 315 s). No cross-model performance comparison is implied.
