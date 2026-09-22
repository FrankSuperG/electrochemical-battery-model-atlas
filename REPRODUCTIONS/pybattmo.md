# PyBattMo interface audit

- Status: `partial`
- Date: 2026-09-22
- Parent project: [BattMo](../MODELS/battmo.md); supplemental interface evidence, not another solver/project entry.
- Upstream repo: <https://github.com/BattMoTeam/PyBattMo>
- Upstream commit: `362a4b2ae1ed20cb05a35f9c86abe284b93c6f4d` (Python package `battmo` 0.2.3, MIT).
- Backend: BattMo.jl `95054b15e88a4b9bfdab92b729c71a7ccf2e5bda` / 0.2.9, Jutul 0.4.31.

## Scope and environment

Independent Python calls, not a rerun of a Julia-only script. Native macOS ARM64,
Python 3.12.14, Julia 1.12.6, JuliaCall/PythonCall 0.9.36, NumPy 2.5.3,
pandas 3.0.6 and pytest 9.1.1. The [recipe](environments/pybattmo/README.md)
includes Python requirements and a Julia Project/Manifest.

An explicit headless Julia project is used. The wrapper's automatic installer,
which names older backend and GLMakie dependencies, was not validated. Plotting,
3D, calibration and Python-defined constitutive laws inside a battery simulation
were not tested. A simple scalar callback is checked separately as bridge evidence.

## API outcomes

| Check | Result |
| --- | --- |
| Parameter and settings loaders | Passed |
| Python-driven 0.5C discharge and pandas conversion | Passed; agrees with the Julia-only baseline |
| Python-driven 1C discharge and pandas conversion | Passed |
| Actual BattMo PythonCall extension and simple scalar Python callback | Passed in a focused check |
| Direct Julia full-input constructor workaround | Passed |
| Public Python `FullSimulationInput()` return type | Failed; confirmed wrong dispatch |

The four loading/discharge/workaround checks passed in the full run; the
corrected bridge-module inspection then passed separately (`1 passed, 5 deselected
in 8.43s`). The public-constructor failure is unchanged. The initial bridge
assertion inspected PyBattMo's same-named bridge module instead of the actual
Julia package; the final test uses `parentmodule(LithiumIonBattery)` and invokes
a real Python callback. Thus five selected checks have passing evidence, while
the constructor regression remains failing; this is not a claim of a green full suite.

### Commands

With the environment variables in the [recipe](environments/pybattmo/README.md):

```sh
python -m pytest -q -s REPRODUCTIONS/environments/pybattmo/test_interface.py
python -m pytest -q -s REPRODUCTIONS/environments/pybattmo/test_interface.py -k bridge
```

The full run returns 1 on the upstream regression. The final focused bridge run
returns 0. No upstream fixes or test skips were applied.

## Discharge outputs

| Python-driven case | Stored samples | Last stored time (s) | First / last voltage (V) | Maximum current (A) |
| --- | --- | --- | --- | --- |
| Chen 2020, 0.5C | 145 | 7048.4375 | 4.1539600454 / 2.4170830349 | 2.5452109017 |
| Chen 2020, 1C | 73 | 3448.4375 | 4.1455697860 / 2.5258809112 | 5.0904218035 |

Both cases produced finite time/voltage/current arrays, strictly increasing time,
the expected current scaling and a normal controller stop. The 0.5C output agrees
with the separately tested Julia example within the script's tolerance. pandas
conversion produced `Time`, `Voltage`, `Current`, `CycleNumber`,
`CumulativeCapacity` and `NetCapacity` columns. Last stored values precede the
cutoff-triggering state; they are not exact cutoff measurements.

## Constructor regression

`battmo/api/input.py` implements `FullSimulationInput(*arg, **kwargs)` by calling
`jl.SimulationSettings`, not `jl.FullSimulationInput`. Passing the `.all` dictionary
from a loaded full input therefore returns the wrong Julia type. The regression
test asserts the expected type and fails on the unmodified upstream snapshot.
This is an API dispatch bug, not a DFN convergence failure.

The ordinary `load_cell_parameters` / `load_cycling_protocol` / `Simulation` /
`solve` path does not use that constructor. Use the full-input loader when
appropriate; direct Julia construction is a separately tested workaround, not
a claim that the public Python constructor has been fixed.

```python
full = battmo.load_full_simulation_input(from_default_set="chen_2020")
rebuilt = battmo.jl.FullSimulationInput(full.all)
```

## Environment and test caveats

- Initial system Python 3.9 / JuliaCall 0.9.28 PyBattMo imports were terminated
  with exit 137 and no diagnostic. A standalone JuliaCall import succeeded;
  the cause of termination was not established. The Python 3.12 path is recorded separately.
- The relocatable Python 3.12 distribution needed `JULIA_PYTHONCALL_LIB` set
  explicitly for Julia extension precompilation. The final bridge check loads
  the extension and calls through it successfully; this is not validation of
  Python-defined battery constitutive functions.
- A first 1C test incorrectly required the last retained voltage to lie within
  0.05 V of cutoff. Jutul omits the cutoff-triggering state, so this assumption
  was removed. The test instead requires finite increasing-time output, the
  expected current scaling and a final controller `stopnow=true` flag.
- No upstream source files were modified. The failing public-constructor test
  remains visible; it is not silently skipped or marked as passed.
