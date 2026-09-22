FROM ghcr.io/fenics/dolfinx/dolfinx:v0.7.0@sha256:f930327065c4c21e4217cbc74526a986211d7d94b88b46418bc44eccd7ae0772
# Reuse PETSc from the image; DiffLiB does not use the dolfinx solver.
RUN python3 -m pip uninstall -y fenics-dolfinx fenics-ffcx fenics-ufl numba && \
    python3 -m pip install numpy==1.26.4 scipy==1.11.3 "jax[cpu]==0.4.38" \
        ml_dtypes==0.5.4 fenics-basix==0.9.0 meshio==5.3.5 pyfiglet==1.0.4 tqdm==4.70.1 && \
    python3 -m pip install --no-deps "git+https://github.com/deepmodeling/jax-fem.git@72846d64a5c2359390b071e2b8101b0adc05e330"
RUN git clone https://github.com/CMSL-HKUST/DiffLiB.git /work && \
    git -C /work checkout 1df25de5acd58da8f17839239cb5da3aa6c2706a && \
    python3 -m pip install /work && python3 -m pip check
COPY smoke.py /work/atlas_smoke.py
WORKDIR /work
ENV OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1
CMD ["timeout", "900", "python3", "-u", "atlas_smoke.py", "/inputs/marquis2019.json"]
