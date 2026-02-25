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
- Not reproduced in this Atlas (summary below is based on upstream docs).

### Quickstart
- Upstream targets legacy Python: Python 2.7 + NumPy/SciPy/Matplotlib + `assimulo`
- Example run: `python testdriver.py /path/to/battsimpy/ model_conffile.conf sim_conffile.conf`
- Plotting: `python plotdriver.py /path/to/battsimpy/ model_conffile.conf sim_conffile.conf`

### Entry point(s)
- `testdriver.py` — example simulation driver
- `plotdriver.py` — plotting driver
- `model_parameters/` + `*.conf` — configuration-driven parameters

### Environment lock
- `requirements.txt` exists, but overall environment is legacy (Anaconda2 + assimulo suggested upstream).

## Strengths
- Multi-fidelity in one codebase (ECM / SPM / DFN) can be useful for comparisons
- Python ecosystem integrates well with estimation/optimization pipelines

## Known limitations
- GPL license may be restrictive for some commercial use cases
- For this Atlas’s focus, it is important to clearly point users to the SPM/DFN entry points

## Who is it for?
- Users who want to try SPM or DFN in Python and compare across model fidelities

## References
- Torchio, Marcello, Magni, Lalo, Gopaluni, R. Bhushan, Braatz, Richard D., Raimondo, Davide M.. “LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control.” Journal of The Electrochemical Society vol. 163(7) pp. A1192--A1205 2016. DOI: 10.1149/2.0291607jes

## Optional grades
- Reproducibility: C
- Clarity: B
- Extensibility: B

Rationale: Has multiple model fidelities in one codebase, but older Python/dep assumptions reduce one-click reproducibility; entry points exist but need careful navigation.
