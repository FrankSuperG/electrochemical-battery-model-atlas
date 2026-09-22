# PyBattMo independent interface environment

This is a supplemental test of the Python interface within the BattMo family,
not another project or independent solver entry. The source commit is pinned in
`requirements.txt`; the Julia backend is pinned in `Manifest.toml`.

Use native ARM64 Python 3.12 and Julia 1.12.6 on macOS for the tested configuration.
Python and Julia must have matching architectures. From the Atlas root:

```sh
python3.12 -m venv .envs/pybattmo312
.envs/pybattmo312/bin/python -m pip install -r REPRODUCTIONS/environments/pybattmo/requirements.txt
julia --project=REPRODUCTIONS/environments/pybattmo -e 'using Pkg; Pkg.instantiate()'
export PYTHON_JULIACALL_EXE="$(command -v julia)"
export PYTHON_JULIACALL_PROJECT="$PWD/REPRODUCTIONS/environments/pybattmo"
export JULIA_PYTHONCALL_EXE="$PWD/.envs/pybattmo312/bin/python"
export JULIA_PYTHONCALL_LIB="$(.envs/pybattmo312/bin/python -c 'import sys; from pathlib import Path; print(Path(sys.base_prefix) / "lib" / "libpython3.12.dylib")')"
export JULIA_CONDAPKG_BACKEND=Null
export JULIA_NUM_PRECOMPILE_TASKS=2
export OPENBLAS_NUM_THREADS=1
.envs/pybattmo312/bin/python -m pytest -q -s REPRODUCTIONS/environments/pybattmo/test_interface.py
```

This explicitly selected headless project avoids the wrapper's automatic Julia
package provisioning, whose bundled `juliapkg.json` names older BattMo/Jutul and
GLMakie versions. It is not a test of that automatic installer or of plotting.
The Python JuliaCall and Julia PythonCall versions are both 0.9.36.

The explicit Python library path is needed by the tested relocatable macOS
Python distribution during extension precompilation. Check that the file exists;
other Python distributions/platforms can have a different library location.

The suite tests bridge-extension loading, parameter/settings loading, Python-side discharge-rate updates,
two complete discharge calls, pandas/NumPy conversion, controller termination,
agreement with the separately tested Julia 0.5C example, and the
`FullSimulationInput` constructor's return type. See the linked interface record
for individual outcomes; a failing constructor test must not be interpreted as
a successful full API audit.

The full suite intentionally includes the confirmed upstream constructor
regression and therefore returns nonzero on this pinned source. To run only the
working path and its tested workaround, append
`-k 'not full_input_constructor_type'`. This selection is narrower evidence,
not a fix for the public wrapper.
