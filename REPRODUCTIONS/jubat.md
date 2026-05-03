# jubat

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/weilongai/JuBat>
- Upstream commit: `ab8530b9c0d9001c44df56bba7f77fa37b56d8cb`
- Local checkout: `<atlas-root>/.upstream/weilongai__JuBat`

## Environment
- OS: macOS
- Runtime: Julia 1.12.6

## Outcome
- Result: success with local source patch
- Local fix: changed `ChooseCell` to assign `param_dim = include(joinpath(@__DIR__, "parameters", "..."))`, which removes cwd-dependent paths and Julia world-age access to a newly included global.
- Command:
```bash
cd '<atlas-root>/.upstream/weilongai__JuBat/example'
julia minimal_example.jl
```
- Actual output: the run prints `start to solve the problem`, then `finish the simulation`, followed by the JuBat SoftwareX citation.

## Notes
- This is a real local reproduction of `minimal_example.jl`, but the upstream repo still needs the include-path patch for robust execution.
