FROM ubuntu:24.04

ENV DEBIAN_FRONTEND=noninteractive \
    MPLBACKEND=Agg

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        ca-certificates \
        octave \
        liboctave-dev \
        build-essential \
        gfortran \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /work

# Intended for lightweight MATLAB/Octave smoke entries such as:
# - dfn-scott-moura
# - fastdfn
# - spmet
#
# Mount the upstream repo at /work and run the documented Octave command from
# the matching REPRODUCTIONS/<slug>.md page.
