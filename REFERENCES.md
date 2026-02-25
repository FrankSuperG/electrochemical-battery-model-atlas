# References

This Atlas includes key representative papers related to P2D/DFN and its reduced/extended variants (SPM, SPMe, thermal coupling, degradation), plus application areas such as BMS state estimation.

## How references are used here
- Each model page may list relevant papers (original formulation, numerical methods, validation, etc.).
- A machine-readable BibTeX collection is kept in [`references.bib`](references.bib).

## Canonical / foundational papers
### DFN / P2D (Newman-type)
- **Doyle, Fuller, Newman (1993)** — *Modeling of Galvanostatic Charge and Discharge of the Lithium/Polymer/Insertion Cell* (J. Electrochem. Soc.).
  - Why it’s essential: the original DFN-style porous-electrode Li-ion formulation most later P2D/DFN codes build on.
- **Fuller, Doyle, Newman (1994)** — *Simulation and Optimization of the Dual Lithium Ion Insertion Cell* (J. Electrochem. Soc.).
  - Why it’s essential: a canonical “full cell” follow-up that many implementations use as a baseline reference.

### Porous-electrode theory (background)
- **Newman, Thomas-Alyea (book)** — *Electrochemical Systems* (Wiley).
  - Why it’s essential: the cleanest single reference for the transport/kinetics assumptions behind porous-electrode battery models.

### Reduced-order models (SPM / SPMe)
- **Subramanian, Diwakar, Tapriyal (2007)** — *Toward real-time simulation of physics based lithium-ion battery models* (Electrochem. Solid-State Lett.).
  - Why it’s essential: a classic bridge from DFN physics to reduced/fast models and implementation choices.
- **Bizeray, Zhao, Duncan, Howey (2015)** — spectral/collocation SPM lineage.
  - Why it’s essential: shows how to make SPMs fast and numerically stable using spectral/orthogonal collocation methods.

### Thermal modeling (widely cited)
- **Bernardi, Pawlikowski, Newman (1985)** — *A general energy balance for battery systems* (J. Electrochem. Soc.).
  - Why it’s essential: the foundational energy-balance/heat-generation framework used by many battery thermal models.

### Degradation / SEI (widely cited)
- **Christensen, Newman (2004)** — SEI growth modeling for lithium-ion cells (J. Electrochem. Soc.).
  - Why it’s essential: an early, widely cited mechanistic SEI model that influenced many later aging formulations.
- **Pinson, Bazant (2012)** — *Theory of SEI formation in rechargeable batteries: capacity fade, accelerated aging and lifetime prediction* (J. Electrochem. Soc.).
  - Why it’s essential: a compact theoretical framework that links SEI growth to capacity fade and lifetime scaling laws.

### DFN/P2D “classic” lithium-ion implementations
- **Arora, Doyle, White (1999)** — lithium deposition/overcharge modeling (J. Electrochem. Soc.).
  - Why it’s essential: a classic reference for side-reaction/plating-style extensions in DFN-era modeling.

### Electrolyte transport / concentrated-solution theory (background)
- **Newman (concentrated-solution / Stefan–Maxwell tradition)**
  - Why it’s essential: most DFN/P2D electrolyte equations assume concentrated-solution transport; you’ll keep seeing these forms.

### BMS / state estimation (electrochemical models)
- **Plett (book)** — *Battery Management Systems, Volume I: Battery Modeling* (Artech House).
  - Why it’s essential: a practical, estimation-oriented entry point that connects models to real BMS workflows.

> Notes:
> - The list above aims to be “newcomer essential” and high-impact.
> - Where exact citation metadata differs by edition/venue, PRs that refine BibTeX fields (volume/pages/DOI) are welcome.

## Numerical methods / discretization
- **Guo, Couto (2025)** — *Comparative performance analysis of numerical discretization methods for electrochemical model of lithium-ion batteries* (Journal of Power Sources).
  - Why it’s essential: discretization choices can dominate accuracy/runtime; this gives a concrete comparison mindset.

## Parameter estimation (electrochemical models)
- **Miguel, Plett, Trimboli, Oca, Iraola, Bekaert (2021)** — *Review of computational parameter estimation methods for electrochemical models* (Journal of Energy Storage).
  - Why it’s essential: a focused entry point on parameter estimation workflows for physics-based (electrochemical) models.

## BMS / state estimation
- **Guo, Couto, Mulder, Trad, Hu, Capron, Haghverdi (2024)** — *A systematic review of electrochemical model-based lithium-ion battery state estimation in battery management systems* (Journal of Energy Storage).
  - Why it’s essential: a modern map of how electrochemical models are actually used (and what’s hard) in estimation pipelines.

