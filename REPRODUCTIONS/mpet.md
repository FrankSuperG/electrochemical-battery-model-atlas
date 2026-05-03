# mpet

- Status: `success`
- Date: 2026-05-02
- Upstream repo: <https://github.com/TRI-AMDD/mpet>
- Upstream commit: `ff49b292fc6a54d289a3b1ba079e5eb858fe14bd`
- Upstream checkout: `<atlas-root>/.upstream/TRI-AMDD__mpet`

## Environment
- OS: Docker on macOS
- Runtime: `python:3.12-bookworm` on `linux/amd64`

## Run
```bash
docker run --rm --platform linux/amd64 \
  -v '<atlas-root>/.upstream/TRI-AMDD__mpet':/work \
  -w /work python:3.12-bookworm \
  bash -lc "apt-get update >/tmp/apt.log && apt-get install -y libgl1-mesa-glx libgfortran5 >/tmp/apt-install.log && timeout 900 bash -lc 'pip install --progress-bar off https://sourceforge.net/projects/daetools/files/daetools/2.3.0/daetools-2.3.0-gnu_linux-x86_64.zip PyQt5 >/tmp/mpet-daetools.log && pip install --progress-bar off .[test] >/tmp/mpet-install.log && PYTHONPATH=. python bin/run_tests.py --test_dir tests --output_dir /tmp/mpet-test-out test001'"
```

## Outcome
- Result: success
- Actual output:
  - `daetools-2.3.0` was installed from the SourceForge binary zip after the download eventually completed
  - `PyQt5` is required in addition to the native libraries
  - `pip install .[test]` completes
  - `PYTHONPATH=. python bin/run_tests.py --test_dir tests --output_dir /tmp/mpet-test-out test001` completes
  - output includes `The system created successfully.`, integration progress from `0.00` to `352800.00 s`, `Used parameter file /tmp/mpet-test-out/test001/params_system.cfg`, and `Total time: 2.578779935836792 s`

## Notes
- A working Docker recipe needs at least `libgfortran5`, OpenGL libraries from `libgl1-mesa-glx`, `PyQt5`, and the pinned SourceForge `daetools` wheel.
- The SourceForge download can be slow, but it is reproducible when allowed enough time.
