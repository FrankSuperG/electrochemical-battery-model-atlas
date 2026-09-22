# BattMo.jl

Part of the **BattMo project family** alongside [MATLAB/MRST BattMo](battmo.md). Versions are grouped in the project index; this page retains Julia-specific details and evidence.

PyBattMo exposes this backend to Python. Its [independent interface record](../REPRODUCTIONS/pybattmo.md) is supplemental evidence within the same project, not another solver entry. Use the [family overview](battmo.md) to choose between MATLAB, Julia and Python.

- Repo: <https://github.com/BattMoTeam/BattMo.jl>
- License: MIT
- Reviewed: 2026-09-22
- Source snapshot: [95054b15e88a](https://github.com/BattMoTeam/BattMo.jl/tree/95054b15e88a4b9bfdab92b729c71a7ccf2e5bda)

## Model lineage
Julia/Jutul implementation of the Doyle-Fuller-Newman (DFN) model with finite-volume discretization and automatic differentiation, supporting spatial cell geometries beyond 1D.

This is a separate implementation from the MATLAB/MRST BattMo entry. The upstream README calls it an early release with a subset of MATLAB features; feature parity must not be assumed.

## Quickstart
Use an isolated Julia project and install `BattMo` with `Pkg.add("BattMo")`. A registry install is not necessarily the reviewed commit. The pinned README uses `load_cell_parameters`, `load_cycling_protocol`, `LithiumIonBattery`, `Simulation`, and `solve`. Voltage and current are available in `output.time_series`; plotting uses optional GLMakie.

## Known limitations
The README default P2D setup excludes current collectors and thermal effects. Extensions are not classified here without a dedicated feature audit. Julia compilation and optional graphics dependencies should be budgeted separately.

## References
Upstream [documentation](https://battmoteam.github.io/BattMo.jl/dev/) and [software archive](https://doi.org/10.5281/zenodo.17313586). The README also cites Chen et al. (2020), DOI 10.1149/1945-7111/ab9050, for its example parameter set; this is not a paper describing the Julia solver.

## Reproducibility
The default Chen 2020 0.5C discharge passed locally with finite output and a verified cutoff-controller stop. See [record](../REPRODUCTIONS/battmo-jl.md) and [environment recipe](../REPRODUCTIONS/environments/battmo-jl/README.md). Other model variants and MATLAB/Julia equivalence were not tested.
