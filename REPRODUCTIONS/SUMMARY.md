# Reproduction Summary

Date: 2026-05-02

Scope: 19 Atlas entries. This summary is generated from `data/reproductions.yaml` and records local reproduction attempts, including Docker, MATLAB, Octave, Julia, Python, and C++/CMake environments. Successful entries are marked `independent-local` when this Atlas pass built or ran them locally.

## Result

| Status       | Count | Entries                                                                                                                                                                               |
|--------------|-------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| success      | 14    | `cpg-spmt`, `pybamm`, `battmo`, `pseudo-sim-liuyang12`, `jubat`, `battsimpy`, `spectral-li-ion-spm`, `spme-oed`, `slide`, `mpet`, `petlion-jl`, `dfn-scott-moura`, `fastdfn`, `spmet` |
| partial      | 0     | none                                                                                                                                                                                  |
| blocked      | 0     | none                                                                                                                                                                                  |
| unreproduced | 5     | `p2d-li-ion-battery-decaluwe`, `p2d-solver-hanrach`, `p2d-model-dkong8s93`, `batp2dfoam`, `lionsimba`                                                                                 |

## Recommended Starting Points

| Need                                      | Recommended entry                     | Why                                                                                                   |
|-------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------|
| Robust baseline for SPM/SPMe/DFN studies  | `pybamm`                              | Modern dependency stack, active ecosystem, strong documentation, successful local run.                |
| MATLAB DFN framework                      | `battmo`                              | Runs in MATLAB R2021b after submodules are available; more suitable than older MATLAB-only snapshots. |
| Lightweight DFN/SPMe educational examples | `dfn-scott-moura`, `fastdfn`, `spmet` | Reproduced in Octave 11.1.0 with small or no setup overhead.                                          |
| Julia-based DFN/P2D work                  | `petlion-jl`, `jubat`                 | `petlion-jl` is cleaner; `jubat` required a local include-path patch.                                 |
| Python legacy model comparison            | `battsimpy`                           | Reproduced in a legacy Python 2.7 Docker environment.                                                 |
| Advanced research P2D framework           | `mpet`                                | Reproduced in Docker with Python 3.12 after installing runtime system libraries.                      |
| Fast degradation simulator                | `slide`                               | Independently built and tested locally; CTest passed 8/8 unit tests.                                  |

## Unreproduced Entries

| Slug                          | Status       | Final blocker                                                                                                               | Likely next step                                                                                                   |
|-------------------------------|--------------|-----------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `p2d-li-ion-battery-decaluwe` | unreproduced | final attempt with `algvar` still fails IDA convergence at `t=0`; full-cell residual appears incomplete                     | Audit residual equations and algebraic/differential variable classification before trying more dependency changes. |
| `p2d-solver-hanrach`          | unreproduced | final original-grid README `run_main.py` attempt exits 137 after slow JAX compile/Jacobian                                  | Add a documented reduced-grid smoke test or refactor JAX compilation/memory usage before full-size reproduction.   |
| `p2d-model-dkong8s93`         | unreproduced | final alternate variant also fails at initial nearly singular matrix solve                                                  | Check initial conditions, boundary equations, and matrix assembly before treating it as an environment problem.    |
| `batp2dfoam`                  | unreproduced | compiles and starts the test case, but remains in repeated PIMPLE iterations without completing or writing time directories | Reduce or repair the test case first; verify `setFields` dictionaries and solver stopping criteria.                |
| `lionsimba`                   | unreproduced | final MATLAB check shows `IDAInit=0`, `IDASolve=0`, `IDAFree=0`, `casadi=0`                                                 | Provide pinned SUNDIALS/CasADi MATLAB install instructions or a container with those bindings prebuilt.            |

## Evidence Files

- [`COVERAGE.md`](COVERAGE.md): per-entry status matrix.
- [`DEPENDENCIES.md`](DEPENDENCIES.md): software and dependency versions used during reproduction.
- [`PITFALLS.md`](PITFALLS.md): cross-project reproduction pitfalls.
- [`CODE_ISSUES.md`](CODE_ISSUES.md): likely upstream code issues versus environment-only blockers.
- [`LOCAL_PATCHES.md`](LOCAL_PATCHES.md): local patches and shims used during reproduction.
