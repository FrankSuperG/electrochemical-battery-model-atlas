# cideMOD

- Repo: <https://github.com/cidetec-energy-storage/cideMOD>
- License: AGPL-3.0-or-later
- Reviewed: 2026-09-22
- Source snapshot: [f3a834403d9b](https://github.com/cidetec-energy-storage/cideMOD/tree/f3a834403d9b110c2c75ba69f0f42b8f6e6b8aaf)

## Model lineage
Finite-element Doyle-Fuller-Newman (DFN) / pseudo-X-dimensional model using FEniCSx and multiphenicsx. Spatial thermal behavior and degradation extensions make it relevant to cell inhomogeneity studies.

This fills a coverage gap; it is not a newly released 2026 solver. The reviewed default-branch commit is dated 2024-06-19.

## Quickstart
The upstream instructions specify Python 3.11 and FEniCSx 0.7.0, but the linked multiphenicsx branch no longer exists. The Atlas tested Python 3.10.12 in the official FEniCSx 0.7.0 ARM64 image with a fixed compatible multiphenicsx commit. Use the [tested recipe](../REPRODUCTIONS/environments/cidemod/README.md). The selected `test_Chen_2020.py::TestP2D_Chen::test_dimensional` test passed; the complete quicktest suite was not run.

## Known limitations
Do not substitute current FEniCSx packages for the pinned stack without testing compatibility. Higher-dimensional examples additionally require Gmsh and native libraries. The repository license is AGPL v3 or later; the README's introductory "proprietary" wording is inconsistent with its explicit License section.

## References
Ciria Aylagas, Raul; Ganuza, Clara; Parra, Ruben; Yanez, Maria; Ayerbe, Elixabete. (2022). cideMOD: An Open Source Tool for Battery Cell Inhomogeneous Performance Understanding. Journal of The Electrochemical Society 169, 090528. [DOI](https://doi.org/10.1149/1945-7111/ac91fb). [Official citation](https://cidemod.readthedocs.io/en/latest/citing.html).

## Reproducibility
The Chen 2020 P2D 1C reference-comparison test passed locally, with finite output to the 2.5 V cutoff. See [record](../REPRODUCTIONS/cidemod.md) for exact scope, versions and errors; extensions remain unverified.
