# Reproduction Summary

Date: 2026-05-05

Scope: 19 Atlas entries. This summary is generated from `data/reproductions.yaml` and records reproduction attempts, including Docker, MATLAB, Octave, Julia, Python, and C++/CMake environments. Successful entries are marked `independent-local` when this Atlas pass built or ran them in an independent reproduction environment.

## Result

| Status       | Count | Entries                                                                                                                                                                                                          |
|--------------|-------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| success      | 16    | `cpg-spmt`, `pybamm`, `battmo`, `pseudo-sim-liuyang12`, `jubat`, `batp2dfoam`, `battsimpy`, `spectral-li-ion-spm`, `spme-oed`, `slide`, `lionsimba`, `mpet`, `petlion-jl`, `dfn-scott-moura`, `fastdfn`, `spmet` |
| partial      | 0     | none                                                                                                                                                                                                             |
| blocked      | 0     | none                                                                                                                                                                                                             |
| unreproduced | 3     | `p2d-li-ion-battery-decaluwe`, `p2d-solver-hanrach`, `p2d-model-dkong8s93`                                                                                                                                       |

## Recommended Starting Points

| Need                                      | Recommended entry                     | Why                                                                                                   |
|-------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------|
| Robust baseline for SPM/SPMe/DFN studies  | `pybamm`                              | Modern dependency stack, active ecosystem, strong documentation, successful command-level run.        |
| MATLAB DFN framework                      | `battmo`                              | Runs in MATLAB R2021b after submodules are available; more suitable than older MATLAB-only snapshots. |
| Lightweight DFN/SPMe educational examples | `dfn-scott-moura`, `fastdfn`, `spmet` | Reproduced in Octave 11.1.0 with small or no setup overhead.                                          |
| Julia-based DFN/P2D work                  | `petlion-jl`, `jubat`                 | `petlion-jl` is cleaner; `jubat` required an include-path patch.                                      |
| Python legacy model comparison            | `battsimpy`                           | Reproduced in a legacy Python 2.7 Docker environment.                                                 |
| Advanced research P2D framework           | `mpet`                                | Reproduced in Docker with Python 3.12 after installing runtime system libraries.                      |
| Fast degradation simulator                | `slide`                               | Independently built and tested in this pass; CTest passed 8/8 unit tests.                             |

## Incomplete Entries

| Slug                          | Status       | Final blocker                                                                                                              | Likely next step                                                                                                                   |
|-------------------------------|--------------|----------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `p2d-li-ion-battery-decaluwe` | unreproduced | no runnable full or anode-only basic case found; separator/cathode residual coverage is missing and IDA fails at `t=0`     | Complete the residual equations and audit differential/algebraic classification before tuning initial conditions.                  |
| `p2d-solver-hanrach`          | unreproduced | basic cases run with compatibility shims, but original-grid README `run_main.py` exits 137 after slow JAX compile/Jacobian | Preserve the reduced-grid smoke test, then refactor or chunk JAX compilation/memory use before full-size reproduction.             |
| `p2d-model-dkong8s93`         | unreproduced | all four official `script.m` variants fail at the first Newton linear solve with near-singular matrices                    | Check initial guesses, boundary equations, and Jacobian/matrix assembly; add Newton iteration guards and conditioning diagnostics. |

## Evidence Files

- [`COVERAGE.md`](COVERAGE.md): per-entry status matrix.
- [`DEPENDENCIES.md`](DEPENDENCIES.md): software and dependency versions used during reproduction.
- [`PITFALLS.md`](PITFALLS.md): cross-project reproduction pitfalls.
- [`CODE_ISSUES.md`](CODE_ISSUES.md): likely upstream code issues versus environment-only blockers.
- [`LOCAL_PATCHES.md`](LOCAL_PATCHES.md): reproduction patches and shims used during reproduction.
