# Learning path

This repository provides an onboarding path to help beginners and researchers understand and start using electrochemical battery models in the P2D/DFN family.

## Recommended order (pragmatic)
1. **SPM** (Single Particle Model)
2. **SPMe** (SPM with electrolyte)
3. **DFN/P2D** (Newman-type pseudo-2D / Doyle–Fuller–Newman)
4. Extensions: **thermal** → **degradation/aging** → **mechanics** (optional)

---

## 1) SPM — the fastest way to “get the idea”

### What it captures
- Solid-phase diffusion in representative particles (anode/cathode)
- Reaction kinetics at particle surfaces (e.g., Butler–Volmer)
- Terminal voltage composition (OCV + kinetic + ohmic terms; exact details vary)

### Key assumptions (typical)
- Electrolyte dynamics are neglected or heavily simplified
- Each electrode is represented by a single (or few) representative particle(s)
- Transport in the porous electrode is simplified

### When to use
- Control/estimation-oriented work where speed matters
- Rapid parameter sweeps, algorithm prototyping

### What to read/do next
- Read one SPM implementation page in this Atlas (start with **PyBaMM** and/or **CPG-SPMT**).
- If your goal is degradation simulation, also read **SLIDE** (SPM + thermal + degradation).
- Identify where the code computes:
  - solid diffusion update
  - surface concentration
  - terminal voltage

---

## 2) SPMe — electrolyte matters (often)

### What it adds vs SPM
- Electrolyte concentration and potential dynamics (often in 1D through cell thickness)

### Why it matters
- Better accuracy at higher C-rates, stronger concentration gradients
- More realistic polarization contributions and limitations

### When to use
- BMS research that needs a better physics trade-off than SPM
- Parameter identification where electrolyte effects matter

### What to read/do next
- Compare an SPMe entry to SPM:
  - what new state variables appear?
  - what new PDE/ODE blocks are introduced?

---

## 3) DFN/P2D — full coupled porous-electrode physics

### What it captures
- Solid diffusion in particles + electrolyte transport in porous electrodes
- Coupled reaction kinetics, charge conservation in solid/electrolyte
- A stronger physical baseline for validation and extension

### When to use
- High-fidelity simulation
- Validating reduced models
- Extending physics (thermal, aging, mechanics)

### What to read/do next
- Use **PyBaMM DFN** as a baseline and compare other DFN/P2D implementations in the Atlas.

---

## 4) Extensions

### Thermal coupling
- Adds temperature dynamics and temperature-dependent parameters.
- Often crucial for fast discharge/charge and realistic voltage/aging behavior.

### Degradation / aging
- Common mechanisms: SEI growth, lithium plating, LAM/LLI, particle cracking.
- Adds new state variables and often introduces identifiability challenges.

---

## Suggested reading (high level)
- Start with the staged reading roadmap in [`REFERENCES.md`](REFERENCES.md#beginner-reading-roadmap).
- If you only have time for one overview, read `ramadesigan2012systems`.
- For equations, read `doyle1993modeling` and `fuller1994simulation` after the Newman book chapters on porous electrodes.
- For reduced models, read `subramanian2007realtime` first, then `marquis2019spme`.
- For numerics and implementation, read `northrop2014efficient`, `guo2025comparative`, and then one software paper such as `sulzer2021pybamm`.
- For degradation, read `edge2021degradation` before diving into mechanism-specific papers such as `christensen2004sei`, `pinson2012sei`, `yang2017plating`, and `okane2022degradationmodel`.
