# Glossary (minimal)

A tiny vocabulary list to prevent “lost in symbols” problems.

## Model families
- **SPM** (Single Particle Model): each electrode represented by (typically) one representative particle; electrolyte dynamics usually neglected/simplified. Fast.
- **SPMe**: SPM + reduced electrolyte dynamics (concentration/potential). Better at higher C-rates.
- **DFN / P2D** (Doyle–Fuller–Newman): porous-electrode model with coupled solid + electrolyte transport. Strong physics baseline.

## Common experiment protocols
- **CC**: constant current
- **CV**: constant voltage
- **CCCV**: CC until voltage cutoff, then CV until current cutoff
- **GITT / HPPC**: standard diagnostic/pulse protocols (often used for parameter identification)

## Core electrochemical terms
- **SOC**: state of charge (often mapped to electrode stoichiometry)
- **Stoichiometry**: normalized lithium fraction in an electrode (often what OCV curves are defined over)
- **OCV**: open-circuit voltage (equilibrium potential difference)
- **Overpotential**: deviation from equilibrium due to kinetics/transport losses

## Aging / degradation
- **SEI**: solid–electrolyte interphase growth (consumes lithium, increases resistance)
- **LLI**: loss of lithium inventory
- **LAM**: loss of active material
- **Plating**: lithium metal deposition (often at low temperature/high charge rates)

## Practical pitfalls
- **Units**: C-rate vs A, mA/cm² vs A/m², mol/L vs mol/m³.
- **Sign convention**: charge/discharge current sign differs across codebases.
