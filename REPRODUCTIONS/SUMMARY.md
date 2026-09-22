# Reproduction Summary

Date: 2026-09-22

Scope: 21 projects. This summary groups reproduction metadata by project identity. See `COVERAGE.md` and individual records for implementation-specific evidence.

All counts are project-based. A success means at least one documented core path was reproduced, not that every implementation or API passes. [PyBattMo interface evidence](pybattmo.md) belongs to BattMo and adds no project to the count.

## Result

| Core-path status | Project count | Projects                                                                                                                                                                                                                               |
|------------------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| success          | 18            | `batp2dfoam`, `battmo`, `battsimpy`, `cidemod`, `cpg-spmt`, `dfn-scott-moura`, `difflib`, `fastdfn`, `jubat`, `lionsimba`, `mpet`, `petlion-jl`, `pseudo-sim-liuyang12`, `pybamm`, `slide`, `spectral-li-ion-spm`, `spme-oed`, `spmet` |
| partial          | 0             | none                                                                                                                                                                                                                                   |
| blocked          | 0             | none                                                                                                                                                                                                                                   |
| unreproduced     | 3             | `p2d-li-ion-battery-decaluwe`, `p2d-model-dkong8s93`, `p2d-solver-hanrach`                                                                                                                                                             |
| not-tested       | 0             | none                                                                                                                                                                                                                                   |

## Recommended Starting Points

| Need                                      | Recommended entry                     | Why                                                                                                                                                   |
|-------------------------------------------|---------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| Robust baseline for SPM/SPMe/DFN studies  | `pybamm`                              | Modern dependency stack, active ecosystem, strong documentation, successful command-level run.                                                        |
| Multi-language DFN project                | `battmo`                              | BattMo groups MATLAB/MRST, Julia/Jutul and the Python interface; see its family page for per-language results and the known Python constructor issue. |
| Lightweight DFN/SPMe educational examples | `dfn-scott-moura`, `fastdfn`, `spmet` | Reproduced in Octave 11.1.0 with small or no setup overhead.                                                                                          |
| Julia-based DFN/P2D work                  | `petlion-jl`, `jubat`                 | `petlion-jl` is cleaner; `jubat` required an include-path patch.                                                                                      |
| Python legacy model comparison            | `battsimpy`                           | Reproduced in a legacy Python 2.7 Docker environment.                                                                                                 |
| Advanced research P2D framework           | `mpet`                                | Reproduced in Docker with Python 3.12 after installing runtime system libraries.                                                                      |
| Fast degradation simulator                | `slide`                               | Independently built and tested in this pass; CTest passed 8/8 unit tests.                                                                             |

## Incomplete or Untested Entries

| Slug                          | Status       | Final blocker                                                                                                          | Likely next step                                                                                                                   |
|-------------------------------|--------------|------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| `p2d-li-ion-battery-decaluwe` | unreproduced | no runnable full or anode-only basic case found; separator/cathode residual coverage is missing and IDA fails at `t=0` | Complete the residual equations and audit differential/algebraic classification before tuning initial conditions.                  |
| `p2d-model-dkong8s93`         | unreproduced | all four official `script.m` variants fail at the first Newton linear solve with near-singular matrices                | Check initial guesses, boundary equations, and Jacobian/matrix assembly; add Newton iteration guards and conditioning diagnostics. |
| `p2d-solver-hanrach`          | unreproduced | reduced grid passes residual assertion; original 50 grid receives SIGKILL before completing                            | Preserve the reduced-grid smoke test, then refactor or chunk JAX compilation/memory use before full-size reproduction.             |

## Evidence Files

- [`COVERAGE.md`](COVERAGE.md): per-entry status matrix.
- [`DEPENDENCIES.md`](DEPENDENCIES.md): software and dependency versions used during reproduction.
- [`PITFALLS.md`](PITFALLS.md): cross-project reproduction pitfalls.
- [`CODE_ISSUES.md`](CODE_ISSUES.md): likely upstream code issues versus environment-only blockers.
- [`LOCAL_PATCHES.md`](LOCAL_PATCHES.md): reproduction patches and shims used during reproduction.
