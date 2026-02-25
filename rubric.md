# Review rubric

This repository aims for structured, comparable reviews rather than vague "good/bad" statements.

Each model page should cover at least:

## A. Model lineage
- DFN/P2D, SPM, SPMe
- Electrolyte dynamics: included or neglected?
- Solid diffusion treatment: full Fick, polynomial approximation, single-mode, quasi-steady, etc.

## B. Extensions
- Thermal coupling: 0D/1D/2D; temperature-dependent parameters?
- Degradation: SEI, lithium plating, LAM/LLI, cracking/stress, etc.

## C. Reproducibility
- **Reproduction status**: yes/no + date + environment
- Environment lock: requirements/conda/poetry/docker
- Minimal runnable example (script/notebook)
- Entry point(s) clearly stated
- Tests and/or CI

## D. Usability / engineering
- Documentation quality (README, tutorials, comments)
- Modularity and API design (how easy is it to swap submodels/parameters?)

## E. Who is it for?
- Teaching / paper reproduction
- Research extensions (adding physics)
- Engineering simulation / batch runs

## Optional grades (prefer 3 axes, no single overall score)
- Reproducibility: A/B/C
- Clarity: A/B/C
- Extensibility: A/B/C

### Suggested grading anchors (for objectivity)
- **A**: Strong evidence in repository + clearly documented runnable path + tests/CI or broad external validation.
- **B**: Good documentation and runnable path, but limited validation depth (or validated by author only).
- **C**: Incomplete run instructions, weak verification signals, or significant ambiguity for first-time users.

> Note: If you did not actually run the code, state "not reproduced".
> Note: "author-validated" is useful evidence but should usually be graded conservatively unless independently reproduced in this Atlas.
