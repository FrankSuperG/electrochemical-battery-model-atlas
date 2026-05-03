# pseudo-sim-liuyang12

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/liuyang12/Pseudo_sim>
- Upstream commit: `0eca60fadbfeb59d5a8374d87d20a6d96574fea5`
- Local checkout: `<atlas-root>/.upstream/liuyang12__Pseudo_sim`

## Environment
- OS: macOS
- Runtime: MATLAB R2021b and Octave 11.1.0

## Run
```bash
octave --no-gui --quiet --eval "pkg install /tmp/image-2.20.0.tar.gz"
octave --no-gui --quiet --eval "addpath('<atlas-root>/REPRODUCTIONS/shims/pseudo-sim-liuyang12'); cd('<atlas-root>/.upstream/liuyang12__Pseudo_sim'); T1master; disp('PSEUDO_SIM_OK');"
matlab -batch "disp(['dctmtx=',num2str(exist('dctmtx','file'))]); disp(['dct=',num2str(exist('dct','file'))]); disp(['conAssign=',num2str(exist('conAssign','file'))]); disp(['knitro=',num2str(exist('knitro','file'))]); cd('<atlas-root>/.upstream/liuyang12__Pseudo_sim'); set(0,'DefaultFigureVisible','off'); T1master; disp('PSEUDO_SIM_MATLAB_OK')"
matlab -batch "set(0,'DefaultFigureVisible','off'); addpath('<atlas-root>/REPRODUCTIONS/shims/pseudo-sim-liuyang12'); cd('<atlas-root>/.upstream/liuyang12__Pseudo_sim'); T1master; disp('PSEUDO_SIM_FMINCON_SHIM_OK')"
```

## Outcome
- Result: success with local TOMLAB compatibility shim backed by MATLAB `fmincon`
- Actual output:
  - raw Octave run fails first at `dctmtx`
  - after adding local `dctmtx`, `dct`, and `idct` shims, the script advances to the first optimization setup
  - MATLAB R2021b provides `dctmtx` and `dct`, but `conAssign=0` and `knitro=0`
  - after adding local `conAssign`, `tomRun`, and `WarmDefSOL` shims, `T1master` runs through the full progress loop and prints `PSEUDO_SIM_FMINCON_SHIM_OK`

## Notes
- Octave Forge `image` 2.20.0 installed successfully from a manually downloaded tarball, but it still does not provide `dctmtx`.
- Octave `fprintf(s)` fails when `s` contains `%`; the local upstream clone needed `fprintf('%s', s)` at the progress-print lines.
- Upstream still has a hard TOMLAB/KNITRO dependency. The `fmincon` shim is a reproduction workaround, not a guarantee of numerical equivalence to KNITRO.
