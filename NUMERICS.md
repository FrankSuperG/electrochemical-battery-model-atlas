# Numerical Methods

Date: 2026-05-02

This page summarizes the spatial discretization methods used to turn battery-model PDEs into ODE/DAE systems. The focus is PDE spatial discretization, not parameter estimation or post-processing.

Evidence level:

- `explicit`: stated directly in upstream README, code comments, or documented API.
- `code-inferred`: inferred from matrix assembly, mesh variables, or solver implementation.
- `framework-default`: inherited from a framework default, especially PyBaMM.

## Model Discretization Matrix

| Slug | Main PDE spatial discretization | Time / nonlinear solve context | Evidence |
| --- | --- | --- | --- |
| `cpg-spmt` | Parabolic approximation / polynomial profile for SPM solid diffusion | Low-order ODE state-space model integrated in Python | explicit |
| `pybamm` | Default lithium-ion models use finite volume for macroscale and particle domains; other spatial methods are available | Default model solver is `IDAKLUSolver`; users can choose other solver classes | explicit, framework-default |
| `battmo` | Finite volume method via MRST grids | MATLAB/MRST automatic differentiation and Newton-style nonlinear solves | explicit |
| `p2d-li-ion-battery-decaluwe` | Control-volume style shell balances for particles and through-thickness volumes | Assimulo/SUNDIALS IDA DAE solve | code-inferred |
| `p2d-solver-hanrach` | Finite difference method | Newton iterations with JAX automatic differentiation for Jacobians | explicit |
| `p2d-model-dkong8s93` | Finite difference method; variants include full Fickian particle diffusion and reduced/two-term approximations | MATLAB sparse matrix assembly and Newton iterations | explicit, code-inferred |
| `pseudo-sim-liuyang12` | Finite difference method with method-of-lines conversion | MATLAB `ode15s`/ODE functions and TOMLAB-style optimization compatibility shim | explicit |
| `jubat` | Second-order finite element method | Julia implementation with assembled mass/stiffness matrices | explicit |
| `batp2dfoam` | Finite volume method through OpenFOAM | OpenFOAM solver with PIMPLE-style coupled iteration | framework-default |
| `battsimpy` | Finite volume method following the LIONSIMBA formulation | Assimulo/SUNDIALS IDA DAE solve | explicit |
| `spectral-li-ion-spm` | Spectral method / Chebyshev collocation for SPM solid diffusion | MATLAB ODE workflow | explicit |
| `spme-oed` | PyBaMM default finite volume discretization for SPMe | PyBaMM `Simulation` with user-specified `var_pts` | framework-default |
| `slide` | Spectral method / Chebyshev collocation for solid diffusion matrices | C++ time simulation using MATLAB-generated discretization matrices | explicit |
| `lionsimba` | Finite volume method for through-thickness domains; solid diffusion can use parabolic approximation, higher-order polynomial approximation, 9th-order FDM, or spectral method | SUNDIALS IDA MATLAB interface; optional CasADi Jacobian path | explicit |
| `mpet` | Finite volume method over electrolyte/electrode volumes and particle discretization domains | DAE Tools / DAE integration | explicit, code-inferred |
| `petlion-jl` | Finite volume stencil for electrolyte grid; 9th-order FDM for volume-averaged solid particle concentration residuals | SUNDIALS IDA with KLU sparse linear solver | explicit |
| `dfn-scott-moura` | Finite difference method in through-thickness direction; Pade approximation for solid diffusion | Crank-Nicolson equations and DAE/Newton routines | explicit |
| `fastdfn` | Finite difference method in through-thickness direction; Pade approximation for solid diffusion | Crank-Nicolson / fast DFN DAE routines | explicit |
| `spmet` | Central finite difference method for solid and electrolyte PDEs with second-order boundary conditions | MATLAB/Octave ODE workflow | explicit |

## PyBaMM Numerical Methods

Verified against the reproduced `pybamm==26.4.1` environment, the checked upstream source snapshot in `.upstream/pybamm-team__PyBaMM`, and the official PyBaMM stable documentation checked on 2026-05-02.

PyBaMM separates two concepts that are easy to mix up:

- `spatial_methods`: spatial discretization of PDE operators, for example finite volume, spectral volume, finite element, or 0D lumping.
- `solver`: time integration / algebraic or DAE solving after the PDE model has been discretized.

The official PyBaMM API documentation does not list a public `pybamm.FiniteDifference` spatial method in the current stable API, and the reproduced `pybamm==26.4.1` environment also has no `FiniteDifference` attribute. PyBaMM's `FiniteVolume` implementation does use finite-difference-like matrix stencils internally for gradients and divergences, and the docs cite control-volume finite-difference literature, but the selectable public method should be described as finite volume rather than standalone FDM.

### PyBaMM Spatial Methods

