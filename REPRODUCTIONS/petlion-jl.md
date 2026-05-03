# petlion-jl

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/MarcBerliner/PETLION.jl>
- Upstream commit: `f7a8f76184a60ad1e9e5fd6f7829e55600bae710`
- Upstream checkout: `<atlas-root>/.upstream/MarcBerliner__PETLION.jl`

## Environment
- OS: macOS
- Runtime: Julia 1.12.6

## Run
```bash
julia --project=<atlas-root>/.upstream/MarcBerliner__PETLION.jl -e 'using Pkg; Pkg.instantiate(); using PETLION; p = petlion(LCO); sol = simulate(p, 10, I=1, SOC=0.5); println(length(sol.t)); println(sol.V[end])'
```

## Outcome
- Result: success
- Actual output: the model built successfully and solved a short run, returning `18` saved time points and final voltage `3.8707066085234048`.
