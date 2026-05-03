# References

This Atlas includes key representative papers related to P2D/DFN and its reduced/extended variants (SPM, SPMe, thermal coupling, degradation), plus application areas such as BMS state estimation.

## How references are used here
- Each model page may list relevant papers (original formulation, numerical methods, validation, etc.).
- A machine-readable BibTeX collection is kept in [`references.bib`](references.bib).
- DOI-backed entries in the project bibliography were checked against DOI/Crossref metadata; the two book entries were checked against ISBN/publisher metadata.

## Beginner reading roadmap

If you are new to electrochemical battery models, read in this order instead of trying to read every paper.

| Stage | Read first | Why |
| --- | --- | --- |
| 1. Big picture | [`ramadesigan2012systems`](#ref-ramadesigan2012systems) | Broad systems-engineering view of lithium-ion modelling, simulation, design, and control. |
| 2. Porous-electrode foundation | [`newman2004electrochemical`](#ref-newman2004electrochemical) | Background for transport, kinetics, and porous-electrode assumptions. |
| 3. DFN/P2D origin | [`doyle1993modeling`](#ref-doyle1993modeling), [`fuller1994simulation`](#ref-fuller1994simulation) | Canonical Doyle-Fuller-Newman formulation and full-cell simulation baseline. |
| 4. Reduced models | [`subramanian2007realtime`](#ref-subramanian2007realtime), [`marquis2019spme`](#ref-marquis2019spme) | How and why SPM/SPMe-style reductions are derived for faster simulation. |
| 5. Numerical implementation | [`northrop2014efficient`](#ref-northrop2014efficient), [`guo2025comparative`](#ref-guo2025comparative) | Why discretization, reformulation, and stiffness handling matter in practice. |
| 6. Software baselines | [`sulzer2021pybamm`](#ref-sulzer2021pybamm), [`torchio2016lionsimba`](#ref-torchio2016lionsimba) | Concrete open-source frameworks that connect equations to runnable code. |
| 7. Thermal coupling | [`bernardi1985energy`](#ref-bernardi1985energy), [`gu2000thermal`](#ref-gu2000thermal) | Heat generation and electrochemical-thermal coupling. |
| 8. Degradation | [`vetter2005ageing`](#ref-vetter2005ageing), [`edge2021degradation`](#ref-edge2021degradation), [`okane2022degradationmodel`](#ref-okane2022degradationmodel) | Mechanisms, degradation modes, and how to couple degradation physics in a model. |
| 9. BMS / estimation | [`plett2015bms`](#ref-plett2015bms), [`moura2017spme`](#ref-moura2017spme), [`guo2024systematic`](#ref-guo2024systematic) | How electrochemical models are used for state estimation and control. |

## Representative papers by topic

### Overview and model taxonomy
- **[Santhanagopalan, Guo, Ramadass, White (2006)](#ref-santhanagopalan2006cyclingreview)** — early review of lithium-ion cycling-performance models.
- **[Ramadesigan, Northrop, De, Santhanagopalan, Braatz, Subramanian (2012)](#ref-ramadesigan2012systems)** — systems-engineering review connecting model forms, simulation, design, and control.

### DFN / P2D foundations
- **[Newman, Thomas-Alyea (book)](#ref-newman2004electrochemical)** — *Electrochemical Systems*.
  - Why it matters: the transport/kinetics backbone behind most porous-electrode battery models.
- **[Doyle, Fuller, Newman (1993)](#ref-doyle1993modeling)** — original DFN-style porous-electrode Li-ion formulation.
- **[Fuller, Doyle, Newman (1994)](#ref-fuller1994simulation)** — canonical full-cell simulation and optimization follow-up.

### Reduced-order models: SPM / SPMe
- **[Subramanian, Boovaragavan, Diwakar (2007)](#ref-subramanian2007realtime)** — real-time simulation motivation for physics-based reduced models.
- **[Bizeray, Zhao, Duncan, Howey (2015)](#ref-bizeray2015spectral)** — spectral/orthogonal-collocation SPM lineage with estimation use.
- **[Marquis, Sulzer, Timms, Please, Chapman (2019)](#ref-marquis2019spme)** — asymptotic derivation of SPM/SPMe from DFN.
- **[Moura, Bribiesca Argomedo, Klein, Mirtabatabaei, Krstic (2017)](#ref-moura2017spme)** — SPMe for state estimation.

### Numerical methods and computational speed
- **[Northrop, Suthar, Ramadesigan, Santhanagopalan, Braatz, Subramanian (2014)](#ref-northrop2014efficient)** — efficient simulation/reformulation for embedded and electric-transportation use.
- **[Guo, Couto (2025)](#ref-guo2025comparative)** — comparative discretization study for electrochemical models.
- **[Ai, Liu (2023)](#ref-ai2023convergence), [Ai, Liu (2024)](#ref-ai2024sp2d)** — finite-element and simplified P2D directions connected to JuBat/sP2D.

### Software frameworks and public implementations
- **[Sulzer, Marquis, Timms, Robinson, Chapman (2021)](#ref-sulzer2021pybamm)** — PyBaMM software paper.
- **[Torchio, Magni, Gopaluni, Braatz, Raimondo (2016)](#ref-torchio2016lionsimba)** — LIONSIMBA finite-volume MATLAB framework.
- **[Berliner, Cogswell, Bazant, Braatz (2021)](#ref-petlion2021methods)** — PETLION.jl millisecond-scale porous-electrode simulation.
- **[Smith, Bazant (2017)](#ref-smith2017mpet)** — MPET multiphase porous-electrode theory.

### Thermal coupling
- **[Bernardi, Pawlikowski, Newman (1985)](#ref-bernardi1985energy)** — general battery energy balance and heat generation.
- **[Gu, Wang (2000)](#ref-gu2000thermal)** — electrochemical-thermal coupled modelling framework.

### Degradation and aging
- **[Vetter et al. (2005)](#ref-vetter2005ageing)** — classic degradation-mechanism review.
- **[Christensen, Newman (2004)](#ref-christensen2004sei)** — mechanistic SEI growth model.
- **[Pinson, Bazant (2013)](#ref-pinson2012sei)** — SEI theory, capacity fade, and lifetime scaling.
- **[Yang, Leng, Zhang, Ge, Wang (2017)](#ref-yang2017plating)** — lithium-plating induced aging and transition from linear to nonlinear aging.
- **[Reniers, Mulder, Howey (2019)](#ref-reniers2019review)** — mechanical-chemical degradation model comparison.
- **[Edge et al. (2021)](#ref-edge2021degradation)** — practical mechanism/mode map for lithium-ion degradation.
- **[O'Kane et al. (2022)](#ref-okane2022degradationmodel)** — coupled PyBaMM degradation model linking SEI, plating, cracking, and loss of active material.

### Parameter estimation, control, and BMS use
- **[Plett (book)](#ref-plett2015bms)** — practical battery modeling and BMS entry point.
- **[Miguel, Plett, Trimboli, Oca, Iraola, Bekaert (2021)](#ref-miguel2021review)** — computational parameter estimation review for electrochemical models.
- **[Guo et al. (2024)](#ref-guo2024systematic)** — systematic review of electrochemical model-based state estimation in BMS.

## Model-specific references

> This section mirrors the `## References` entries in each `MODELS/*.md` page and should be kept one-to-one aligned.

| Slug | Model | References |
| --- | --- | --- |
| [`batp2dfoam`](MODELS/batp2dfoam.md) | batP2dFoam | [`batp2dfoam2023`](#ref-batp2dfoam2023), [`doyle1993modeling`](#ref-doyle1993modeling), [`fuller1994simulation`](#ref-fuller1994simulation) |
| [`battmo`](MODELS/battmo.md) | BattMo | _(no model-specific primary reference listed in upstream docs)_ |
| [`battsimpy`](MODELS/battsimpy.md) | battsimpy | [`torchio2016lionsimba`](#ref-torchio2016lionsimba) |
| [`cpg-spmt`](MODELS/cpg-spmt.md) | CPG-SPMT | [`guo2026cpg`](#ref-guo2026cpg), [`guo2025control`](#ref-guo2025control), [`guo2025comparative`](#ref-guo2025comparative) |
| [`dfn-scott-moura`](MODELS/dfn-scott-moura.md) | dfn | _(no model-specific primary reference listed in upstream docs)_ |
| [`fastdfn`](MODELS/fastdfn.md) | fastDFN | _(no model-specific primary reference listed in upstream docs)_ |
| [`jubat`](MODELS/jubat.md) | JuBat | [`jubat2024softwarex`](#ref-jubat2024softwarex), [`ai2023convergence`](#ref-ai2023convergence), [`ai2024sp2d`](#ref-ai2024sp2d) |
| [`lionsimba`](MODELS/lionsimba.md) | LIONSIMBA | [`torchio2016lionsimba`](#ref-torchio2016lionsimba) |
| [`mpet`](MODELS/mpet.md) | MPET | [`smith2017mpet`](#ref-smith2017mpet) |
| [`p2d-li-ion-battery-decaluwe`](MODELS/p2d-li-ion-battery-decaluwe.md) | p2d_li_ion_battery | _(no model-specific primary reference listed in upstream docs)_ |
| [`p2d-model-dkong8s93`](MODELS/p2d-model-dkong8s93.md) | p2d-model | _(no model-specific primary reference listed in upstream docs)_ |
| [`p2d-solver-hanrach`](MODELS/p2d-solver-hanrach.md) | p2d_solver | [`torchio2016lionsimba`](#ref-torchio2016lionsimba) |
| [`petlion-jl`](MODELS/petlion-jl.md) | PETLION.jl | [`petlion2021methods`](#ref-petlion2021methods) |
| [`pseudo-sim-liuyang12`](MODELS/pseudo-sim-liuyang12.md) | Pseudo_sim | _(no model-specific primary reference listed in upstream docs)_ |
| [`pybamm`](MODELS/pybamm.md) | PyBaMM | [`sulzer2021pybamm`](#ref-sulzer2021pybamm), [`doyle1993modeling`](#ref-doyle1993modeling), [`fuller1994simulation`](#ref-fuller1994simulation) |
| [`slide`](MODELS/slide.md) | SLIDE | [`reniers2019review`](#ref-reniers2019review) |
| [`spectral-li-ion-spm`](MODELS/spectral-li-ion-spm.md) | Spectral_li-ion_SPM | [`bizeray2015spectral`](#ref-bizeray2015spectral) |
| [`spme-oed`](MODELS/spme-oed.md) | SPMe_OED | _(no model-specific primary reference listed in upstream docs)_ |
| [`spmet`](MODELS/spmet.md) | SPMeT | [`moura2017spme`](#ref-moura2017spme), [`perez2016spmet`](#ref-perez2016spmet) |


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
- [`edge2021degradation`](#ref-edge2021degradation)
- [`fuller1994simulation`](#ref-fuller1994simulation)
- [`gu2000thermal`](#ref-gu2000thermal)
- [`guo2024systematic`](#ref-guo2024systematic)
- [`guo2025comparative`](#ref-guo2025comparative)
- [`guo2025control`](#ref-guo2025control)
- [`guo2026cpg`](#ref-guo2026cpg)
- [`jubat2024softwarex`](#ref-jubat2024softwarex)
- [`marquis2019spme`](#ref-marquis2019spme)
- [`miguel2021review`](#ref-miguel2021review)
- [`moura2017spme`](#ref-moura2017spme)
- [`newman2004electrochemical`](#ref-newman2004electrochemical)
- [`northrop2014efficient`](#ref-northrop2014efficient)
- [`okane2022degradationmodel`](#ref-okane2022degradationmodel)
- [`perez2016spmet`](#ref-perez2016spmet)
- [`petlion2021methods`](#ref-petlion2021methods)
- [`pinson2012sei`](#ref-pinson2012sei)
- [`plett2015bms`](#ref-plett2015bms)
- [`ramadesigan2012systems`](#ref-ramadesigan2012systems)
- [`reniers2019review`](#ref-reniers2019review)
- [`santhanagopalan2006cyclingreview`](#ref-santhanagopalan2006cyclingreview)
- [`smith2017mpet`](#ref-smith2017mpet)
- [`subramanian2007realtime`](#ref-subramanian2007realtime)
- [`sulzer2021pybamm`](#ref-sulzer2021pybamm)
- [`torchio2016lionsimba`](#ref-torchio2016lionsimba)
- [`vetter2005ageing`](#ref-vetter2005ageing)
- [`yang2017plating`](#ref-yang2017plating)

### Unified citation entries

- <a id="ref-ai2023convergence"></a>`ai2023convergence` — Ai, Weilong and Liu, Yuan (2023). *Improving the convergence rate of Newman's battery model using 2nd order finite element method*. Journal of Energy Storage. DOI: [10.1016/j.est.2023.107512](https://doi.org/10.1016/j.est.2023.107512)
- <a id="ref-ai2024sp2d"></a>`ai2024sp2d` — Ai, Weilong and Liu, Yuan (2024). *sP2D: Simplified pseudo 2D battery model by piecewise sinusoidal/quadratic functions of potential curves*. Journal of Energy Storage. DOI: [10.1016/j.est.2024.111386](https://doi.org/10.1016/j.est.2024.111386)
- <a id="ref-arora1999lithium"></a>`arora1999lithium` — Arora, P. and Doyle, M. and White, R. E. (1999). *Mathematical modeling of the lithium deposition overcharge reaction in lithium-ion batteries using carbon-based negative electrodes*. Journal of The Electrochemical Society. DOI: [10.1149/1.1392512](https://doi.org/10.1149/1.1392512)
- <a id="ref-batp2dfoam2023"></a>`batp2dfoam2023` — Yin, Xiaoguang and Zhang, Dongxiao (2023). *batP2dFoam: An Efficient Segregated Solver for the Pseudo-2-Dimensional (P2D) Model of Li-Ion Batteries*. Journal of The Electrochemical Society. DOI: [10.1149/1945-7111/acbfe4](https://doi.org/10.1149/1945-7111/acbfe4)
- <a id="ref-bernardi1985energy"></a>`bernardi1985energy` — Bernardi, Domenico and Pawlikowski, Edward and Newman, John (1985). *A general energy balance for battery systems*. Journal of The Electrochemical Society. DOI: [10.1149/1.2113792](https://doi.org/10.1149/1.2113792)
- <a id="ref-bizeray2015spectral"></a>`bizeray2015spectral` — Bizeray, A. M. and Zhao, S. and Duncan, S. R. and Howey, D. A. (2015). *Lithium-ion battery thermal-electrochemical model-based state estimation using orthogonal collocation and a modified extended Kalman filter*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2015.07.019](https://doi.org/10.1016/j.jpowsour.2015.07.019)
- <a id="ref-christensen2004sei"></a>`christensen2004sei` — Christensen, John and Newman, John (2004). *A mathematical model for the lithium-ion negative electrode solid electrolyte interphase*. Journal of The Electrochemical Society. DOI: [10.1149/1.1804812](https://doi.org/10.1149/1.1804812)
- <a id="ref-doyle1993modeling"></a>`doyle1993modeling` — Doyle, Marc and Fuller, Thomas F. and Newman, John (1993). *Modeling of galvanostatic charge and discharge of the lithium/polymer/insertion cell*. Journal of The Electrochemical Society. DOI: [10.1149/1.2221597](https://doi.org/10.1149/1.2221597)
- <a id="ref-edge2021degradation"></a>`edge2021degradation` — Edge, Jacqueline S. and O'Kane, Simon and Prosser, Ryan and others (2021). *Lithium ion battery degradation: what you need to know*. Physical Chemistry Chemical Physics vol. 23(14) pp. 8200--8221. DOI: [10.1039/D1CP00359C](https://doi.org/10.1039/D1CP00359C)
- <a id="ref-fuller1994simulation"></a>`fuller1994simulation` — Fuller, Thomas F. and Doyle, Marc and Newman, John (1994). *Simulation and optimization of the dual lithium ion insertion cell*. Journal of The Electrochemical Society. DOI: [10.1149/1.2054684](https://doi.org/10.1149/1.2054684)
- <a id="ref-gu2000thermal"></a>`gu2000thermal` — Gu, W. B. and Wang, C. Y. (2000). *Thermal-electrochemical modeling of battery systems*. Journal of The Electrochemical Society vol. 147(8) pp. 2910--2922. DOI: [10.1149/1.1393625](https://doi.org/10.1149/1.1393625)
- <a id="ref-guo2024systematic"></a>`guo2024systematic` — Guo, Feng and Couto, Luis D. and Mulder, Grietus and Trad, Khiem and Hu, Guangdi and Capron, Odile and Haghverdi, Keivan (2024). *A systematic review of electrochemical model-based lithium-ion battery state estimation in battery management systems*. Journal of Energy Storage. DOI: [10.1016/j.est.2024.113850](https://doi.org/10.1016/j.est.2024.113850)
- <a id="ref-guo2025comparative"></a>`guo2025comparative` — Guo, Feng and Couto, Luis D. (2025). *Comparative performance analysis of numerical discretization methods for electrochemical model of lithium-ion batteries*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2025.237365](https://doi.org/10.1016/j.jpowsour.2025.237365)
- <a id="ref-guo2025control"></a>`guo2025control` — Guo, Feng and Couto, Luis D. (2025). *A control-oriented simplified Single Particle Model with grouped parameter and sensitivity analysis for lithium-ion batteries*. Journal of Power Sources. DOI: [10.1016/j.jpowsour.2025.237309](https://doi.org/10.1016/j.jpowsour.2025.237309)
- <a id="ref-guo2026cpg"></a>`guo2026cpg` — Guo, Feng and Couto, Luis D. (2026). *CPG-SPMT: Control-oriented parameter-grouped single particle model with thermal effects for Lithium-Ion batteries*. Computer Physics Communications vol. 322 pp. 110075. DOI: [10.1016/j.cpc.2026.110075](https://doi.org/10.1016/j.cpc.2026.110075)
- <a id="ref-jubat2024softwarex"></a>`jubat2024softwarex` — Ai, Weilong and Liu, Yuan (2024). *JuBat: A Julia-based framework for battery modelling using finite element method*. SoftwareX. DOI: [10.1016/j.softx.2024.101760](https://doi.org/10.1016/j.softx.2024.101760)
- <a id="ref-marquis2019spme"></a>`marquis2019spme` — Marquis, Scott G. and Sulzer, Valentin and Timms, Robert and Please, Colin P. and Chapman, S. Jon (2019). *An Asymptotic Derivation of a Single Particle Model with Electrolyte*. Journal of The Electrochemical Society vol. 166(15) pp. A3693--A3706. DOI: [10.1149/2.0341915jes](https://doi.org/10.1149/2.0341915jes)
- <a id="ref-miguel2021review"></a>`miguel2021review` — Miguel, Eduardo and Plett, Gregory L and Trimboli, M Scott and Oca, L and Iraola, U and Bekaert, E (2021). *Review of computational parameter estimation methods for electrochemical models*. Journal of Energy Storage. DOI: [10.1016/j.est.2021.103388](https://doi.org/10.1016/j.est.2021.103388)
- <a id="ref-moura2017spme"></a>`moura2017spme` — Moura, Scott J. and Bribiesca Argomedo, Federico and Klein, Reinhardt and Mirtabatabaei, Anahita and Krstic, Miroslav (2017). *Battery State Estimation for a Single Particle Model With Electrolyte Dynamics*. IEEE Transactions on Control Systems Technology. DOI: [10.1109/TCST.2016.2571663](https://doi.org/10.1109/TCST.2016.2571663)
- <a id="ref-newman2004electrochemical"></a>`newman2004electrochemical` — Newman, John and Thomas-Alyea, Karen E. (2004). *Electrochemical Systems*. Wiley-Interscience, 3rd edition. ISBN: 978-0-471-47756-3.
- <a id="ref-northrop2014efficient"></a>`northrop2014efficient` — Northrop, Paul W. C. and Suthar, Bharatkumar and Ramadesigan, Venkatasailanathan and Santhanagopalan, Shriram and Braatz, Richard D. and Subramanian, Venkat R. (2014). *Efficient Simulation and Reformulation of Lithium-Ion Battery Models for Enabling Electric Transportation*. Journal of The Electrochemical Society vol. 161(8) pp. E3149--E3157. DOI: [10.1149/2.018408jes](https://doi.org/10.1149/2.018408jes)
- <a id="ref-okane2022degradationmodel"></a>`okane2022degradationmodel` — O'Kane, Simon E. J. and Ai, Weilong and Madabattula, Ganesh and others (2022). *Lithium-ion battery degradation: how to model it*. Physical Chemistry Chemical Physics vol. 24(13) pp. 7909--7922. DOI: [10.1039/D2CP00417H](https://doi.org/10.1039/D2CP00417H)
- <a id="ref-perez2016spmet"></a>`perez2016spmet` — Perez, Hector E. and Hu, Xiaosong and Moura, Scott J. (2016). *Optimal charging of batteries via a single particle model with electrolyte and thermal dynamics*. 2016 American Control Conference (ACC), pp. 4000--4005. DOI: [10.1109/ACC.2016.7525538](https://doi.org/10.1109/ACC.2016.7525538)
- <a id="ref-petlion2021methods"></a>`petlion2021methods` — Berliner, Marc D. and Cogswell, Daniel A. and Bazant, Martin Z. and Braatz, Richard D. (2021). *Methods---PETLION: Open-Source Software for Millisecond-Scale Porous Electrode Theory-Based Lithium-Ion Battery Simulations*. Journal of The Electrochemical Society vol. 168(9) pp. 090504. DOI: [10.1149/1945-7111/ac201c](https://doi.org/10.1149/1945-7111/ac201c)
- <a id="ref-pinson2012sei"></a>`pinson2012sei` — Pinson, Matthew B. and Bazant, Martin Z. (2013). *Theory of SEI formation in rechargeable batteries: capacity fade, accelerated aging and lifetime prediction*. Journal of The Electrochemical Society. DOI: [10.1149/2.044302jes](https://doi.org/10.1149/2.044302jes)
- <a id="ref-plett2015bms"></a>`plett2015bms` — Plett, Gregory L. (2015). *Battery Management Systems, Volume I: Battery Modeling*. Artech House. ISBN: 978-1-63081-023-8.
- <a id="ref-ramadesigan2012systems"></a>`ramadesigan2012systems` — Ramadesigan, Venkatasailanathan and Northrop, Paul W. C. and De, Sumitava and Santhanagopalan, Shriram and Braatz, Richard D. and Subramanian, Venkat R. (2012). *Modeling and Simulation of Lithium-Ion Batteries from a Systems Engineering Perspective*. Journal of The Electrochemical Society vol. 159(3) pp. R31--R45. DOI: [10.1149/2.018203jes](https://doi.org/10.1149/2.018203jes)
- <a id="ref-reniers2019review"></a>`reniers2019review` — Reniers, J. M. and Mulder, G. and Howey, D. A. (2019). *Review and performance comparison of mechanical-chemical degradation models for lithium-ion batteries*. Journal of The Electrochemical Society. DOI: [10.1149/2.0281914jes](https://doi.org/10.1149/2.0281914jes)
- <a id="ref-santhanagopalan2006cyclingreview"></a>`santhanagopalan2006cyclingreview` — Santhanagopalan, Shriram and Guo, Qingzhi and Ramadass, Premanand and White, Ralph E. (2006). *Review of models for predicting the cycling performance of lithium ion batteries*. Journal of Power Sources vol. 156(2) pp. 620--628. DOI: [10.1016/j.jpowsour.2005.05.070](https://doi.org/10.1016/j.jpowsour.2005.05.070)
- <a id="ref-smith2017mpet"></a>`smith2017mpet` — Smith, Raymond B. and Bazant, Martin Z. (2017). *Multiphase Porous Electrode Theory*. Journal of The Electrochemical Society. DOI: [10.1149/2.0171711jes](https://doi.org/10.1149/2.0171711jes)
- <a id="ref-subramanian2007realtime"></a>`subramanian2007realtime` — Subramanian, Venkat R. and Boovaragavan, Vijayasekaran and Diwakar, Vinten D. (2007). *Toward Real-Time Simulation of Physics Based Lithium-Ion Battery Models*. Electrochemical and Solid-State Letters vol. 10(11) pp. A255--A260. DOI: [10.1149/1.2776128](https://doi.org/10.1149/1.2776128)
- <a id="ref-sulzer2021pybamm"></a>`sulzer2021pybamm` — Sulzer, Valentin and Marquis, Scott G. and Timms, Robert and Robinson, Martin and Chapman, S. Jon (2021). *Python Battery Mathematical Modelling (PyBaMM)*. Journal of Open Research Software. DOI: [10.5334/jors.309](https://doi.org/10.5334/jors.309)
- <a id="ref-torchio2016lionsimba"></a>`torchio2016lionsimba` — Torchio, Marcello and Magni, Lalo and Gopaluni, R. Bhushan and Braatz, Richard D. and Raimondo, Davide M. (2016). *LIONSIMBA: A Matlab Framework Based on a Finite Volume Model Suitable for Li-Ion Battery Design, Simulation, and Control*. Journal of The Electrochemical Society. DOI: [10.1149/2.0291607jes](https://doi.org/10.1149/2.0291607jes)
- <a id="ref-vetter2005ageing"></a>`vetter2005ageing` — Vetter, J. and Novak, P. and Wagner, Michael R. and others (2005). *Ageing mechanisms in lithium-ion batteries*. Journal of Power Sources vol. 147(1-2) pp. 269--281. DOI: [10.1016/j.jpowsour.2005.01.006](https://doi.org/10.1016/j.jpowsour.2005.01.006)
- <a id="ref-yang2017plating"></a>`yang2017plating` — Yang, Xiao-Guang and Leng, Yongjun and Zhang, Guangsheng and Ge, Shanhai and Wang, Chao-Yang (2017). *Modeling of lithium plating induced aging of lithium-ion batteries: Transition from linear to nonlinear aging*. Journal of Power Sources vol. 360 pp. 28--40. DOI: [10.1016/j.jpowsour.2017.05.110](https://doi.org/10.1016/j.jpowsour.2017.05.110)

<!-- BIB_KEY_INDEX_END -->