| PyBaMM class | Method | Typical role |
| --- | --- | --- |
| `FiniteVolume` | 1D finite volume method | Default for lithium-ion macroscale and particle domains. |
| `FiniteVolume2D` | 2D finite volume method | Used by 2D DFN-style domains such as `basic_dfn_2d`. |
| `SpectralVolume` | Spectral volume method | 1D spectral-volume discretization compatible with `SpectralVolume1DSubMesh`. |
| `ScikitFiniteElement` | 2D finite element method via `scikit-fem` | Current collector / Poisson-type problems in the `y-z` plane. |
| `ScikitFiniteElement3D` | 3D finite element method via `scikit-fem` | 3D cell-domain discretization. |
| `ZeroDimensionalSpatialMethod` | 0D / lumped spatial method | Lumped domains and 0D current collector cases. |

For standard lithium-ion battery models, PyBaMM's default spatial-method map uses `FiniteVolume` for the macroscale domain, particle domains, and particle-size domains. The current collector default depends on dimensionality: 0D uses `ZeroDimensionalSpatialMethod`, 1D uses `FiniteVolume`, 2D uses `ScikitFiniteElement`, and 3D uses `ScikitFiniteElement3D` for the cell domain.

Official documentation references:

- Spatial methods API index: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/index.html>
- Discretisation accepts a per-domain `spatial_methods` dictionary: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/discretisation.html>
- `Simulation` accepts both `spatial_methods` and `solver`: <https://docs.pybamm.org/en/stable/source/api/simulation.html>
- Finite volume tutorial and default-method note: <https://docs.pybamm.org/en/stable/source/examples/notebooks/spatial_methods/finite-volumes.html>
- Finite volume API: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/finite_volume.html>
- Spectral volume API: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/spectral_volume.html>
- Scikit finite element API: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/scikit_finite_element.html>
- Scikit finite element 3D API: <https://docs.pybamm.org/en/stable/source/api/spatial_methods/scikit_finite_element_3d.html>

### PyBaMM Solver Classes

| PyBaMM class | Solver type | Notes |
| --- | --- | --- |
| `IDAKLUSolver` | SUNDIALS IDA DAE/ODE solver with KLU sparse linear solver by default | Default for most ODE/DAE models in PyBaMM 26.4.1. Supports solver options for linear solver, Jacobian form, BDF order, tolerances, threading, and output variables. |
| `CasadiSolver` | CasADi-based time integrator | Modes: `fast`, `fast with events`, `safe`, and `safe without grid`. Often used for robust event-aware battery simulations. |
| `ScipySolver` | `scipy.integrate.solve_ivp` wrapper | Default method is `BDF`; method can be passed through to SciPy, for example `BDF`, `Radau`, `RK45`, `RK23`, `DOP853`, or `LSODA` when compatible with the model. |
| `JaxSolver` | JAX-compiled solver | Optional JAX dependency required. Method options in PyBaMM 26.4.1 are `BDF` and `RK45`. |
| `AlgebraicSolver` | SciPy root-finding solver for algebraic-only models | Default method is `lm`; can use SciPy root/least-squares style methods. |
| `CasadiAlgebraicSolver` | CasADi rootfinder for algebraic-only models | Useful for time-independent algebraic systems and consistent initial-condition calculations. |
| `CompositeSolver` | Solver fallback wrapper | Tries a list of sub-solvers in order until one succeeds. |
| `DummySolver` | Empty-model solver | Used for models with no dynamic state to integrate. |

### PyBaMM Solver Helpers And Options

| Item | Role |
| --- | --- |
| `IDAKLUJax` | JAX wrapper around `IDAKLUSolver`; created through an `IDAKLUSolver` object rather than used as a normal top-level solver. |
| `jax_bdf_integrate` | Internal BDF integration helper used by the JAX solver path. |
| `IDAKLUSolver` linear solver option | Includes `SUNLinSol_KLU`, `SUNLinSol_Dense`, `SUNLinSol_Band`, `SUNLinSol_SPBCGS`, `SUNLinSol_SPFGMR`, `SUNLinSol_SPGMR`, and `SUNLinSol_SPTFQMR`. |
| `IDAKLUSolver` Jacobian option | Includes `none`, `dense`, `banded`, `sparse`, and `matrix-free`. |
| Default solver selection | Algebraic-only models default to `CasadiAlgebraicSolver`; ODE/DAE models default to `IDAKLUSolver`. |

## Practical Reading

- If the question is "which discretization is easiest to trust?", start with PyBaMM, BattMo, LIONSIMBA/battsimpy, or JuBat because their method choices are explicit and documented.
- If the question is "which is fastest for SPM solid diffusion?", spectral/Pade/parabolic approximations are generally faster than high-node FDM/FVM, but they are less general.
- If the question is "which is best for modifying PDE terms?", FVM/FDM/FEM implementations are usually easier to inspect than closed-form reduced approximations.
