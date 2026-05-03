# p2d_li_ion_battery (decaluwe)

- Repo: <https://github.com/decaluwe/p2d_li_ion_battery>
- License: BSD-3-Clause
- Language/Framework: Python

## Model lineage
- Family: DFN/P2D (Newman-type pseudo-2D Li-ion battery model)
- Discretization: control-volume style shell balances for particles and through-thickness cell volumes.

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Unreproduced in this Atlas after a final targeted attempt with Docker Python 3.8, `cantera=2.6.0`, `assimulo`, and `numpy<1.24`.
- Even after local constructor/index/event fixes and setting `Battery_equil.algvar = algvar`, IDA fails convergence at `t=0`.

### Quickstart
- Install deps: requires Cantera, Assimulo, and a compatible NumPy/SciPy stack. The tested path used `cantera=2.6.0` and `numpy<1.24`.
- Run main script: `python li_ion_battery_p2d_model.py`

### Entry point(s)
- `li_ion_battery_p2d_model.py` — main driver (has `if __name__ == '__main__': main()`)
- `li_ion_battery_p2d_inputs.py` — experiment/parameter inputs
- `li_ion_battery_p2d_init.py` — initialization
- `li_ion_battery_p2d_functions.py` — model equations
- `li_ion_battery_p2d_post_process.py` — post-processing/plotting
- `LiBatteryFull.cti` — chemistry/mechanism file used by the model

### Environment lock
- No dependency lockfile detected at repo root.

### Beginner notes
- Treat this as an equation/residual audit project, not a quick first-run baseline.
- If you continue reproduction, inspect differential versus algebraic variable classification before changing more dependencies.

### Numerics note
- This code uses control-volume-style shell balances with IDA/Assimulo time integration; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- A relatively self-contained DFN/P2D implementation that can be useful for learning and cross-checking
- Permissive license (BSD-3-Clause)

## Known limitations
- The tested snapshot has several code-level blockers: incorrect `Extended_Problem` construction, broken event callbacks, undefined tolerance/stage names, an anode offset typo in the residual function, and incomplete separator/cathode residual coverage.
- No dependency lockfile is provided.

## Who is it for?
- Users who want to read a direct DFN/P2D codebase and use it as a reference/contrast

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: D
- Clarity: B
- Extensibility: B

Rationale: Dependencies can be installed with careful pinning, but the full-cell DAE does not run cleanly even after several source-level repairs.
