# battsimpy

- Status: `success`
- Date: 2026-05-02
- Upstream repo: <https://github.com/matthewpklein/battsimpy>
- Upstream commit: `1c786cdb499000ffe66a65a877bceef301d14a9b`
- Local path: `/Users/frank/Documents/New project/.upstream/matthewpklein__battsimpy`

## Environment
- OS: Docker on macOS
- Runtime: `micromamba` Python 2.7 on `linux/amd64`

## Run
```bash
docker run --rm --platform linux/amd64 --user root \
  -v '/Users/frank/Documents/New project/.upstream/matthewpklein__battsimpy':/work \
  -w /work/battsimpy mambaorg/micromamba:1.5.10 \
  bash -lc "apt-get update >/tmp/apt.log && apt-get install -y libx11-6 >/tmp/apt-install.log && micromamba create -y -n bspy -c chria -c conda-forge python=2.7 assimulo=2.9 numpy scipy matplotlib >/tmp/bspy-env.log && mkdir -p /work/repro_output/codex && MPLBACKEND=Agg micromamba run -n bspy python testdriver.py /work/ model_lfp_fvmP2D.conf sim_CC.conf"
```

## Outcome
- Result: success
- Actual output:
  - after adding Debian `libx11-6`, the README-recommended `assimulo=2.9` path imports `IDA` successfully
  - patched example config paths from `/Users/mk/...` to `/work/...` and disabled plotting with `PLOT_VOLT_ON=0`
  - official example command `python testdriver.py /work/ model_lfp_fvmP2D.conf sim_CC.conf` completed
  - output includes `Vmin stopped simulation.`, `Finished simulation.`, and `Saved the simulation results.`
  - generated `/work/repro_output/codex/Rate__demo_cc_discharge__lfp__full_1d_fvm_ida__1mTby1dT.p`

## Notes
- The minimal Docker route needs `--user root` to install `libx11-6` before creating the Python 2.7 conda environment.
- The first model step prints `V_cell prior to time loop: 3.3500825900001687`; the CC discharge then reaches about `18518.416 s` and stops below the `2.4 V` cutoff.
