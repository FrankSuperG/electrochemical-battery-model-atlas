# SPMe_OED

- Repo: <https://github.com/tcoonsUM/SPMe_OED>
- License: License not detected via the GitHub license API (may not include a standard LICENSE file)
- Language/Framework: Python
- Implementation base: PyBaMM-backed workflow; the battery solve is delegated to `pybamm.lithium_ion.SPMe()` and `pybamm.Simulation`.

## Model lineage
- Family: SPMe (Single-Particle Model with electrolyte)
- Discretization: PyBaMM default finite volume discretization for the SPMe battery solve.

## Extensions (if any)
- Focus is not multiphysics extensions but parameter inference + Bayesian optimal experimental design (OED)

## Reproducibility
- Reproduced in this Atlas using a PyBaMM Python 3.11 environment from the recipe.

### Quickstart
- Install Python deps (not pinned upstream): `pybamm`, `numpy`, `matplotlib`, and `bayes_opt`
- Try one runnable entry:
  - `python pybamm_small_d.py`
  - or `python pybamm_small_d_parallel.py`

### Entry point(s)
- `pybamm_small_d.py` — runnable script (has `if __name__ == '__main__'`)
- `pybamm_small_d_parallel.py` — parallel variant
- `pybamm_eig_estimator.py` — EIG-related utilities
- `utils_eps_orig.py` — utilities

### Environment lock
- No `requirements.txt`/`environment.yml`/`pyproject.toml` detected at repo root.

### Beginner notes
- Understand the PyBaMM model path before changing the optimal experimental design loop.
- Start with `pybamm_small_d.py`; use the parallel script only after the serial path is clear.

### Numerics note
- SPMe_OED delegates the battery model solve to PyBaMM, whose default SPMe discretization is finite volume; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Very useful for the SPMe ecosystem: connects the model with inference and experimental design workflows
- Useful for research on parameter identification and experiment design

## Known limitations
- Reproducibility depends on a compatible PyBaMM stack and the OED-side Python dependencies.

## Who is it for?
- Users doing SPMe-based parameter inference and experimental design

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: Research-oriented repo with a defined method (OED/inference) and likely runnable scripts; clearer packaging/locking would further improve reproducibility.
