# cpg-spmt

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/FrankSuperG/CPG-SPMT>
- Upstream commit: `8b1fe7ff75b4c69be55fb543de361a009c5a11a8`
- Local path: `/Users/frank/Documents/New project/.upstream/FrankSuperG__CPG-SPMT`

## Environment
- OS: macOS
- Runtime: Python
- Environment manager: `conda` existing env `battery`

## Install
```bash
/Users/frank/opt/anaconda3/envs/battery/bin/python --version
/Users/frank/opt/anaconda3/envs/battery/bin/python -c "import numpy, scipy, matplotlib, pandas, openpyxl"
```

## Run
```bash
cd /Users/frank/Documents/New\ project/.upstream/FrankSuperG__CPG-SPMT
MPLBACKEND=Agg /Users/frank/opt/anaconda3/envs/battery/bin/python model_validation.py
```

## Outcome
- Result: success
- Expected output: validation script runs and produces voltage-fit metrics and figures
- Actual output: the validation suite produced 24 benchmark rows in `validation_results/cpg_spmt_validation_results.csv`, generated per-temperature/per-cycle PNG figures, and wrote summary comparison plots.

## Notes
- Deviations from upstream: forced `MPLBACKEND=Agg` to avoid GUI dependence on local macOS.
- Blockers: none
- Aggregate metrics from the generated CSV: mean RMSE `0.0331 V`, best RMSE `0.0146 V`, worst RMSE `0.0665 V`, mean R² `0.9683`.
