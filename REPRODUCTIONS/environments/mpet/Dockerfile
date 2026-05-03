FROM --platform=linux/amd64 python:3.12-bookworm

ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    QT_QPA_PLATFORM=offscreen \
    MPLBACKEND=Agg

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libgfortran5 \
        libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --progress-bar off \
      https://sourceforge.net/projects/daetools/files/daetools/2.3.0/daetools-2.3.0-gnu_linux-x86_64.zip \
      PyQt5

WORKDIR /work

# Mount or copy the upstream MPET repo at /work, then run:
#   pip install --progress-bar off .[test]
#   PYTHONPATH=. python bin/run_tests.py --test_dir tests --output_dir /tmp/mpet-test-out test001
