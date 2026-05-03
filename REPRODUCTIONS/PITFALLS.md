# Reproduction Pitfalls

This file summarizes cross-project issues found during reproduction attempts.
See `CODE_ISSUES.md` for cases where the blocker appears to be source-code or packaging quality rather than only an environment problem.

## Environment selection
- Apple Silicon plus x86_64 Python is a recurring source of binary package failures. Use Docker `linux/amd64` or a clean native environment for packages with compiled extensions.
- Heavy scientific Python projects should pin old dependencies when upstream code is old. `assimulo` needed `numpy<1.24` because it still references removed NumPy aliases.
- For Cantera-based projects, pin Cantera deliberately. `cantera=3.0.1` produced a Python/shared-library commit mismatch in the tested container, while `cantera=2.6.0` imported cleanly.
- Minimal Linux containers may miss GUI-adjacent native libraries even for headless runs. `battsimpy` needed Debian `libx11-6` before the old `assimulo=2.9` solver module could import.

## MATLAB versus Octave
- Octave can run several Scott Moura projects, but old MATLAB plotting code can fail before the numerical model runs. `dkong8s93/p2d-model` currently stops in `initializePlotting`.
- MATLAB class syntax is not fully portable. BattMo's `properties (SetAccess = immutable)` blocks the basic P2D example in Octave, but MATLAB R2021b runs it.
- MATLAB utility functions are inconsistent across Octave packages. `Pseudo_sim` needed compatibility shims for `dctmtx`, `dct`, and `idct`.
- `fprintf(s)` is unsafe in Octave if `s` contains `%`; use `fprintf('%s', s)`.
- MATLAB batch mode on this machine prints font warnings and a shutdown-time `Settings` warning, but successful scripts still return code 0.

## External proprietary or login-gated pieces
- `Pseudo_sim` reaches TOMLAB/KNITRO symbols (`conAssign`, `Prob.KNITRO`), so base MATLAB is not enough for the upstream code. A `fmincon` compatibility shim can run `T1master`, but that is a reproduction workaround rather than a KNITRO-equivalent result.
- `Spectral_li-ion_SPM` requires `chebdif.m` from DMSUITE. The official MathWorks File Exchange page requires login for download; a reproduction shim is enough for the tested example.
- `LIONSIMBA` requires the SUNDIALS MATLAB interface even when running under MATLAB.

## Submodules and large stacks
- BattMo requires submodules. Run `git submodule update --init --recursive` before startup.
- OpenFOAM projects need the OpenFOAM toolchain first. Docker OpenFOAM 10 can compile `batP2dFoam`, but the supplied test case still did not complete locally.
- `mpet` depends on the native `daetools` stack. Minimal Docker images need system libraries such as `libgfortran5`, `libgl1`, and `PyQt5`; the SourceForge `daetools-2.3.0` download is slow but can complete if given enough time.
- `battsimpy` is tied to Python 2 and old Assimulo binaries. The working Docker route was `python=2.7`, `assimulo=2.9`, `libx11-6`, patched absolute config paths, and `MPLBACKEND=Agg`.
