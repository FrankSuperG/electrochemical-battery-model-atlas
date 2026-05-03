# spmet

- Status: `success`
- Date: 2026-05-01
- Upstream repo: <https://github.com/scott-moura/SPMeT>
- Upstream commit: `bc4f8300d1262bfdef3d8b2949544c589b302c66`
- Local path: `/Users/frank/Documents/New project/.upstream/scott-moura__SPMeT`

## Environment
- OS: macOS
- Runtime: Octave 11.1.0

## Run
```bash
cd /Users/frank/Documents/New\ project/.upstream/scott-moura__SPMeT
mkoctfile --mex lininterp1f.c
octave --no-gui --quiet --eval "cd('/Users/frank/Documents/New project/.upstream/scott-moura__SPMeT'); spmet; disp('SPMET_OK');"
```

## Outcome
- Result: success
- Actual output: SPMeT simulation completed, printed elapsed time `14.9 sec`, and finished with `SPMET_OK`.
- Notes: the bundled interpolation MEX had to be rebuilt locally for Octave before the model could run.
