# Reproduction Environments

These files capture environment recipes for selected Atlas reproductions and interface checks. Individual records state which commands passed and which remain limited or failing.
They are intentionally kept separate from the upstream source code:

- Clone or mount the upstream repository separately.
- Use these files to recreate the observed runtime stack.
- Treat these as smoke-test environments, not official upstream support files.

## Available Recipes

| Entry | Recipe | Notes |
| --- | --- | --- |
| `pybamm` | [`pybamm/environment.yml`](pybamm/environment.yml) | Python 3.11 + pinned PyBaMM runtime stack. |
| `spme-oed` | [`spme-oed/environment.yml`](spme-oed/environment.yml) | Reuses pinned PyBaMM stack plus OED-related Python packages. |
| `mpet` | [`mpet/Dockerfile`](mpet/Dockerfile) | Python 3.12 bookworm image with DAETools and GUI/native runtime libraries. |
| `battsimpy` | [`battsimpy/Dockerfile`](battsimpy/Dockerfile) | Legacy Python 2.7 + Assimulo route. |
| `petlion-jl` | [`petlion-jl/Project.toml`](petlion-jl/Project.toml) | Julia project pinned to `PETLION==1.0.6` for the reproduced smoke run. |
| BattMo Julia | [`battmo-jl/README.md`](battmo-jl/README.md) | Julia Project/Manifest and controller-checked default P2D discharge. |
| BattMo Python interface | [`pybattmo/README.md`](pybattmo/README.md) | Separate Python-Julia bridge and API regression tests; not an additional project. |
| `cidemod` | [`cidemod/README.md`](cidemod/README.md) | FEniCSx 0.7.0 and compatible multiphenicsx; Chen P2D reference comparison. |
| `difflib` | [`difflib/README.md`](difflib/README.md) | Pinned JAX-FEM/PETSc/Basix; full forward run and short gradient comparison. |
| hanrach legacy probe | [`hanrach-retest/README.md`](hanrach-retest/README.md) | Reduced-grid diagnostic only; full model remains unreproduced. |
| `slide` | [`slide/environment.yml`](slide/environment.yml) | CMake/Ninja build tooling; uses system C++ compiler. |
| Octave examples | [`octave/Dockerfile`](octave/Dockerfile) | Base Octave runtime for Scott Moura MATLAB/Octave examples. |

## SLIDE Evidence Policy

`slide` is now recorded as `independent-local`: this Atlas pass built the C++ project and ran the upstream CTest unit suite locally. MATLAB post-processing was not required for the smoke reproduction.
