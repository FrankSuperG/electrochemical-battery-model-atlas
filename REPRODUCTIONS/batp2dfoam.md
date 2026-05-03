# batp2dfoam

- Status: `unreproduced`
- Date: 2026-05-02
- Upstream repo: <https://github.com/redyxg/batP2dFoam>
- Upstream commit: `8f93f89169d32225e9c74e8e4e3654d9d38dec5d`
- Local checkout: `<atlas-root>/.upstream/redyxg__batP2dFoam`

## Environment
- OS: Docker on macOS
- Runtime: `openfoam/openfoam10-paraview56` on `linux/amd64`

## Run
```bash
docker run --rm --platform linux/amd64 \
  -v '<atlas-root>/.upstream/redyxg__batP2dFoam':/work \
  -w /work --entrypoint /bin/bash openfoam/openfoam10-paraview56 \
  -lc "source /opt/openfoam10/etc/bashrc && cd batP2dFoam && wmake && cd ../batP2dFoamTest && sh ./Allrun"
```

## Outcome
- Result: unreproduced
- Actual output:
  - OpenFOAM 10 Docker image provides the toolchain
  - `wmake` compiles `batP2dFoam`
  - `blockMesh`, `topoSet`, and `setFields` are launched by `Allrun`
  - `setFields` logs `FOAM FATAL IO ERROR: keyword zone is undefined in dictionary "zoneToCell"`
  - the main `batP2dFoam` process still starts, but after about 27 minutes it remains in repeated `PIMPLE: Iteration ...` loops around iteration 150 with no completed run or written time directories; the container was stopped

## Notes
- The project is no longer blocked merely by missing OpenFOAM locally; Docker supplies OpenFOAM 10 and compilation succeeds.
- The remaining issue is runtime/case compatibility or solver convergence in the provided test case.
