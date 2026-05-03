# p2d_solver (hanrach)

- Repo: <https://github.com/hanrach/p2d_solver>
- License: License not detected via the GitHub license API
- Language/Framework: Python

## Model lineage
- Family: DFN/P2D
- Discretization: finite difference method.
- Solver: repository description mentions JAX for the nonlinear solver (potential for AD/acceleration)

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Unreproduced in this Atlas for the documented README entry point.

### Quickstart
- Install deps (not pinned upstream): `jax` + standard scientific Python stack
- `run_ex.py` completes the original 50x standalone Newton case after modern JAX compatibility patches
- `run_main.py` completes on a reduced grid, but the original 50x README entry exits 137 after slow XLA/Jacobian compilation in the current container

### Entry point(s)
- `run_main.py` — main runnable entry script (as stated in upstream README)
- `p2d_main_fn.py` — top-level solver driver function
- `residual.py` — residual assembly
- `run_ex.py`, `run_compare.py` — additional runnable scripts/experiments

### Environment lock
- No `requirements.txt`/`environment.yml`/`pyproject.toml` detected at repo root.

### Beginner notes
- Use reduced-grid experiments for learning; the documented full-grid path is expensive and currently unreproduced.
- The main learning value is residual/Jacobian construction, so start at `residual.py` after one small run.

### Numerics note
- The solver uses finite difference discretization with JAX-based automatic differentiation for Jacobian-related work; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- JAX direction is interesting for:
  - automatic differentiation (gradients/sensitivities/parameter estimation)
  - hardware acceleration (CPU/GPU/TPU), depending on implementation

## Known limitations
- Reproducibility hinges on JAX API compatibility and resource use. The repository lacks a pinned environment file, and modern JAX requires compatibility shims.

## Who is it for?
- Users interested in DFN/P2D solvers with a path toward AD/acceleration

## References
- Torchio, Marcello, Magni, Lalo, Gopaluni, R. Bhushan, Braatz, Richard D., Raimondo, Davide M.. “LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control.” Journal of The Electrochemical Society vol. 163(7) pp. A1192--A1205 2016. DOI: 10.1149/2.0291607jes

## Optional grades
- Reproducibility: C
- Clarity: B
- Extensibility: B

Rationale: The standalone Newton path can be recovered, but the documented `run_main.py` entry is not yet fully reproduced at the original grid size.
