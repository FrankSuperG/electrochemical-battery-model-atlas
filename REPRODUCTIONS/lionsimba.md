# lionsimba

- Status: `success`
- Date: 2026-05-05
- Upstream repo: <https://github.com/lionsimbatoolbox/LIONSIMBA>
- Upstream commit: `4eb6435ac9ad4050b6e8cb6d06f729ae6b62b76e`
- Upstream checkout: `<atlas-root>/.upstream/lionsimbatoolbox__LIONSIMBA`

## Environment
- OS: Docker on macOS
- Runtime: Debian bookworm, Octave 7.3.0 on `linux/amd64`

## Run
```bash
# Prepare CasADi for Octave. Keep this under .envs/ or another ignored local path.
mkdir -p '<atlas-root>/.envs/lionsimba'
curl -L -o '<atlas-root>/.envs/lionsimba/casadi-3.7.2-linux64-octave7.3.0.zip' \
  https://github.com/casadi/casadi/releases/download/3.7.2/casadi-3.7.2-linux64-octave7.3.0.zip
unzip -q '<atlas-root>/.envs/lionsimba/casadi-3.7.2-linux64-octave7.3.0.zip' \
  -d '<atlas-root>/.envs/lionsimba/casadi-3.7.2-linux64-octave7.3.0'

# Build SUNDIALS 2.6.2 sundialsTB IDAS inside a Debian bookworm Octave 7.3 container,
# then run the official isothermal example script.
docker run --rm --platform linux/amd64 \
  -v '<atlas-root>':/work -w /work debian:bookworm bash -lc '
set -e
apt-get update >/tmp/apt-get-update.log
DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
  octave liboctave-dev build-essential ca-certificates gnuplot-nox fonts-freefont-otf >/tmp/apt-get-install.log
printf "y\nn\ny\nn\ny\n/work/.envs/lionsimba/sundials-install-octave-linux\n" | \
  octave --no-gui --quiet --eval "cd(\"/work/.envs/lionsimba/sundials-src/sundials-2.6.2/sundialsTB\"); install_STB"
cat > /tmp/run_lionsimba_iso.m <<OCTAVE
set(0, "defaultfigurevisible", "off");
graphics_toolkit("gnuplot");
addpath("/work/.envs/lionsimba/casadi-3.7.2-linux64-octave7.3.0");
addpath(genpath("/work/.envs/lionsimba/sundials-install-octave-linux/sundialsTB"));
cd("/work/.upstream/lionsimbatoolbox__LIONSIMBA");
addpath(genpath(pwd));
run("example_scripts/isothermal_simulations.m");
disp("LIONSIMBA_ISOTHERMAL_OK");
OCTAVE
LD_LIBRARY_PATH=/work/.envs/lionsimba/casadi-3.7.2-linux64-octave7.3.0:$LD_LIBRARY_PATH \
  octave --no-gui --quiet /tmp/run_lionsimba_iso.m
'
```

## Outcome
- Result: success
- Actual output:
  - dependency smoke check in the container printed `cos(x)`, `IDAInit=2`, `IDASolve=2`, `IDAFree=2`, and `idm=3`
  - the official `example_scripts/isothermal_simulations.m` ran three isothermal simulations and reached the cutoff voltage
  - final marker printed `LIONSIMBA_ISOTHERMAL_OK`
  - final command exit code was 0

## Notes
- Native MATLAB R2021b on this machine still cannot build `sundialsTB` because `mex` does not detect a supported Xcode/Clang compiler setup.
- Native Octave 11.1.0 can build SUNDIALS 2.6.2 `sundialsTB`, but the tested CasADi Octave binary fails there with a MEX SOVERSION compatibility error.
- Debian bookworm provides Octave 7.3.0, matching the CasADi `linux64-octave7.3.0` binary and giving a clean reproduction path.
