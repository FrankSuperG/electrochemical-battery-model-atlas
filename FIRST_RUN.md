# First run (beginner checklist)

The goal of this Zoo is to help you run a model and build intuition with a concrete workflow.

## 0) Pick a baseline (recommended)
If you are new, start with one of these:
- **CPG-SPMT** (Python): control-oriented SPM with thermal effects; straightforward setup for a first physics-based run
- **PyBaMM** (Python): widely used baseline framework (SPM/SPMe/DFN)

If your goal is **fast degradation simulation**:
- **SLIDE** (C++ core): SPM + thermal + degradation

## 1) Use a standard “hello world” experiment
To compare models meaningfully, use a simple standard run:
- Temperature: 25°C (or model default)
- Experiment: **1C constant-current discharge** to cutoff
- Outputs to record: `V(t)` and (if available) `T(t)`, `SOC(t)`

## 2) Record the three things that usually differ
When results disagree, it is almost always one of these:
1. **Parameter set** (OCV curve, diffusion, kinetics, conductivity, geometry)
2. **Initial condition** (initial SOC/stoichiometry/temperature)
3. **Experiment definition** (current sign convention, cutoff voltage, rest steps)

Write these down before you change anything.

## 3) Don’t modify equations on day 1
Recommended progression:
1. Run an upstream example unchanged
2. Change **one parameter** (e.g., exchange current scaling) and re-run
3. Change **one experiment knob** (e.g., C-rate) and re-run
4. Only then start modifying equations/solver

## 4) Where to go next
- Conceptual overview: [`MODEL_MAP.md`](MODEL_MAP.md)
- Step-by-step learning: [`LEARNING_PATH.md`](LEARNING_PATH.md)
- Pick a model page and follow its Quickstart: [`MODELS/`](MODELS/)
