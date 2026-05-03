# p2d-li-ion-battery-decaluwe

- Status: `unreproduced`
- Date: 2026-05-02
- Upstream repo: <https://github.com/decaluwe/p2d_li_ion_battery>
- Upstream commit: `7ea1a2332eb885bea65e47e82ea231f80d28ca18`
- Upstream checkout: `<atlas-root>/.upstream/decaluwe__p2d_li_ion_battery`

## Environment
- OS: Docker on macOS
- Runtime: Python 3.8 on `linux/amd64`
- Environment manager: `micromamba`

## Install
```bash
micromamba create -y -n repro -c conda-forge python=3.8 'numpy<1.24' scipy pandas matplotlib cantera=2.6 assimulo
```

## Run
```bash
docker run --rm --platform linux/amd64 \
  -v '<atlas-root>':/workspace \
  -w /workspace/.upstream/decaluwe__p2d_li_ion_battery \
  mambaorg/micromamba:1.5.10 \
  bash -lc "micromamba create -y -n repro -c conda-forge python=3.8 'numpy<1.24' scipy pandas matplotlib cantera=2.6 assimulo && micromamba run -n repro python li_ion_battery_p2d_model.py"
```

## Outcome
- Result: unreproduced
- Actual output:
  - `cantera 2.6.0` imports successfully
  - `assimulo` imports successfully
  - the script reaches `Equilibrating...`
  - after constructor and indexing fixes, `IDA(Battery_equil)` starts initialization
  - disabling the broken event interface and defining missing tolerances/stage residuals lets IDA begin integration
  - current blocker is now `IDAError: Convergence test failures occurred too many times during one internal time step or minimum step size was reached. At time 0.000000.`
  - an additional source fix corrected the residual's anode node indexing from `sep.offsets` to `an.offsets`
  - an anode-only IDA smoke attempt still fails at `t=0` convergence after that indexing fix
  - final attempt set `Battery_equil.algvar = algvar`; the full script still fails with the same IDA convergence error at `t=0`

## Notes
- `cantera=3.0.1` from conda-forge produced a Python/shared-library commit mismatch in this container.
- `assimulo` with modern NumPy fails on deprecated `np.float`; pinning `numpy<1.24` is required.
- The upstream script appears incomplete: it calls `Extended_Problem.Battery_Func(...)` where Assimulo expects an `Extended_Problem(...)` instance, references undefined `atol1`/`rtol1` variables, references undefined `Charge`/`Re_equilibrate`/`Discharge` residuals, and contains a broken `state_events` method.
- `li_ion_battery_p2d_functions.py` also leaves most separator/cathode residual sections commented while `SV_0` still includes those variables, so the full-cell DAE is not closed in this snapshot.
