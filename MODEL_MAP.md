# Model map (SPM → SPMe → DFN/P2D)

This page gives a quick conceptual map of the P2D/DFN model family and its reduced variants.

## Core blocks (conceptual)

### Solid phase (in active material particles)
- Solid lithium concentration: typically diffusion in spherical particles
- Surface concentration: drives equilibrium potential (OCV) and kinetics

### Electrolyte phase (in porous electrodes + separator)
- Electrolyte concentration and potential (omitted in SPM; included in SPMe/DFN)

### Interfacial kinetics
- Reaction current density (e.g., Butler–Volmer)
- Couples solid/electrolyte and determines overpotential

### Terminal voltage
Usually decomposed into:
- Open-circuit potential (from surface stoichiometry)
- Kinetic overpotential
- Ohmic drops (electrode + electrolyte)
- Additional terms depending on model assumptions

---

## What changes across families

### SPM
- Keeps: solid diffusion + interfacial kinetics (simplified)
- Often omits: electrolyte concentration/potential dynamics
- Best for: speed and control/estimation prototyping

### SPMe
- Adds: electrolyte concentration and potential dynamics (reduced vs DFN)
- Better at: capturing electrolyte polarization at higher C-rates

### DFN/P2D
- Full coupled porous-electrode model
- Baseline for: validation and multiphysics extensions

---

## Extensions (where they hook in)

### Thermal
- Adds temperature state(s) and modifies parameters in:
  - diffusion coefficients
  - reaction rates
  - conductivity
  - OCV (sometimes)

### Degradation / aging
- Adds side reactions or evolving parameters/states:
  - SEI growth (consumes lithium, adds resistance)
  - lithium plating
  - loss of active material (LAM)
  - loss of lithium inventory (LLI)

---

## How to use this Atlas with the map
- Start with a framework entry (e.g., PyBaMM) to establish a baseline.
- For each repository entry, identify:
  1) which blocks are included/omitted
  2) how diffusion is treated
  3) whether electrolyte dynamics are modeled
  4) what extensions are included
