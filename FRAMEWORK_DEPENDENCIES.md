# Framework Dependencies

This page separates independent model implementations from entries that reuse a larger framework such as PyBaMM.

## PyBaMM-Related Entries

| Entry | Classification | What this means |
| --- | --- | --- |
| `pybamm` | Primary framework | PyBaMM is the framework entry itself. It directly provides SPM, SPMe, DFN, thermal, degradation, discretisation, and solver APIs. |
| `spme-oed` | PyBaMM-backed workflow | SPMe_OED calls `pybamm.lithium_ion.SPMe()` and `pybamm.Simulation`; the Atlas should treat it as an OED workflow around PyBaMM, not as an independent SPMe discretisation. |
| `battmo` | Independent core; PyBaMM comparison only | BattMo's core battery examples are MATLAB/MRST-based. PyBaMM appears in comparison/loading helper scripts only. |
| `slide` | Independent core; PyBaMM comparison only | SLIDE's core simulator is C++. PyBaMM appears in Python benchmark scripts only. |

## Curation Rule

Keep PyBaMM itself as the main framework entry. Keep PyBaMM-backed workflows as separate Atlas entries only when they add something materially different, such as optimal experimental design, parameter estimation, a dataset/protocol, or a reproducible research workflow.

Do not count a PyBaMM-backed workflow as an independent PDE discretisation unless it implements its own spatial discretisation or time-integration stack outside PyBaMM.
