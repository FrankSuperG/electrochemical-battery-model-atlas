# Code Issue Audit

This file separates likely upstream code defects from ordinary environment or dependency blockers found during reproduction.

## Likely upstream code issues

### `p2d-li-ion-battery-decaluwe`

- The equilibration problem construction needed a local patch. The original script called the residual function directly instead of constructing an `Extended_Problem` instance, then attempted to assign solver attributes on the returned array. The local working copy now uses `Extended_Problem(Extended_Problem.Battery_Func, SV_0, SV_dot_0, t_0)`.
- A local indexing patch was also needed around the transition from equilibration to charging. The working copy now uses `SV_dot_eq[-1, :]`.
- After those fixes, solver initialization reaches `state_events` and fails on an object-model mismatch: `state_events` accesses `an.params[...]` and `cat.params[...]`, but the imported `anode` and `cathode` classes expose direct class attributes such as `npoints`, `nshells`, `ptr`, `X_Li_max`, and `X_Li_min`, not a `params` dictionary.
- Additional local fixes found undefined solver tolerances (`atol1`/`rtol1`) and undefined phase residual names (`Charge`, `Re_equilibrate`, `Discharge`). After bypassing these, IDA reaches integration but fails DAE convergence at `t=0`.
- The residual function used `sep.offsets` while stepping through anode nodes. This was patched locally to `an.offsets`.
- Much of the separator and cathode residual implementation is commented out, but `SV_0` still allocates separator/cathode state variables. This leaves the full-cell DAE under-specified.
- Fix direction: either add `params` dictionaries during initialization or change `state_events` to use the same direct class-attribute convention as the rest of the model; then repair the stage-function/tolerance setup, anode/separator/cathode residual coverage, and DAE-consistent initial conditions.

Evidence:

- `.upstream/decaluwe__p2d_li_ion_battery/li_ion_battery_p2d_model.py`
- `.upstream/decaluwe__p2d_li_ion_battery/li_ion_battery_p2d_functions.py`
- `.upstream/decaluwe__p2d_li_ion_battery/li_ion_battery_p2d_init.py`

### `p2d-solver-hanrach`

- The code relies heavily on removed JAX APIs such as `jax.ops.index_update` and `jax.ops.index[...]`. Modern JAX expects the `.at[index].set(value)` update style.
- The `run_ex.py` path also imports `p2d_main_fn`, which imports removed `jax.experimental.host_callback`, even though `run_ex.py` does not need that module for its standalone Newton smoke run.
- Many files use `from jax import config`. This may still work in some JAX versions, but together with `jax.ops` usage it strongly indicates the project needs an old pinned JAX environment.
- No dependency manifest was found (`requirements.txt`, `environment.yml`, `pyproject.toml`, or `setup.py`). That makes the intended JAX version unrecoverable from the repo itself.
- The final original-grid `run_main.py` attempt reached `computed jacobian` but exited with code 137, so the documented entry remains unreproduced locally.
- Fix direction: add a pinned environment file for the historically working JAX version, or port all `jax.ops.index_update` calls to modern JAX and retest memory use.

Evidence:

- `.upstream/hanrach__p2d_solver/residual.py`
- `.upstream/hanrach__p2d_solver/run_main.py`
- `.upstream/hanrach__p2d_solver/run_ex.py`

### `p2d-model-dkong8s93`

- MATLAB gets past plotting and enters the Newton loop, but repeatedly warns about a nearly singular matrix.
- There is a definite indexing typo in `reduced_temperature_model/assemble_vDv.m`: `Dv(id_cn+1:id_T+1)=...` uses MATLAB linear indexing and should be `Dv(id_cn+1,id_T+1)=...`.
- That typo was patched locally, but the initial Jacobian remains rank deficient: `lenU=2247`, `rankFull=2077`, `condest=4.46336e+20`.
- A final `reduced_big_Phi_model/script.m` attempt failed at the initial solve with `RCOND = 4.995168e-23`.
- The main solve loop has no maximum iteration guard, no damping or line search, and no fallback when `J=A+Dv` is singular or badly conditioned.
- In practice this can leave the script running indefinitely, especially with `tol=1e-8`, `Tf=720`, and 360 time steps.
- Fix direction: add `maxNewtonIters`, log residual norms, detect `rcond(J)` or failed linear solves, and either damp the update or abort with a clear diagnostic.

