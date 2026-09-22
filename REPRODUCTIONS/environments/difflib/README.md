# DiffLiB tested environment

Tested on Linux ARM64 in Docker, 2026-09-22. The Dockerfile consolidates the
installation steps exercised interactively; a fresh Dockerfile build has not
been tested. `pip-freeze.txt` records the observed environment, including
image-local paths; it is not a standalone pip requirements file.

Export parameters separately with Python 3.11 / PyBaMM 26.4.1 (the Atlas used its
existing `.envs/pybamm-311` environment):

```sh
python -c 'import pybamm; pybamm.ParameterValues("Marquis2019").to_json("marquis2019.json")'
docker build --platform linux/arm64 -t atlas-difflib REPRODUCTIONS/environments/difflib
docker run --rm -v "$PWD:/inputs:ro" atlas-difflib
docker run --rm -v "$PWD:/inputs:ro" atlas-difflib timeout 900 python3 -u atlas_smoke.py /inputs/marquis2019.json --end-time 60 --gradient
```

The full forward test uses the upstream quickstart mesh (20 cells per electrode
and separator, 2 transverse, 10 radial), 1C, 5 s steps and a 3620 s horizon.
The gradient check uses only 10 s, a sum-of-macro-states objective and one
finite-difference direction (negative-electrode diffusivity). It is not a full
Taylor test or validation of every gradient component.

Compatibility findings:

- Current JAX-FEM `9a79b4bb...` uses PETSc `setPreallocationCOO`, unavailable in
  the image's petsc4py. Fixed JAX-FEM `72846d64a5c2359390b071e2b8101b0adc05e330`
  (package version 0.0.11) works without changing DiffLiB equations.
- Basix 0.7.0 uses `QuadratureType.Default`, incompatible with the tested JAX-FEM
  API; Basix 0.9.0 works. The unused dolfinx/FFCx/UFL packages are removed from
  this container, not from cideMOD's separate environment.
- JAX-FEM's package metadata omitted `pyfiglet`; explicitly install it.
- PyBaMM is used only for parameter export, not the DiffLiB solve. Exporting
  separately avoids resolving unrelated PyBaMM solver dependencies in this image.
- Both final solver containers passed `python3 -m pip check`.
