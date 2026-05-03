# spme-oed

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/tcoonsUM/SPMe_OED>
- Upstream commit: `ba054d1d10cfd8f82b8adaffbe181f654dea8394`
- Upstream checkout: `<atlas-root>/.upstream/tcoonsUM__SPMe_OED`

## Environment
- OS: macOS
- Runtime: Python 3.11
- Environment recipe: [`environments/spme-oed/environment.yml`](environments/spme-oed/environment.yml)

## Run
```bash
conda env create -f <atlas-root>/REPRODUCTIONS/environments/spme-oed/environment.yml
conda activate ebatma-spme-oed-311
PYTHONPATH=<atlas-root>/.upstream/tcoonsUM__SPMe_OED python - <<'PY'
import numpy as np
from pybamm_small_d import pybamm_SPMe_Sim
batCap = 4.9872
inp = np.array([[-batCap/2, batCap/3, -batCap/4, batCap/5,
                 batCap/6, -batCap/7, batCap/8, -batCap/9,
                 -batCap/2, 1.3, 5.35e-10, 4e-15, 3.3e-14]], dtype=object)
vt, current, t = pybamm_SPMe_Sim(inp)
print(len(vt[0]), float(vt[0][0]), float(vt[0][-1]))
PY
```

## Outcome
- Result: success
- Actual output: one SPMe simulation completed in about `0.85 s`, returning `4866` time/voltage/current points with voltage from `3.6272 V` to `3.6455 V`.
