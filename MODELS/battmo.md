# BattMo

BattMo is a battery-modelling family counted as **one project** in this Atlas.
MATLAB and Julia provide distinct solver implementations; PyBattMo exposes the
Julia implementation to Python. Shared identity does not imply identical feature
coverage, numerical results or runtime requirements.

## Project family

| Component | Repository | Backend | License | Local evidence |
| --- | --- | --- | --- | --- |
| BattMo (MATLAB) | [BattMoTeam/BattMo](https://github.com/BattMoTeam/BattMo) | MATLAB / MRST | GPL-3.0 | [P2D example passed](../REPRODUCTIONS/battmo.md) |
| BattMo.jl | [BattMoTeam/BattMo.jl](https://github.com/BattMoTeam/BattMo.jl) | Julia / Jutul | MIT | [Default P2D discharge passed](../REPRODUCTIONS/battmo-jl.md) |
| PyBattMo | [BattMoTeam/PyBattMo](https://github.com/BattMoTeam/PyBattMo) | Python / JuliaCall / BattMo.jl | MIT | [P2D path tested; constructor API issue](../REPRODUCTIONS/pybattmo.md) |

BattMoApp is a web interface in the same family, not another solver project.
Its browser workflow has not been tested in this Atlas.

## Model lineage
The battery models belong to the continuum DFN/P2D/PXD family. MATLAB uses finite
volumes through MRST; Julia uses Jutul finite-volume infrastructure and automatic
differentiation. PyBattMo is not an independent Python PDE solver. PyBaMM
comparison/loading utilities in MATLAB do not make BattMo a PyBaMM wrapper.

MATLAB is the original implementation. The upstream family description presents
Julia as evolving toward its feature set; thermal, degradation, geometry and
calibration support must be checked per implementation and configuration.
The tested Julia/Python baseline is isothermal P2D without current collectors.
See [Julia-specific details](battmo-jl.md) and [numerical methods](../NUMERICS.md).

## Choosing an interface

- MATLAB: existing MATLAB/MRST workflows and features available in that implementation.
- Julia: direct access to the Jutul-based solver and model/simulation API.
- Python: Python-driven setup and NumPy/pandas analysis, with a compatible Julia runtime still required.

## Quickstart

### MATLAB / MRST

Install Git LFS and obtain the upstream submodules:

```sh
git clone --recurse-submodules https://github.com/BattMoTeam/BattMo.git
```

From the checkout in MATLAB:

```matlab
startupBattMo
runBatteryP2D
```

The Atlas used MATLAB R2021b. Octave is not a verified substitute; see the
[MATLAB record](../REPRODUCTIONS/battmo.md). Other entry points are in `examples/`.

### Julia / Jutul

Use the [pinned Julia environment](../REPRODUCTIONS/environments/battmo-jl/README.md).
The upstream default workflow is:

```julia
using BattMo
parameters = load_cell_parameters(; from_default_set = "chen_2020")
protocol = load_cycling_protocol(; from_default_set = "cc_discharge")
simulation = Simulation(LithiumIonBattery(), parameters, protocol)
output = solve(simulation)
voltage = output.time_series["Voltage"]
```

### Python / JuliaCall

The Python distribution is named `battmo`, not `pybattmo`. The equivalent public
interface is:

```python
import battmo
parameters = battmo.load_cell_parameters(from_default_set="chen_2020")
protocol = battmo.load_cycling_protocol(from_default_set="cc_discharge")
simulation = battmo.Simulation(battmo.LithiumIonBattery(), parameters, protocol)
output = battmo.solve(simulation)
frame = battmo.to_pandas(output.time_series)
```

Installing the Python package alone does not establish Julia backend compatibility.
Python and Julia must use compatible CPU architectures; bridge versions and the
Julia project must be recorded independently of the MATLAB environment.
Use the [separate Python environment recipe](../REPRODUCTIONS/environments/pybattmo/README.md).
The tested upstream `FullSimulationInput()` wrapper returns the wrong type; use
the loader or the documented direct-Julia workaround rather than this constructor.

## Reproducibility

MATLAB and Julia have separate successful P2D records linked above, within one
BattMo project. Python results must be established through Python calls and
result conversion, not inferred from a Julia-only run. No MATLAB/Julia numerical
equivalence, complete feature parity or full-paper reproduction is claimed.

The [independent PyBattMo audit](../REPRODUCTIONS/pybattmo.md) records Python-driven
P2D output and a confirmed constructor-dispatch regression. Its overall API
status is partial, not an unqualified pass for all Python methods.

## Known limitations
- First-use Julia compilation is setup overhead, not steady-state solver runtime.
- License obligations differ between MATLAB and the MIT-licensed Julia/Python components.
- Plotting, 3D, thermal, degradation, calibration and web workflows need separate tests.
- Parameter sets and controllers are configuration-specific; preserve source commits and inputs when comparing results.

## References
- [MATLAB repository and documentation entry](https://github.com/BattMoTeam/BattMo).
- [Julia documentation](https://battmoteam.github.io/BattMo.jl/dev/).
- [Python interface and family overview](https://github.com/BattMoTeam/PyBattMo).
- Chen et al. (2020), [DOI 10.1149/1945-7111/ab9050](https://doi.org/10.1149/1945-7111/ab9050): parameter source for the tested default Julia/Python example, not a paper describing those implementations.
