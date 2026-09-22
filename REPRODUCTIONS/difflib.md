# difflib

- Status: `success`
- Date: 2026-09-22
- Upstream repo: <https://github.com/CMSL-HKUST/DiffLiB>
- Upstream commit: `1df25de5acd58da8f17839239cb5da3aa6c2706a`

## Scope
The upstream quickstart 1C forward-discharge configuration completed to 3620 s with finite macro/micro states. A separate 60 s forward run plus a 10 s automatic-differentiation/finite-difference check passed. This does not reproduce the paper's multi-rate comparisons, complete Taylor test or parameter-identification experiments.

## Environment and commands

Linux ARM64 Docker; Python 3.10.12; JAX/jaxlib 0.4.38; JAX-FEM 0.0.11 at `72846d64a5c2359390b071e2b8101b0adc05e330`; Basix 0.9.0; PETSc 3.20.0; NumPy 1.26.4; SciPy 1.11.3. PyBaMM 26.4.1 exported Marquis2019 parameters in a separate Python 3.11 environment. See [recipe and compatibility fixes](environments/difflib/README.md).

Inside the solver container:

```sh
timeout 900 python3 -u atlas_smoke.py marquis2019.json --end-time 60 --gradient
timeout 900 python3 -u atlas_smoke.py marquis2019.json
```

Both exited 0. No changes to DiffLiB equations were made. Current JAX-FEM and the image's old PETSc/Basix APIs were incompatible; fixed dependency versions resolved the failures.

## Numerical evidence

- Full forward run: 725 samples from 0 to 3620 s, 5 s steps, official quickstart mesh.
- Initial/final terminal voltage: 3.8518206633137266 / 3.096300719249768 V.
- Macro and micro states finite; all terminal voltages between 1.5 and 5 V; terminal voltage decreased.
- Solver-reported full-run time: 95.153 s, including JAX compilation in that process; not a cross-model benchmark.
- Short run: 13 samples to 60 s; final terminal voltage 3.7499720579631535 V.
- All ten AD gradient entries finite. Negative-electrode diffusivity derivative versus centered finite difference (relative perturbation 1e-3): relative error `3.2717456529686067e-7`, below the 1% assertion threshold. This comparison uses only a 10 s trajectory and one gradient component.
