# Reproduction Environments

These files capture runnable environment recipes for selected successful Atlas reproductions.
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
| `slide` | [`slide/environment.yml`](slide/environment.yml) | CMake/Ninja build tooling; uses system C++ compiler. |
| Octave examples | [`octave/Dockerfile`](octave/Dockerfile) | Base Octave runtime for Scott Moura MATLAB/Octave examples. |

## SLIDE Evidence Policy

`slide` is now recorded as `independent-local`: this Atlas pass built the C++ project and ran the upstream CTest unit suite locally. MATLAB post-processing was not required for the smoke reproduction.
