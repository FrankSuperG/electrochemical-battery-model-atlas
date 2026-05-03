# pybamm

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/pybamm-team/PyBaMM>
- Upstream commit: `4c305bdd4049f20f2d10ade14abc42790b75c1e8`
- Local checkout: `<atlas-root>/.upstream/pybamm-team__PyBaMM`

## Environment
- OS: macOS
- Runtime: Python 3.11
- Environment manager: `conda` env at `<atlas-root>/.envs/pybamm-311`

## Install
```bash
conda create -y -p <atlas-root>/.envs/pybamm-311 python=3.11 pip
<atlas-root>/.envs/pybamm-311/bin/pip install pybamm matplotlib
```

## Run
```bash
<atlas-root>/.envs/pybamm-311/bin/python -c "import pybamm; model=pybamm.lithium_ion.DFN(); sim=pybamm.Simulation(model); sol=sim.solve([0,600]); v=sol['Terminal voltage [V]'].entries; print('points', len(v)); print('v0', float(v[0])); print('v_end', float(v[-1])); print('t_end', float(sol.t[-1]))"
```

## Outcome
- Result: success
- Expected output: DFN example solves successfully and returns terminal voltage trajectory
- Actual output: solved a DFN simulation through `t = 600 s` with `56` output points, initial terminal voltage `3.7717 V`, final terminal voltage `3.6934 V`.

## Notes
- Deviations from upstream: used the published `pybamm==26.4.1` package in a clean Python 3.11 environment rather than an editable install from the local clone.
- Blockers: none
- The local system Python (`3.7.0`) is too old for current PyBaMM, so a separate environment is required.
