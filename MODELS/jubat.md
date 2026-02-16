# JuBat

- Repo: <https://github.com/weilongai/JuBat>
- License: GPL-3.0
- Language/Framework: Julia

## Model lineage
- Family: based on the description/topics, it appears to cover SPM / P2D / SPMe (verify against the implementation)

## Extensions (if any)
- Thermal/degradation not verified in this Zoo

## Reproducibility
- Not reproduced in this Zoo (summary below is based on upstream repository structure).

### Quickstart
- Install Julia
- Run an example: `julia example/minimal_example.jl`

### Entry point(s)
- `example/minimal_example.jl` — minimal runnable example
- `src/JuBat.jl` — package entry

### Environment lock
- No Julia `Project.toml`/`Manifest.toml` detected at repo root.

## Strengths
- Julia ecosystem can be a good fit for performance-oriented numerical computing
- Potentially interesting if the code emphasizes composable submodels + speed

## Known limitations
- GPL license may be restrictive for some commercial use cases
- Smaller ecosystem than Python; users need some Julia familiarity

## Who is it for?
- Julia users, or users who need a performance-oriented modelling stack

## References
- Ai, Weilong, Liu, Yuxi. “JuBat: A Julia-based framework for battery modelling using finite element method.” SoftwareX vol. 27 pp. 101760 2024. DOI: 10.1016/j.softx.2024.101760
- Ai, Weilong, Liu, Yuxi. “Improving the convergence rate of Newman's battery model using 2nd order finite element method.” Journal of Energy Storage vol. 67 pp. 107512 2023. DOI: 10.1016/j.est.2023.107512
- Ai, Weilong, Liu, Yuxi. “sP2D: Simplified pseudo 2D battery model by piecewise sinusoidal/quadratic functions of potential curves.” Journal of Energy Storage vol. 86 pp. 111386 2024. DOI: 10.1016/j.est.2024.111386

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: Readable Julia framework with published references and clear scope; extensibility is reasonable, though user base/tooling is smaller than Python ecosystems.
