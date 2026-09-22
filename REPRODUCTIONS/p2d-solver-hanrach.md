# p2d-solver-hanrach

- Status: `unreproduced`
- Date: 2026-05-05
- Upstream repo: <https://github.com/hanrach/p2d_solver>
- Upstream commit: `8e633376c9c36943e08796a8048448cd0aed5664`
- Upstream checkout: `<atlas-root>/.upstream/hanrach__p2d_solver`

## Environment
The sections below this update preserve the May 2026 container attempt.

## September 2026 retest

Upstream default-branch SHA still matches the commit above. Native macOS arm64 Python 3.9, JAX/jaxlib 0.4.30, NumPy 1.26.4, SciPy 1.13.1 and Matplotlib 3.9.4 were installed in a separate ignored environment. An initial Intel Python 3.11/JAX 0.4.38 attempt failed on AVX support and was not used for numerical results.

From the Atlas root:

```bash
.envs/atlas-arm/bin/python scripts/retest_legacy.py hanrach --grid 10 --timeout 180
.envs/atlas-arm/bin/python scripts/retest_legacy.py hanrach --grid 50 --timeout 240
```

- Reduced grid: exit 0; five Newton iterations; `ATLAS_FINAL_RESIDUAL 5.413805508102402e-10 FAIL 0`. The wrapper also asserts a finite state. First-loop time was about 7.16 s, including compilation.
- Original grid: output stopped after `entering newton` and `here`; child return code `-9` (SIGKILL). This was not the wrapper's timeout result. No completed original-grid solve was observed. Resource pressure is plausible, but no operating-system OOM diagnostic was captured.
- Scope correction: `p2d_main_fn.py` calls one Newton solve; its time-stepping loop is commented out. Neither `Finished process.` nor a converged single step establishes a full discharge trajectory.
- The original driver discards `fail`; the new probe checks that flag and recomputes the final normalized residual instead of trusting the completion message.
- Patches are applied only to a temporary copy; see [recipe and limitations](environments/hanrach-retest/README.md) and [probe script](../scripts/retest_legacy.py).

## Historical environment (May 2026)
- OS: Docker on macOS
- Runtime: `python:3.11-slim` on `linux/arm64`

## Outcome
- Result: unreproduced
- Actual output:
  - import and early setup were recovered with JAX compatibility patches for `jax.config` and `jax.ops.index_update`
  - removed the unused `p2d_main_fn` import from `run_ex.py` to avoid the removed `jax.experimental.host_callback` path
  - parameterized grid sizes in `run_ex.py` and `run_main.py` with `HANRACH_*` environment variables
  - 2026-05-05 retest used a temporary compatibility-patched copy, leaving the upstream checkout unchanged
  - `run_ex.py` now completes the original 50x standalone Newton case with `Grid Np 50 Nn 50 Mp 50 Ms 10 Mn 50 Ma 5 Mz 5`, Newton convergence in 5 iterations, and `Matrix of size 34409956`
  - the retested `run_ex.py` path reported first-loop time `8.767770546000001`, residual sequence through iteration 5, and `Matrix of size 34409956`
  - `run_main.py` completes a reduced 10x/5x grid with residuals through iteration 5 and `Finished process.`
  - the retested reduced `run_main.py` path reported first-loop time `19.404522467999996` and `Finished process.`
  - final original-grid `run_main.py` attempt again exited with code 137 after slow XLA compilation and `computed jacobian`
- Basic case status: yes. The standalone `run_ex.py` 50x Newton case and reduced-grid `run_main.py` case are runnable with modern-JAX compatibility shims.
- Blockers:
  - README points to `run_main.py`; the original 50x `run_main.py` path compiled the Jacobian after roughly 3 minutes but the container was killed with exit code 137 before finishing
  - this is therefore not a full original-entry reproduction
  - this blocker does not look like an initial-condition failure; the smaller cases converge, while the full README entry is dominated by XLA/Jacobian compilation and memory pressure

## Run
The commands below require the temporary compatibility edits summarized in [`LOCAL_PATCHES.md`](LOCAL_PATCHES.md). They are not clean-upstream commands.

```bash
docker run --rm --platform linux/arm64 \
  -v '<patched-hanrach-copy>':/work \
  -w /work python:3.11-slim \
  bash -lc "pip install --quiet 'jax[cpu]' scipy matplotlib && HANRACH_NP=50 HANRACH_MS=10 MPLBACKEND=Agg python run_ex.py"
```

Reduced `run_main.py` verification:

```bash
docker run --rm --platform linux/arm64 \
  -v '<patched-hanrach-copy>':/work \
  -w /work python:3.11-slim \
  bash -lc "pip install --quiet 'jax[cpu]' scipy matplotlib && HANRACH_NP=10 HANRACH_MS=5 PYTHONUNBUFFERED=1 MPLBACKEND=Agg python run_main.py"
```
