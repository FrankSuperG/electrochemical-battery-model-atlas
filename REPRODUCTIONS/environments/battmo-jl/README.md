# BattMo.jl tested environment

Tested on native macOS ARM64, Julia 1.12.6, BattMo 0.2.9 at
`95054b15e88a4b9bfdab92b729c71a7ccf2e5bda`, Jutul 0.4.31. No GLMakie required.

From the Atlas root:

```sh
julia --project=REPRODUCTIONS/environments/battmo-jl -e 'using Pkg; Pkg.instantiate()'
OPENBLAS_NUM_THREADS=1 julia --project=REPRODUCTIONS/environments/battmo-jl REPRODUCTIONS/environments/battmo-jl/smoke.jl
```

The script follows the official Chen 2020 / `cc_discharge` example (0.5C).
It checks finite voltage/current/time, increasing time, decreasing voltage,
proximity to cutoff, and the final Jutul `stopnow` controller flag.
Jutul retains the cutoff report but does not store the final cutoff state:
the reported 7048.4375 s / 2.417083 V is the last stored state, not the exact
cutoff-crossing time or voltage. Full feature parity with MATLAB is not tested.

Initial precompilation took about 315 s. This is environment setup, not solver
runtime. The solver's own timing table reported about 3.3-3.5 s in these runs;
do not compare this with other models' total installation/test times.
