# DiffLiB

- Repo: <https://github.com/CMSL-HKUST/DiffLiB>
- License: GPL-3.0
- Reviewed: 2026-09-22
- Source snapshot: [1df25de5acd5](https://github.com/CMSL-HKUST/DiffLiB/tree/1df25de5acd58da8f17839239cb5da3aa6c2706a)

## Model lineage
Independent, differentiable Doyle-Fuller-Newman (DFN) implementation using JAX and JAX-FEM. Finite elements and gradients for parameter identification complement the existing finite-volume entries. The reviewed implementation is isothermal.

PyBaMM supplies parameter export and comparison cases; it is not the PDE solver for this entry.

## Quickstart
Use the [tested headless recipe](../REPRODUCTIONS/environments/difflib/README.md), which pins compatible JAX-FEM, PETSc and Basix versions. The upstream plotting demos are `python -m demos.benchmark.forward` and `python -m demos.benchmark.gradient`; the Atlas instead ran the quickstart forward configuration and a shorter gradient check without plotting.

## Known limitations
Native JAX, mesh and JAX-FEM dependencies need a separate environment. Do not infer thermal/degradation support or gradient accuracy from import success.

## References
Xu, Weipeng; Yang, Kaiqi; Zhang, Yuzhi; Zhang, Wenchang; Sun, Shichao; Mao, Sheng; Xue, Tianju. (2026). DiffLiB: high-fidelity differentiable modeling of lithium-ion batteries and efficient gradient-based parameter identification. Structural and Multidisciplinary Optimization 69, 83. [DOI](https://doi.org/10.1007/s00158-026-04286-x).

## Reproducibility
The 3620 s 1C quickstart discharge and a short AD/finite-difference check passed locally. See [record](../REPRODUCTIONS/difflib.md) for versions, numerical results and scope limits. The paper's full benchmark suite was not reproduced.