## Model-specific references

> This section is generated from the `## References` entries in each `MODELS/*.md` page and kept one-to-one aligned.

- **batP2dFoam** — [`batp2dfoam2023`](#ref-batp2dfoam2023), [`doyle1993modeling`](#ref-doyle1993modeling), [`fuller1994simulation`](#ref-fuller1994simulation)
- **BattMo** — _(no model-specific primary reference listed in upstream docs)_
- **battsimpy** — [`torchio2016lionsimba`](#ref-torchio2016lionsimba)
- **CPG-SPMT** — [`guo2025cpg`](#ref-guo2025cpg), [`guo2025control`](#ref-guo2025control), [`guo2025comparative`](#ref-guo2025comparative)
- **dfn (scott-moura)** — _(no model-specific primary reference listed in upstream docs)_
- **fastDFN** — _(no model-specific primary reference listed in upstream docs)_
- **JuBat** — [`jubat2024softwarex`](#ref-jubat2024softwarex), [`ai2023convergence`](#ref-ai2023convergence), [`ai2024sp2d`](#ref-ai2024sp2d)
- **LIONSIMBA** — [`torchio2016lionsimba`](#ref-torchio2016lionsimba)
- **MPET** — [`smith2017mpet`](#ref-smith2017mpet)
- **p2d_li_ion_battery (decaluwe)** — _(no model-specific primary reference listed in upstream docs)_
- **p2d-model (dkong8s93)** — _(no model-specific primary reference listed in upstream docs)_
- **p2d_solver (hanrach)** — [`torchio2016lionsimba`](#ref-torchio2016lionsimba)
- **PETLION.jl** — [`petlion2021methods`](#ref-petlion2021methods)
- **Pseudo_sim (liuyang12)** — _(no model-specific primary reference listed in upstream docs)_
- **PyBaMM** — [`sulzer2021pybamm`](#ref-sulzer2021pybamm), [`doyle1993modeling`](#ref-doyle1993modeling), [`fuller1994simulation`](#ref-fuller1994simulation)
- **SLIDE** — [`reniers2019review`](#ref-reniers2019review)
- **Spectral_li-ion_SPM** — [`bizeray2015spectral`](#ref-bizeray2015spectral)
- **SPMe_OED** — _(no model-specific primary reference listed in upstream docs)_
- **SPMeT** — [`moura2017spme`](#ref-moura2017spme), [`perez2016spmet`](#ref-perez2016spmet)


## BibTeX key index (clickable, canonical)

Use these keys in model pages. Click a key to jump to its unified citation entry.

<!-- BIB_KEY_INDEX_START -->

- [`ai2023convergence`](#ref-ai2023convergence)
- [`ai2024sp2d`](#ref-ai2024sp2d)
- [`arora1999lithium`](#ref-arora1999lithium)
- [`batp2dfoam2023`](#ref-batp2dfoam2023)
- [`bernardi1985energy`](#ref-bernardi1985energy)
- [`bizeray2015spectral`](#ref-bizeray2015spectral)
- [`christensen2004sei`](#ref-christensen2004sei)
- [`doyle1993modeling`](#ref-doyle1993modeling)
- [`fuller1994simulation`](#ref-fuller1994simulation)
- [`guo2024systematic`](#ref-guo2024systematic)
- [`guo2025comparative`](#ref-guo2025comparative)
- [`guo2025control`](#ref-guo2025control)
- [`guo2025cpg`](#ref-guo2025cpg)
- [`jubat2024softwarex`](#ref-jubat2024softwarex)
- [`miguel2021review`](#ref-miguel2021review)
- [`moura2017spme`](#ref-moura2017spme)
- [`newman2004electrochemical`](#ref-newman2004electrochemical)
- [`perez2016spmet`](#ref-perez2016spmet)
- [`petlion2021methods`](#ref-petlion2021methods)
- [`pinson2012sei`](#ref-pinson2012sei)
- [`plett2015bms`](#ref-plett2015bms)
- [`reniers2019review`](#ref-reniers2019review)
- [`smith2017mpet`](#ref-smith2017mpet)
- [`subramanian2007realtime`](#ref-subramanian2007realtime)
- [`sulzer2021pybamm`](#ref-sulzer2021pybamm)
- [`torchio2016lionsimba`](#ref-torchio2016lionsimba)

### Unified citation entries

- <a id="ref-ai2023convergence"></a>`ai2023convergence` — Ai, Weilong and Liu, Yuxi (2023). *Improving the convergence rate of Newman's battery model using 2nd order finite element method*. Journal of Energy Storage. DOI: [10.1016/j.est.2023.107512](https://doi.org/10.1016/j.est.2023.107512)
- <a id="ref-ai2024sp2d"></a>`ai2024sp2d` — Ai, Weilong and Liu, Yuxi (2024). *sP2D: Simplified pseudo 2D battery model by piecewise sinusoidal/quadratic functions of potential curves*. Journal of Energy Storage. DOI: [10.1016/j.est.2024.111386](https://doi.org/10.1016/j.est.2024.111386)
- <a id="ref-arora1999lithium"></a>`arora1999lithium` — Arora, P. and Doyle, M. and White, R. E. (1999). *Mathematical modeling of the lithium deposition overcharge reaction in lithium-ion batteries using carbon-based negative electrodes*. Journal of The Electrochemical Society. DOI: [10.1149/1.1392512](https://doi.org/10.1149/1.1392512)
- <a id="ref-batp2dfoam2023"></a>`batp2dfoam2023` — Yin, Xiaoguang and Zhang, Dongxiao (2023). *batP2dFoam: An Efficient Segregated Solver for the Pseudo-2-Dimensional (P2D) Model of Li-Ion Batteries*. Journal of The Electrochemical Society. DOI: [10.1149/1945-7111/acbfe4](https://doi.org/10.1149/1945-7111/acbfe4)
- <a id="ref-bernardi1985energy"></a>`bernardi1985energy` — Bernardi, Domenico and Pawlikowski, Edward and Newman, John (1985). *A general energy balance for battery systems*. Journal of The Electrochemical Society. DOI: [10.1149/1.2113792](https://doi.org/10.1149/1.2113792)
- <a id="ref-bizeray2015spectral"></a>`bizeray2015spectral` — Bizeray, A. M. and Zhao, S. and Duncan, S. R. and Howey, D. A. (2015). *Lithium-ion battery thermal-electrochemical model-based state estimation using orthogonal collocation and a modified extended Kalman filter*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2015.07.019](https://doi.org/10.1016/j.jpowsour.2015.07.019)
- <a id="ref-christensen2004sei"></a>`christensen2004sei` — Christensen, John and Newman, John (2004). *A mathematical model for the lithium-ion negative electrode solid electrolyte interphase*. Journal of The Electrochemical Society. DOI: [10.1149/1.1804812](https://doi.org/10.1149/1.1804812)
- <a id="ref-doyle1993modeling"></a>`doyle1993modeling` — Doyle, Marc and Fuller, Thomas F. and Newman, John (1993). *Modeling of galvanostatic charge and discharge of the lithium/polymer/insertion cell*. Journal of The Electrochemical Society. DOI: [10.1149/1.2221597](https://doi.org/10.1149/1.2221597)
- <a id="ref-fuller1994simulation"></a>`fuller1994simulation` — Fuller, Thomas F. and Doyle, Marc and Newman, John (1994). *Simulation and optimization of the dual lithium ion insertion cell*. Journal of The Electrochemical Society. DOI: [10.1149/1.2054684](https://doi.org/10.1149/1.2054684)
- <a id="ref-guo2024systematic"></a>`guo2024systematic` — Guo, Feng and Couto, Luis D. and Mulder, Grietus and Trad, Khiem and Hu, Guangdi and Capron, Odile and Haghverdi, Keivan (2024). *A systematic review of electrochemical model-based lithium-ion battery state estimation in battery management systems*. Journal of Energy Storage. DOI: [10.1016/j.est.2024.113850](https://doi.org/10.1016/j.est.2024.113850)
- <a id="ref-guo2025comparative"></a>`guo2025comparative` — Guo, Feng and Couto, Luis D. (2025). *Comparative performance analysis of numerical discretization methods for electrochemical model of lithium-ion batteries*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2025.237365](https://doi.org/10.1016/j.jpowsour.2025.237365)
- <a id="ref-guo2025control"></a>`guo2025control` — Guo, Feng and Couto, Luis D. (2025). *A control-oriented simplified Single Particle Model with grouped parameter and sensitivity analysis for lithium-ion batteries*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2025.237309](https://doi.org/10.1016/j.jpowsour.2025.237309)
- <a id="ref-guo2025cpg"></a>`guo2025cpg` — Guo, Feng and Couto, Luis D. (2026). *Cpg-spmt: Control-oriented parameter-grouped single particle model with thermal effects for lithium-ion batteries*. Computer Physics Communications. DOI: [10.1016/j.cpc.2026.110075](https://doi.org/10.1016/j.cpc.2026.110075)
- <a id="ref-jubat2024softwarex"></a>`jubat2024softwarex` — Ai, Weilong and Liu, Yuxi (2024). *JuBat: A Julia-based framework for battery modelling using finite element method*. SoftwareX. DOI: [10.1016/j.softx.2024.101760](https://doi.org/10.1016/j.softx.2024.101760)
- <a id="ref-miguel2021review"></a>`miguel2021review` — Miguel, Eduardo and Plett, Gregory L and Trimboli, M Scott and Oca, L and Iraola, U and Bekaert, E (2021). *Review of computational parameter estimation methods for electrochemical models*. Journal of Energy Storage. DOI: [10.1016/j.est.2021.103388](https://doi.org/10.1016/j.est.2021.103388)
- <a id="ref-moura2017spme"></a>`moura2017spme` — Moura, Scott J. and Bribiesca Argomedo, Fernando and Klein, Richard and Mirtabatabaei, Alireza and Krstic, Miroslav (2017). *Battery State Estimation for a Single Particle Model With Electrolyte Dynamics*. IEEE Transactions on Control Systems Technology. DOI: [10.1109/TCST.2016.2571663](https://doi.org/10.1109/TCST.2016.2571663)
- <a id="ref-newman2004electrochemical"></a>`newman2004electrochemical` — Newman, John and Thomas-Alyea, Karen E. (2004). *Electrochemical Systems*. Unknown venue.
- <a id="ref-perez2016spmet"></a>`perez2016spmet` — Perez, Hector E. and Hu, Xiaosong and Moura, Scott J. (2016). *Optimal charging of batteries via a single particle model with electrolyte and thermal dynamics*. 2016 American Control Conference (ACC). DOI: [10.1109/ACC.2016.7525538](https://doi.org/10.1109/ACC.2016.7525538)
- <a id="ref-petlion2021methods"></a>`petlion2021methods` — Berliner, Marc D. and Canty, Richard B. and others (2021). *Methods---PETLION: Open-Source Software for Millisecond-Scale Porous Electrode Theory-Based Lithium-Ion Battery Simulations*. Journal of The Electrochemical Society. DOI: [10.1149/1945-7111/ac201c](https://doi.org/10.1149/1945-7111/ac201c)
- <a id="ref-pinson2012sei"></a>`pinson2012sei` — Pinson, Matthew B. and Bazant, Martin Z. (2013). *Theory of SEI formation in rechargeable batteries: capacity fade, accelerated aging and lifetime prediction*. Journal of The Electrochemical Society. DOI: [10.1149/2.044302jes](https://doi.org/10.1149/2.044302jes)
- <a id="ref-plett2015bms"></a>`plett2015bms` — Plett, Gregory L. (2015). *Battery Management Systems, Volume I: Battery Modeling*. Unknown venue.
- <a id="ref-reniers2019review"></a>`reniers2019review` — Reniers, J. M. and Mulder, G. and Howey, D. A. (2019). *Review and performance comparison of mechanical-chemical degradation models for lithium-ion batteries*. Journal of The Electrochemical Society. DOI: [10.1149/2.0281914jes](https://doi.org/10.1149/2.0281914jes)
- <a id="ref-smith2017mpet"></a>`smith2017mpet` — Smith, Raymond B. and Bazant, Martin Z. (2017). *Multiphase Porous Electrode Theory*. Journal of The Electrochemical Society. DOI: [10.1149/2.0171711jes](https://doi.org/10.1149/2.0171711jes)
- <a id="ref-subramanian2007realtime"></a>`subramanian2007realtime` — Subramanian, Venkat R. and Diwakar, Vikram and Tapriyal, Deepak (2007). *Toward real-time simulation of physics based lithium-ion battery models*. Electrochemical and Solid-State Letters. DOI: [10.1149/1.2776128](https://doi.org/10.1149/1.2776128)
- <a id="ref-sulzer2021pybamm"></a>`sulzer2021pybamm` — Sulzer, Valentin and Marquis, Scott G. and Timms, Robert and Robinson, Mathew and Chapman, S. Jon (2021). *Python Battery Mathematical Modelling (PyBaMM)*. Journal of Open Research Software. DOI: [10.5334/jors.309](https://doi.org/10.5334/jors.309)
- <a id="ref-torchio2016lionsimba"></a>`torchio2016lionsimba` — Torchio, Marcello and Magni, Lalo and Gopaluni, R. Bhushan and Braatz, Richard D. and Raimondo, Davide M. (2016). *LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control*. Journal of The Electrochemical Society. DOI: [10.1149/2.0291607jes](https://doi.org/10.1149/2.0291607jes)

<!-- BIB_KEY_INDEX_END -->