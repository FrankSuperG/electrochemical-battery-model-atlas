# PyBaMM

- Repo: <https://github.com/pybamm-team/PyBaMM>
- License: BSD-3-Clause (LICENSE.txt in the repository)
- Language/Framework: Python
- Implementation base: primary framework entry

## Model lineage
- Family: DFN/P2D, SPM, SPMe (and many variants)
- Discretization: default lithium-ion models use finite volume for macroscale and particle domains; PyBaMM also exposes spectral volume, finite element, and 0D spatial methods.
- Typical features: modular submodels (kinetics, transport, thermal, degradation, etc.) and swappable discretizations

## Extensions (if any)
- Thermal: supported (multiple thermal models/coupling options)
- Degradation: supported (e.g., SEI, lithium plating, depending on version)

## Numerics
- Default lithium-ion spatial discretization: finite volume for macroscale and particle domains.
- Verified PyBaMM 26.4.1 spatial methods: `FiniteVolume`, `FiniteVolume2D`, `SpectralVolume`, `ScikitFiniteElement`, `ScikitFiniteElement3D`, and `ZeroDimensionalSpatialMethod`.
- Verified PyBaMM 26.4.1 solver classes: `IDAKLUSolver`, `CasadiSolver`, `ScipySolver`, `JaxSolver`, `AlgebraicSolver`, `CasadiAlgebraicSolver`, `CompositeSolver`, and `DummySolver`.
- Official docs do not expose a public `pybamm.FiniteDifference` spatial method. PyBaMM's `FiniteVolume` uses finite-difference-like matrix stencils for gradient/divergence, so in this Atlas it is recorded as finite volume / control-volume finite-difference, not standalone FDM.
- See [`../NUMERICS.md`](../NUMERICS.md) for the full method matrix and PyBaMM solver notes.

## Reproducibility
- Reproduced in this Atlas on 2026-05-01 using `pybamm==26.4.1` in a clean Python 3.11 environment.
- Minimal reproduced run: `model = pybamm.lithium_ion.DFN(); sim = pybamm.Simulation(model); sol = sim.solve([0, 600])`
- Observed output: `56` solution points, terminal voltage from `3.7717 V` to `3.6934 V` over `600 s`.

### Quickstart
- Install: `pip install pybamm` (or `conda install -c conda-forge pybamm`)
- Minimal run (DFN as example):
- ```python
import pybamm
model = pybamm.lithium_ion.DFN()
sim = pybamm.Simulation(model)
sim.solve([0, 3600])
sim.plot()
```
- For learning, start with the upstream “Getting Started” notebooks and `examples/` scripts.

### Entry point(s)
- `src/pybamm/` — library source (import as `pybamm`)
- `examples/scripts/` — runnable scripts (e.g., `examples/scripts/DFN.py`)
- `docs/source/examples/notebooks/` — tutorial notebooks
### Beginner notes
- The fastest mental model: **Model** (equations) → **ParameterValues** (numbers) → **Geometry/Mesh** → **Discretisation/Solver** → **Simulation**.
- For DFN/SPMe equations, start with `src/pybamm/models/full_battery_models/lithium_ion/` (and compare to SPM/SPMe folders).
- When results look “wrong”, check (1) parameter set, (2) experiment/current definition, (3) solver tolerances, (4) units conversions.
- If you only need to run cases (not modify equations), learn `pybamm.Experiment` and `ParameterValues` first—those give the biggest leverage.

## Strengths
- One of the most widely used open-source physics-based battery modelling frameworks
- Broad coverage of model families (from SPM to DFN and multiphysics coupling)
- Ecosystem: parameter sets, tutorials, and many papers/case studies

## Known limitations
- Learning curve: many concepts (submodels/parameters/geometry/discretization)
- Flexibility sometimes comes at the cost of simplicity for “minimal” use cases

## Who is it for?
- Users who want a flexible research-grade framework for P2D-family modelling and extensions

## References
- Sulzer, Valentin, Marquis, Scott G., Timms, Robert, Robinson, Martin, Chapman, S. Jon. “Python Battery Mathematical Modelling (PyBaMM).” Journal of Open Research Software vol. 9(1) pp. 14 2021. DOI: 10.5334/jors.309
- Doyle, Marc, Fuller, Thomas F., Newman, John. “Modeling of galvanostatic charge and discharge of the lithium/polymer/insertion cell.” Journal of The Electrochemical Society vol. 140(6) pp. 1526--1533 1993. DOI: 10.1149/1.2221597
- Fuller, Thomas F., Doyle, Marc, Newman, John. “Simulation and optimization of the dual lithium ion insertion cell.” Journal of The Electrochemical Society vol. 141(1) pp. 1--10 1994. DOI: 10.1149/1.2054684

## Optional grades
- Reproducibility: A
- Clarity: A
- Extensibility: A

Rationale: Widely used framework with strong CI/test coverage, and the minimal DFN solve was independently reproduced in this Atlas.
