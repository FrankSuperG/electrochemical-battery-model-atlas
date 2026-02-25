# p2d_li_ion_battery (decaluwe)

- Repo: <https://github.com/decaluwe/p2d_li_ion_battery>
- License: BSD-3-Clause
- Language/Framework: Python

## Model lineage
- Family: DFN/P2D (Newman-type pseudo-2D Li-ion battery model)

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Not reproduced in this Atlas (summary below is based on upstream repository structure).

### Quickstart
- Install deps: requires `assimulo` + typical scientific Python stack (NumPy/Matplotlib).
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

## Strengths
- A relatively self-contained DFN/P2D implementation that can be useful for learning and cross-checking
- Permissive license (BSD-3-Clause)

## Known limitations
- Engineering maturity (tests/CI/modularity) not assessed here

## Who is it for?
- Users who want to read a direct DFN/P2D codebase and use it as a reference/contrast

## References
- No primary reference was identified in upstream docs for this entry.

## Optional grades
- Reproducibility: C
- Clarity: B
- Extensibility: B

Rationale: Self-contained reference-style DFN implementation; reproducibility and onboarding depend on documenting exact run commands and required dependencies/files.
