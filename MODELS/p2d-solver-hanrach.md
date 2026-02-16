# p2d_solver (hanrach)

- Repo: <https://github.com/hanrach/p2d_solver>
- License: License not detected via the GitHub license API
- Language/Framework: Python

## Model lineage
- Family: DFN/P2D
- Numerics: finite difference
- Solver: repository description mentions JAX for the nonlinear solver (potential for AD/acceleration)

## Extensions (if any)
- Thermal/degradation not verified in this Zoo

## Reproducibility
- Not reproduced in this Zoo (summary below is based on upstream repository structure and README).

### Quickstart
- Install deps (not pinned upstream): `jax` + standard scientific Python stack
- Run: `python run_main.py`

### Entry point(s)
- `run_main.py` — main runnable entry script (as stated in upstream README)
- `p2d_main_fn.py` — top-level solver driver function
- `residual.py` — residual assembly
- `run_ex.py`, `run_compare.py` — additional runnable scripts/experiments

### Environment lock
- No `requirements.txt`/`environment.yml`/`pyproject.toml` detected at repo root.

## Strengths
- JAX direction is interesting for:
  - automatic differentiation (gradients/sensitivities/parameter estimation)
  - hardware acceleration (CPU/GPU/TPU), depending on implementation

## Known limitations
- Reproducibility may hinge on environment pinning and a clear runnable entry point (needs verification)

## Who is it for?
- Users interested in DFN/P2D solvers with a path toward AD/acceleration

## References
- Torchio, Marcello, Magni, Lalo, Gopaluni, R. Bhushan, Braatz, Richard D., Raimondo, Davide M.. “LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control.” Journal of The Electrochemical Society vol. 163(7) pp. A1192--A1205 2016. DOI: 10.1149/2.0291607jes

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: README points to a runnable entry (run_main.py) and modern solver stack (JAX); reproducibility hinges on dependency pinning and environment details.
