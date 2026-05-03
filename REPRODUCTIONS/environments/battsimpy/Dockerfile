FROM --platform=linux/amd64 mambaorg/micromamba:1.5.10

USER root

ENV MAMBA_ROOT_PREFIX=/opt/conda \
    MAMBA_DOCKERFILE_ACTIVATE=1 \
    MPLBACKEND=Agg

RUN apt-get update \
    && apt-get install -y --no-install-recommends libx11-6 \
    && rm -rf /var/lib/apt/lists/*

RUN micromamba create -y -n bspy -c chria -c conda-forge \
      python=2.7 \
      assimulo=2.9 \
      numpy \
      scipy \
      matplotlib \
    && micromamba clean -a -y

SHELL ["micromamba", "run", "-n", "bspy", "/bin/bash", "-lc"]
WORKDIR /work

# Mount or copy the upstream battsimpy repo at /work, then run from /work/battsimpy:
#   python testdriver.py /work/ model_lfp_fvmP2D.conf sim_CC.conf
