# CPG-SPMT

- Repo: <https://github.com/FrankSuperG/CPG-SPMT>
- License: **PolyForm-Noncommercial-1.0.0** (see upstream `LICENSE`; changed from Apache-2.0 in upstream commit `8b1fe7f`)
- Language/Framework: Python

## Model lineage
- Family: SPM (a reduced model derived from the P2D/DFN lineage)
- Discretization: parabolic/polynomial profile approximation for SPM solid diffusion.
- Goal: control-oriented fast simulation with thermal effects

## Extensions (if any)
- Thermal: **yes**
- Degradation: not included

## Reproducibility
- Independently reproduced in this Atlas on 2026-05-01 using the upstream validation script on macOS with a compatible Python environment.
- Command used: `MPLBACKEND=Agg python model_validation.py`
- Evidence: 24 validation cases were generated in `validation_results/cpg_spmt_validation_results.csv` together with the expected PNG outputs. Aggregate results from the generated CSV: mean RMSE `0.0331 V`, mean R² `0.9683`.

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

### Beginner notes
- Start with `model_validation.py`; it gives a complete data-to-metrics path before you edit the model.
- The core model is control-oriented, so identify the grouped parameters and state-space variables first.

### Numerics note
- CPG-SPMT uses a parabolic/polynomial approximation for SPM solid diffusion; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Maintainer-owned project with a clear validation workflow and direct traceability to published work

## Known limitations
- The current upstream license is noncommercial. Treat reuse in commercial workflows as restricted unless the author grants separate permission.

## Who is it for?
- Users who want a fast SPM-family model for parameter sweeps and demonstrations
- Control-oriented use cases (BMS control/estimation), where a well-structured state-space formulation is valuable

## References
- Guo, Feng, Couto, Luis D.. “CPG-SPMT: Control-oriented parameter-grouped single particle model with thermal effects for Lithium-Ion batteries.” Computer Physics Communications vol. 322 pp. 110075 2026. DOI: 10.1016/j.cpc.2026.110075
- Guo, Feng, Couto, Luis D.. “A control-oriented simplified Single Particle Model with grouped parameter and sensitivity analysis for lithium-ion batteries.” Journal of Power Sources vol. 649 pp. 237309 2025. DOI: 10.1016/j.jpowsour.2025.237309
- Guo, Feng, Couto, Luis D.. “Comparative performance analysis of numerical discretization methods for electrochemical model of lithium-ion batteries.” Journal of Power Sources vol. 650 pp. 237365 2025. DOI: 10.1016/j.jpowsour.2025.237365

## Optional grades
- Reproducibility: A
- Clarity: A
- Extensibility: A

Rationale: Independently reproduced in this Atlas using the upstream validation workflow, with strong quantitative agreement preserved across the generated validation suite.
