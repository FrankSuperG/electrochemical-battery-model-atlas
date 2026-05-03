# p2d-solver-hanrach

- Status: `unreproduced`
- Date: 2026-05-02
- Upstream repo: <https://github.com/hanrach/p2d_solver>
- Upstream commit: `8e633376c9c36943e08796a8048448cd0aed5664`
- Local path: `/Users/frank/Documents/New project/.upstream/hanrach__p2d_solver`

## Environment
- OS: Docker on macOS
- Runtime: `python:3.11-slim` on `linux/arm64`

## Outcome
- Result: unreproduced
- Actual output:
  - import and early setup were recovered with JAX compatibility patches for `jax.config` and `jax.ops.index_update`
  - removed the unused `p2d_main_fn` import from `run_ex.py` to avoid the removed `jax.experimental.host_callback` path
  - parameterized grid sizes in `run_ex.py` and `run_main.py` with `HANRACH_*` environment variables
  - `run_ex.py` now completes the original 50x standalone Newton case with `Grid Np 50 Nn 50 Mp 50 Ms 10 Mn 50 Ma 5 Mz 5`, Newton convergence in 5 iterations, and `Matrix of size 34409956`
  - `run_main.py` completes a reduced 10x/5x grid with residuals through iteration 5 and `Finished process.`
  - final original-grid `run_main.py` attempt again exited with code 137 after slow XLA compilation and `computed jacobian`
- Blockers:
  - README points to `run_main.py`; the original 50x `run_main.py` path compiled the Jacobian after roughly 3 minutes but the container was killed with exit code 137 before finishing
  - this is therefore not a full original-entry reproduction

## Run
```bash
docker run --rm --platform linux/arm64 \
  -v '/Users/frank/Documents/New project/.upstream/hanrach__p2d_solver':/work \
  -w /work python:3.11-slim \
  bash -lc "pip install --quiet 'jax[cpu]' scipy matplotlib && HANRACH_NP=50 HANRACH_MS=10 MPLBACKEND=Agg python run_ex.py"
```

Reduced `run_main.py` verification:

```bash
docker run --rm --platform linux/arm64 \
  -v '/Users/frank/Documents/New project/.upstream/hanrach__p2d_solver':/work \
  -w /work python:3.11-slim \
  bash -lc "pip install --quiet 'jax[cpu]' scipy matplotlib && HANRACH_NP=10 HANRACH_MS=5 PYTHONUNBUFFERED=1 MPLBACKEND=Agg python run_main.py"
```
