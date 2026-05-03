# battsimpy

- Repo: <https://github.com/matthewpklein/battsimpy>
- License: GPL-3.0
- Language/Framework: Python

## Model lineage
- Family: SPM + DFN/P2D (the repository description explicitly mentions Single-Particle and full Pseudo-2D)
- Note: this repository also includes equivalent-circuit models (ECM). This Atlas focuses on the SPM/DFN parts.

## Extensions (if any)
- Thermal/degradation support not verified here

## Reproducibility
- Reproduced locally in this Atlas using Docker `linux/amd64`, Python 2.7, `assimulo=2.9`, and Debian `libx11-6`.

### Quickstart
- Upstream targets legacy Python: Python 2.7 + NumPy/SciPy/Matplotlib + `assimulo`
- Example run reproduced after patching config paths: `python testdriver.py /work/ model_lfp_fvmP2D.conf sim_CC.conf`
- Plotting: `python plotdriver.py /path/to/battsimpy/ model_conffile.conf sim_conffile.conf`

### Entry point(s)
- `testdriver.py` — example simulation driver
- `plotdriver.py` — plotting driver
- `model_parameters/` + `*.conf` — configuration-driven parameters

### Environment lock
- `requirements.txt` exists, but overall environment is legacy (Anaconda2 + assimulo suggested upstream).

### Beginner notes
- Use the reproduced Python 2.7 path first; porting to modern Python is a separate refactor.
- Read the `.conf` files before changing code because much of the model behavior is configuration-driven.

### Numerics note
- battsimpy follows finite volume P2D-style discretization conventions; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Multi-fidelity in one codebase (ECM / SPM / DFN) can be useful for comparisons
- Python ecosystem integrates well with estimation/optimization pipelines

## Known limitations
- GPL license may be restrictive for some commercial use cases
- For this Atlas’s focus, it is important to clearly point users to the SPM/DFN entry points
- The working reproduction requires an old Python 2/Assimulo stack and a native X11 runtime library even for headless Docker runs.

## Who is it for?
- Users who want to try SPM or DFN in Python and compare across model fidelities

## References
- Torchio, Marcello, Magni, Lalo, Gopaluni, R. Bhushan, Braatz, Richard D., Raimondo, Davide M.. “LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control.” Journal of The Electrochemical Society vol. 163(7) pp. A1192--A1205 2016. DOI: 10.1149/2.0291607jes

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B

Rationale: The provided LFP P2D example runs to completion with a pinned legacy environment and path fixes, but Python 2 and old Assimulo still reduce portability.
