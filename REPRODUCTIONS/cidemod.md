# cidemod

- Status: `success`
- Date: 2026-09-22
- Upstream repo: <https://github.com/cidetec-energy-storage/cideMOD>
- Upstream commit: `f3a834403d9b110c2c75ba69f0f42b8f6e6b8aaf`

## Scope
The upstream Chen 2020 dimensional P2D 1C test passed, including comparison with experimental and simulated voltage references. A second instrumented run added finite-output, increasing-time and voltage-range assertions. Thermal, degradation and higher-dimensional cases were not tested.

## Environment and commands

Linux ARM64 Docker; Python 3.10.12; dolfinx 0.7.0; PETSc 3.20.0; NumPy 1.23.2; SciPy 1.11.3. The original multiphenicsx branch was deleted; fixed dependency commit `341d6017993c6c7748693aeb700282fd955541c0` worked. [Recipe and inventory](environments/cidemod/README.md).

From the upstream `tests` directory:

```sh
timeout 900 python3 -m pytest -q test_Chen_2020.py::TestP2D_Chen::test_dimensional
timeout 300 python3 -u atlas_smoke.py
```

Both exited 0. Pytest reported `1 passed in 82.35s`; this includes first-run setup/compilation and is not a solver performance benchmark.

## Numerical evidence

- 359 samples, ending at 3555.269752988306 s.
- Voltage: 4.038059445150811 V initially; 2.4994782862802083 V finally (2.5 V cutoff).
- Experimental voltage RMSE: approximately 0.0422 V; tolerance 0.05 V. End-time ratio error 0.00409; tolerance 0.02.
- Simulation-reference voltage RMSE: approximately 4.73e-6 V; tolerance 0.001 V. End-time ratio error 6.95e-8; tolerance 0.001.
- All trajectory values finite; time strictly increasing. These results reproduce the selected upstream test, not the complete paper.
