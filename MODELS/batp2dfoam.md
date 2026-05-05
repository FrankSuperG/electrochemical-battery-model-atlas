# batP2dFoam

- Repo: <https://github.com/redyxg/batP2dFoam>
- License: GPL-3.0
- Language/Framework: C/C++ (OpenFOAM-based)

## Model lineage
- Family: DFN/P2D
- Discretization: finite volume method through OpenFOAM.
- Focus: a P2D solver in the OpenFOAM ecosystem (performance/engineering oriented)

## Extensions (if any)
- Thermal/degradation not verified in this Atlas

## Reproducibility
- Reproduced in this Atlas with Docker OpenFOAM 9 and the upstream `Allrun` script, without source or case edits.

### Quickstart
- Install OpenFOAM (version not specified upstream)
- Build/install the solver with standard OpenFOAM tooling
- Run the provided tutorial-style case:
  - `cd batP2dFoamTest && ./Allrun`
  - The run script calls OpenFOAM utilities in sequence: `blockMesh`, `topoSet`, `setFields`, then runs the solver

### Entry point(s)
- `batP2dFoam/batP2dFoam.C` — solver entry
- `batP2dFoamTest/Allrun` — end-to-end run script
- `batP2dFoamTest/Allclean` — cleanup script
- `batP2dFoamTest/` — case setup (mesh + dictionaries)

### Environment lock
- No explicit lock; reproducibility depends heavily on OpenFOAM version/toolchain and the case dictionaries.

### Beginner notes
- Start by confirming a simple OpenFOAM tutorial runs before building this solver.
- Treat the bundled case as both a numerical model and an OpenFOAM dictionary/debugging problem.

### Numerics note
- OpenFOAM uses finite volume discretization; see [`../NUMERICS.md`](../NUMERICS.md) for the Atlas method summary.

## Strengths
- Fits well for users already in the OpenFOAM/CFD ecosystem
- Potential for parallelism and performance tuning

## Known limitations
- Higher build/dependency barrier vs Python/MATLAB
- GPL license may be restrictive for some commercial use cases
- Reproducibility is OpenFOAM-version sensitive. OpenFOAM 9 runs the upstream case directly, while OpenFOAM 10 expects `zone` instead of `name` inside `zoneToCell` regions in `setFieldsDict`.
- With OpenFOAM 9, the provided test case reaches `End` and writes time directories through `1500`.

## Who is it for?
- Users who want to run DFN/P2D-style battery simulations within OpenFOAM

## References
- Yin, Xiaoguang, Zhang, Dongxiao. “batP2dFoam: An Efficient Segregated Solver for the Pseudo-2-Dimensional (P2D) Model of Li-Ion Batteries.” Journal of The Electrochemical Society vol. 170(3) pp. 030521 2023. DOI: 10.1149/1945-7111/acbfe4
- Doyle, Marc, Fuller, Thomas F., Newman, John. “Modeling of galvanostatic charge and discharge of the lithium/polymer/insertion cell.” Journal of The Electrochemical Society vol. 140(6) pp. 1526--1533 1993. DOI: 10.1149/1.2221597
- Fuller, Thomas F., Doyle, Marc, Newman, John. “Simulation and optimization of the dual lithium ion insertion cell.” Journal of The Electrochemical Society vol. 141(1) pp. 1--10 1994. DOI: 10.1149/1.2054684

## Optional grades
- Reproducibility: B+
- Clarity: B
- Extensibility: B

Rationale: The solver builds and the provided case completes under OpenFOAM 9 Docker without local edits; OpenFOAM 10 remains a documented compatibility pitfall.
