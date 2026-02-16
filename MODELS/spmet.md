# SPMeT

- Repo: <https://github.com/scott-moura/SPMeT>
- License: GPL-3.0
- Language/Framework: MATLAB

## Model lineage
- Family: SPMe (Single Particle Model with electrolyte)
- Positioning: SPMe with temperature coupling for electrochemical-thermal battery modeling

## Extensions (if any)
- Thermal: yes
- Degradation: not primary in base repository positioning

## Reproducibility
- Not reproduced in this Zoo yet (summary based on upstream repository/docs).

### Quickstart
- Clone: `git clone https://github.com/scott-moura/SPMeT.git`
- Run MATLAB example scripts in repository root (per README guidance)

### Entry point(s)
- Root MATLAB scripts for simulations
- Core SPMe + thermal equations in `.m` model files

### Beginner notes
- SPMeT is a strong midpoint between SPM speed and DFN fidelity when electrolyte + temperature are important.
- Verify SOC/temperature initialization carefully before parameter fitting or estimation tasks.

## Strengths
- Practical balance: richer physics than SPM, cheaper than full DFN
- Useful for control/estimation workflows needing thermal dynamics

## Known limitations
- GPL license may be restrictive for some commercial workflows
- MATLAB-centric setup

## Who is it for?
- Users doing SPMe-class simulation, estimation, and control with thermal effects

## References
- Moura, Scott J., Bribiesca Argomedo, Fernando, Klein, Richard, Mirtabatabaei, Alireza, Krstic, Miroslav. “Battery State Estimation for a Single Particle Model With Electrolyte Dynamics.” IEEE Transactions on Control Systems Technology vol. 25(2) pp. 453--468 2017. DOI: 10.1109/TCST.2016.2571663
- Perez, Hector E., Hu, Xiaosong, Moura, Scott J.. “Optimal charging of batteries via a single particle model with electrolyte and thermal dynamics.” 2016 American Control Conference (ACC) pp. 4001--4008 2016. DOI: 10.1109/ACC.2016.7525538

## Optional grades
- Reproducibility: B
- Clarity: B
- Extensibility: B
