FROM ghcr.io/fenics/dolfinx/dolfinx:v0.7.0@sha256:f930327065c4c21e4217cbc74526a986211d7d94b88b46418bc44eccd7ae0772
RUN python3 -m pip install "numpy<2" cppimport "pybind11<3" && \
    python3 -m pip install --no-deps "git+https://github.com/multiphenics/multiphenicsx.git@341d6017993c6c7748693aeb700282fd955541c0"
RUN git clone https://github.com/cidetec-energy-storage/cideMOD.git /work && \
    git -C /work checkout f3a834403d9b110c2c75ba69f0f42b8f6e6b8aaf && \
    python3 -m pip install /work "numpy<2"
COPY smoke.py /work/tests/atlas_smoke.py
WORKDIR /work/tests
CMD ["timeout", "300", "python3", "-u", "atlas_smoke.py"]
