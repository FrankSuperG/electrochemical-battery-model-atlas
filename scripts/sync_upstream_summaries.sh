#!/usr/bin/env bash
set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
UP="$BASE/.upstream"
mkdir -p "$UP"

repos=(
  "FrankSuperG/CPG-SPMT"
  "pybamm-team/PyBaMM"
  "BattMoTeam/BattMo"
  "decaluwe/p2d_li_ion_battery"
  "hanrach/p2d_solver"
  "dkong8s93/p2d-model"
  "liuyang12/Pseudo_sim"
  "weilongai/JuBat"
  "redyxg/batP2dFoam"
  "matthewpklein/battsimpy"
  "davidhowey/Spectral_li-ion_SPM"
  "tcoonsUM/SPMe_OED"
  "Battery-Intelligence-Lab/SLIDE"
)

for r in "${repos[@]}"; do
  dir="$UP/${r//\//__}"
  if [ -d "$dir/.git" ]; then
    echo "== update $r"
    git -C "$dir" fetch --depth 1 origin || true
    # reset to default branch HEAD if possible
    git -C "$dir" reset --hard FETCH_HEAD >/dev/null 2>&1 || true
  else
    echo "== clone $r"
    git clone --depth 1 "https://github.com/$r.git" "$dir" >/dev/null 2>&1 || {
      echo "WARN: failed to clone $r"; continue;
    }
  fi

done
