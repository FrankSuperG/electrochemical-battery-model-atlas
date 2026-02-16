# CPG-SPMT

- Repo: <https://github.com/FrankSuperG/CPG-SPMT>
- License: **Apache-2.0** (see upstream `Apache_License.md`)
- Language/Framework: Python

## Model lineage
- Family: SPM (a reduced model derived from the P2D/DFN lineage)
- Goal: control-oriented fast simulation with thermal effects

## Extensions (if any)
- Thermal: **yes**
- Degradation: not included

## Reproducibility
- Reproduced/validated by the model author.

### Quickstart
- Install deps: `pip install numpy scipy matplotlib pandas openpyxl`
- Run validation suite: `python model_validation.py`
- Core model entry: `cpg_spmt.py` (call `cpg_spmt(...)`)

### Entry point(s)
- `cpg_spmt.py` — core state-space model implementation
- `model_validation.py` — validation driver script
- `data/` (upstream) — validation datasets (Excel)

### Environment
- Python + standard scientific stack (install command shown above in Quickstart).

## Strengths
- Maintainer-owned project with a clear validation workflow and direct traceability to published work

## Known limitations
- Not explicitly documented.

## Who is it for?
- Users who want a fast SPM-family model for parameter sweeps and demonstrations
- Control-oriented use cases (BMS control/estimation), where a well-structured state-space formulation is valuable

## References
- Guo, Feng, Couto, Luis D.. “Cpg-spmt: Control-oriented parameter-grouped single particle model with thermal effects for lithium-ion batteries.” Computer Physics Communications pp. 110075 2026. DOI: 10.1016/j.cpc.2026.110075
- Guo, Feng, Couto, Luis D.. “A control-oriented simplified Single Particle Model with grouped parameter and sensitivity analysis for lithium-ion batteries.” Journal of Power Sources vol. 649 pp. 237309 2025. DOI: 10.1016/j.jpowsour.2025.237309
- Guo, Feng, Couto, Luis D.. “Comparative performance analysis of numerical discretization methods for electrochemical model of lithium-ion batteries.” Journal of Power Sources vol. 650 pp. 237365 2025. DOI: 10.1016/j.jpowsour.2025.237365

## Optional grades
- Reproducibility: A (author-validated)
- Clarity: A
- Extensibility: A

Rationale: Maintained and validated by the model author with explicit quickstart/validation workflow; code is clean and intentionally modular for control/estimation use.
