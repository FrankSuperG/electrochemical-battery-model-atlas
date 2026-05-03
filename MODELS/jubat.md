# JuBat

- Repo: <https://github.com/weilongai/JuBat>
- License: GPL-3.0
- Language/Framework: Julia

## Model lineage
- Family: based on the description/topics, it appears to cover SPM / P2D / SPMe (verify against the implementation)
- Discretization: second-order finite element method.

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Reproduced in this Atlas using local Julia 1.12.6.
- Required a local `ChooseCell` include-path/world-age patch during the reproduction pass.

### Quickstart
- Install Julia
- Run an example: `julia example/minimal_example.jl`

### Entry point(s)
- `example/minimal_example.jl` — minimal runnable example
- `src/JuBat.jl` — package entry

### Environment lock
- No Julia `Project.toml`/`Manifest.toml` detected at repo root.

### Beginner notes
- Validate `example/minimal_example.jl` first, then trace which source files are included from `src/`.
- Julia include paths matter here; keep the working directory and relative paths explicit.

### Numerics note
- JuBat uses a second-order finite element method for the battery PDE system; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Julia ecosystem can be a good fit for performance-oriented numerical computing
- Potentially interesting if the code emphasizes composable submodels + speed

## Known limitations
- GPL license may be restrictive for some commercial use cases
- Smaller ecosystem than Python; users need some Julia familiarity

## Who is it for?
- Julia users, or users who need a performance-oriented modelling stack

## References
- Ai, Weilong, Liu, Yuan. “JuBat: A Julia-based framework for battery modelling using finite element method.” SoftwareX vol. 27 pp. 101760 2024. DOI: 10.1016/j.softx.2024.101760
- Ai, Weilong, Liu, Yuan. “Improving the convergence rate of Newman's battery model using 2nd order finite element method.” Journal of Energy Storage vol. 67 pp. 107512 2023. DOI: 10.1016/j.est.2023.107512
- Ai, Weilong, Liu, Yuan. “sP2D: Simplified pseudo 2D battery model by piecewise sinusoidal/quadratic functions of potential curves.” Journal of Energy Storage vol. 86 pp. 111386 2024. DOI: 10.1016/j.est.2024.111386

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: Readable Julia framework with published references and clear scope; extensibility is reasonable, though user base/tooling is smaller than Python ecosystems.
