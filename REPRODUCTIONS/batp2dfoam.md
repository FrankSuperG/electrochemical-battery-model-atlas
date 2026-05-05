# batp2dfoam

- Status: `success`
- Date: 2026-05-05
- Upstream repo: <https://github.com/redyxg/batP2dFoam>
- Upstream commit: `8f93f89169d32225e9c74e8e4e3654d9d38dec5d`
- Upstream checkout: `<atlas-root>/.upstream/redyxg__batP2dFoam`

## Environment
- OS: Docker on macOS
- Runtime: `openfoam/openfoam9-paraview56` on `linux/amd64`

## Run
```bash
tmpdir="$(mktemp -d)"
git -C '<atlas-root>/.upstream/redyxg__batP2dFoam' archive 8f93f89169d32225e9c74e8e4e3654d9d38dec5d | tar -x -C "$tmpdir"

docker run --rm --platform linux/amd64 \
  -v "$tmpdir":/work \
  -w /work --entrypoint /bin/bash openfoam/openfoam9-paraview56 \
  -lc "source /opt/openfoam9/etc/bashrc && cd batP2dFoam && wmake && cd ../batP2dFoamTest && sh ./Allrun"
```

## Outcome
- Result: success
- Actual output:
  - OpenFOAM 9 Docker image provides the toolchain
  - `wmake` compiles `batP2dFoam`
  - upstream `Allrun` launches `blockMesh`, `topoSet`, `setFields`, and `batP2dFoam`
  - `setFields` succeeds with the upstream `name anode`, `name separator`, and `name cathode` `zoneToCell` entries
  - `batP2dFoam` reaches `End` with `ExecutionTime = 46.72 s` and `ClockTime = 56 s` in the tested Docker run
  - output time directories written: `300`, `600`, `900`, `1200`, `1500`

## Notes
- The clean path is OpenFOAM 9, matching the `setFieldsDict` header and accepting `name` in `zoneToCell` regions.
- OpenFOAM 10 can compile the solver, but the upstream case fails at `setFields` unless `name` is changed to `zone` in `zoneToCell` regions.
- Treat OpenFOAM 10 as a compatibility variant, not the primary reproduction environment.
