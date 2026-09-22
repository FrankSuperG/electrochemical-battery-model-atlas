# cideMOD tested environment

Tested on Linux ARM64 in Docker, 2026-09-22. The Dockerfile records the installation
sequence exercised interactively; a fresh Dockerfile build has not been tested.

```sh
docker build --platform linux/arm64 -t atlas-cidemod REPRODUCTIONS/environments/cidemod
docker run --rm atlas-cidemod
docker run --rm atlas-cidemod timeout 300 python3 -m pytest -q test_Chen_2020.py::TestP2D_Chen::test_dimensional
```

The upstream `dolfinx-v0.7.0` multiphenicsx branch no longer exists. The fixed
`341d6017993c6c7748693aeb700282fd955541c0` dependency commit worked with dolfinx 0.7.0.
No changes to cideMOD equations or reference tolerances were needed. The smoke
script adds finite-output and monotonic-time assertions before calling the
original reference comparisons. It does not validate thermal/degradation/P3D/P4D cases.

`pip-freeze.txt` is an observed dependency inventory, not a standalone installation
file: it includes container-local source paths and packages supplied by the image.
