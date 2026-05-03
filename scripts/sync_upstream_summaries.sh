#!/usr/bin/env bash
set -euo pipefail

BASE="$(cd "$(dirname "$0")/.." && pwd)"
UP="$BASE/.upstream"
mkdir -p "$UP"

repos=()
while IFS= read -r repo; do
  repos+=("$repo")
done < <(
  awk '/^  url: https:\/\/github.com\// {
    repo=$2
    sub(/^https:\/\/github.com\//, "", repo)
    sub(/\.git$/, "", repo)
    print repo
  }' "$BASE/data/models.yaml"
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
