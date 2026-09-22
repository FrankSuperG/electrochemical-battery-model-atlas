# Native JAX legacy probe

The September retest uses native arm64 Python 3.9 on macOS. Intel Python under Rosetta failed during JAX import with an AVX error; verify `platform.machine()` before installing.

From the Atlas root, with a native Python interpreter:

```bash
python3 -m venv .envs/atlas-arm
.envs/atlas-arm/bin/python -m pip install -r REPRODUCTIONS/environments/hanrach-retest/requirements.txt
.envs/atlas-arm/bin/python scripts/retest_legacy.py hanrach --grid 10 --timeout 180
.envs/atlas-arm/bin/python scripts/retest_legacy.py hanrach --grid 50 --timeout 240
```

The probe expects `.upstream/hanrach__p2d_solver` at commit `8e633376c9c36943e08796a8048448cd0aed5664`. Clone that public repository and check out the commit first if absent. It copies the local source, replaces old JAX config imports, installs an in-process indexed-update shim, removes an unused callback import, and checks the final normalized residual and finite state. All transformations happen in a temporary copy.

The source prints `Finished process.` even when its Newton failure flag is discarded. The added assertion requires flag zero and normalized residual below `1e-8`. The original driver calls one Newton solve; it does not execute the commented-out time loop. Passing this probe is not validation of a discharge trajectory.

These direct dependency pins describe the tested numerical stack, not a full transitive lockfile. The Atlas script is not a redistribution or relicensing of the unlicensed upstream solver.
