# Reproductions

This directory records independent reproduction attempts for Atlas entries.

## Status labels
- `success`: the model ran in the reproduced environment and produced the expected core output.
- `partial`: the model environment was created, but the run only completed after minor compatibility fixes or with reduced scope.
- `blocked`: the run did not complete because of missing runtime, incompatible dependencies, or upstream issues.
- `unreproduced`: a final targeted attempt was made and the model still did not complete.

## Minimum evidence per attempt
- Date
- Upstream repository URL and commit
- Reproduction environment
- Install commands
- Run commands
- Outcome
- Output summary
- Blockers or deviations

## Path placeholders
- `<atlas-root>` means your checkout of this Atlas repository.
- `<atlas-root>/.upstream/<repo>` means an ignored upstream model clone used during reproduction.
- Commands are written as portable templates; replace placeholders with your own filesystem paths before running them.

## Index
- `SUMMARY.md`: high-level reproduction dashboard and recommended starting points.
- `COVERAGE.md`: full reproduction status matrix.
- `DEPENDENCIES.md`: software and dependency version matrix.
- `environments/`: Dockerfiles and environment files for selected successful reproduction paths.
- `PITFALLS.md`: cross-project reproduction pitfalls.
- `CODE_ISSUES.md`: likely upstream code issues versus environment-only blockers.
- `LOCAL_PATCHES.md`: reproduction source patches and shims used during reproduction.
