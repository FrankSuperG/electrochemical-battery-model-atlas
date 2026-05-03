# Local Reproduction Patches

These patches were made in ignored `.upstream/` working copies or under `REPRODUCTIONS/shims/` to probe reproducibility. They are not atlas source changes and should be proposed upstream separately if they are intended as permanent fixes.

## `.upstream/` source patches

### `BattMoTeam__BattMo`

- File: `.upstream/BattMoTeam__BattMo/startupBattMo.m`
- Change: skipped Octave-only `instrument-control` installation for local reproduction.
- Reason: allowed BattMo startup to proceed locally; MATLAB R2021b P2D example runs with submodules initialized.

### `decaluwe__p2d_li_ion_battery`

- Files:
  - `.upstream/decaluwe__p2d_li_ion_battery/li_ion_battery_p2d_model.py`
  - `.upstream/decaluwe__p2d_li_ion_battery/li_ion_battery_p2d_functions.py`
- Changes:
  - Constructed `Extended_Problem(...)` instead of calling `Extended_Problem.Battery_Func(...)` directly.
  - Fixed `SV_dot_eq[-1 :]` to `SV_dot_eq[-1, :]`.
  - Added local default tolerances for missing `atol1`/`rtol1` style variables.
  - Reused `Extended_Problem.Battery_Func` for missing `Charge`, `Re_equilibrate`, and `Discharge` residuals.
  - Disabled the broken event interface with no-op event callbacks.
  - Restored explicit current assignment after equilibration.
  - Corrected residual node offsets from `sep.offsets` to `an.offsets` in the anode residual block.
  - Set `Battery_equil.algvar = algvar` for the final equilibration attempt.
- Current result: progresses into IDA integration, then fails with convergence errors at `t=0`.

### `hanrach__p2d_solver`

- Files: multiple Python modules under `.upstream/hanrach__p2d_solver/`
- Changes:
  - Updated legacy `from jax.config import config` imports to `from jax import config`.
  - Added local `jax.ops.index_update` compatibility shims in `run_ex.py` and `run_main.py`.
  - Removed the unused `p2d_main_fn` import from `run_ex.py` to avoid removed `jax.experimental.host_callback`.
  - Parameterized `run_ex.py` and `run_main.py` grid sizes with `HANRACH_*` environment variables.
- Current result: original-grid `run_ex.py` converges; `run_main.py` succeeds on a reduced grid but the original grid is killed after Jacobian compilation.

### `dkong8s93__p2d-model`

- File: `.upstream/dkong8s93__p2d-model/reduced_temperature_model/assemble_vDv.m`
- Change: corrected `Dv(id_cn+1:id_T+1)=...` to `Dv(id_cn+1,id_T+1)=...`.
- Reason: the original used MATLAB linear indexing and overwrote an unrelated contiguous slice of the Jacobian.
- Current result: the initial Jacobian remains rank deficient, so this typo is real but not the only blocker.

### `matthewpklein__battsimpy`

- Files:
  - `.upstream/matthewpklein__battsimpy/config_files/model_lfp_fvmP2D.conf`
  - `.upstream/matthewpklein__battsimpy/config_files/sim_CC.conf`
- Changes:
  - Replaced the author's absolute data/output paths with container-local `/work/...` paths.
  - Disabled plotting with `PLOT_VOLT_ON=0`.
- Result: Docker Python 2.7 + `assimulo=2.9` + `libx11-6` runs the official LFP CC discharge example to completion.

### `liuyang12__Pseudo_sim`

- File: `.upstream/liuyang12__Pseudo_sim/T1master.m`
- Change: replaced unsafe `fprintf(s)` calls with `fprintf('%s', s)`.
- Reason: Octave treats `%` in progress strings as a format specifier.

### `weilongai__JuBat`

- File: `.upstream/weilongai__JuBat/src/SetParams.jl`
- Change: replaced cwd-dependent `include("../src/parameters/...")` with `param_dim = include(joinpath(@__DIR__, "parameters", "..."))`.
- Result: `example/minimal_example.jl` runs to completion.

## Shim files

### `REPRODUCTIONS/shims/pseudo-sim-liuyang12/`

- `dctmtx.m`, `dct.m`, `idct.m`: minimal DCT compatibility for Octave.
- `conAssign.m`, `tomRun.m`, `WarmDefSOL.m`: minimal TOMLAB compatibility layer backed by MATLAB `fmincon`.
- Result: MATLAB R2021b runs `T1master` to completion with `PSEUDO_SIM_FMINCON_SHIM_OK`.

### `REPRODUCTIONS/shims/spectral-li-ion-spm/`

- `chebdif.m`: minimal Chebyshev differentiation matrix implementation for the tested SPM example.
- Result: MATLAB R2021b runs the constant-current discharge example to completion.