Evidence:

- `.upstream/dkong8s93__p2d-model/reduced_temperature_model/script.m`
- `.upstream/dkong8s93__p2d-model/reduced_temperature_model/assemble_vDv.m`

### `pseudo-sim-liuyang12`

- The MATLAB run reaches TOMLAB/KNITRO calls (`conAssign`, `tomRun('knitro', ...)`, `Prob.KNITRO...`) with no availability check or fallback path.
- Base MATLAB is therefore not enough even though MATLAB supplies `dct`, `idct`, and `dctmtx` on this machine.
- Octave additionally needed local DCT shims and a `fprintf('%s', s)` portability patch; the original `fprintf(s)` form is unsafe when `s` contains `%`.
- Fix direction: document TOMLAB/KNITRO as a hard requirement, add a startup check before the time loop, and guard or remove Octave-incompatible printing.

Evidence:

- `.upstream/liuyang12__Pseudo_sim/T1master.m`
- `REPRODUCTIONS/shims/pseudo-sim-liuyang12/`

### `jubat`

- `ChooseCell` includes parameter files through hard-coded relative paths such as `include("../src/parameters/LGM50.jl")`.
- Examples also use cwd-dependent paths such as `pwd() * "/src/data/"`.
- These paths only work from specific current working directories and are fragile when the code is run as a package, from the repository root, or from the `example/` directory.
- Local fix verified: assign `param_dim = include(joinpath(@__DIR__, "parameters", "..."))`. This both resolves files relative to source locations and avoids the Julia world-age/global-binding failure observed with the original include pattern.
- Fix direction: apply the same `@__DIR__`/`joinpath` policy throughout examples so they do not depend on the caller's cwd.

Evidence:

- `.upstream/weilongai__JuBat/src/SetParams.jl`
- `.upstream/weilongai__JuBat/example/`

## Mostly environment or external dependency blockers

### `battsimpy`

- The codebase targets Python 2 and depends on `assimulo`.
- The initial blocker in Docker was a missing native X11 library. Adding Debian `libx11-6` allowed `from assimulo.solvers.sundials import IDA` to import successfully.
- The example config files contain hard-coded author-local paths under `/Users/mk/...`; these must be changed to the current checkout or container path before running.
- With those environment and config fixes, the official LFP CC discharge example runs to completion. This is no longer a model-code blocker in the tested path.

### `lionsimba`

- MATLAB and Octave both fail at the explicit environment check for the SUNDIALS MATLAB interface.
- Final MATLAB check showed `IDAInit=0`, `IDASolve=0`, `IDAFree=0`, and `casadi=0`.
- This is a documented external dependency blocker, not currently evidence of broken model code.

### `mpet`

- The Python package metadata selects a binary `daetools` package on Linux.
- After allowing enough time for the SourceForge binary download and adding `PyQt5`, `test001` runs successfully under Docker Python 3.12.
- This is a dependency-friction issue rather than a model-code blocker in the tested path.

### `batp2dfoam`

- Docker OpenFOAM 10 provides `wmake` and `blockMesh`; the solver compiles.
- The supplied case logs a `setFields` dictionary issue (`keyword zone is undefined in dictionary "zoneToCell"`), then the solver remains in repeated PIMPLE iterations without completing or writing time directories in the final local attempt.
- This may be an OpenFOAM-version/case-dictionary compatibility issue or a solver convergence issue.

### `battmo`

- The MATLAB path works after submodule initialization.
- Octave remains blocked by MATLAB-only class-property syntax (`SetAccess = immutable`), which is a portability issue rather than a MATLAB reproduction bug.

## Local patch policy

Local edits under `.upstream/` were used only to probe blockers and should not be treated as atlas source changes. Any permanent fixes should be proposed upstream in the corresponding model repositories or captured as explicit reproduction patches.
