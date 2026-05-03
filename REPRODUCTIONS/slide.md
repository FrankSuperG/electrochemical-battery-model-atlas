# slide

- Status: `success`
- Date: 2026-05-02
- Evidence level: `independent-local`
- Upstream repo: <https://github.com/Battery-Intelligence-Lab/SLIDE>
- Upstream commit: `847fec7aaeaefb916c51e5264aa8aa0dcfe72b20`
- Local path: `/Users/frank/Documents/New project/.upstream/Battery-Intelligence-Lab__SLIDE`

## Environment
- OS: macOS, Darwin 25.1.0
- Compiler: AppleClang 17.0.0
- Build tools: CMake 4.3.2 and Ninja 1.13.2 from local conda environment `.envs/slide-build`
- Environment recipe: [`environments/slide/environment.yml`](environments/slide/environment.yml)

## Install
```bash
/Users/frank/opt/anaconda3/bin/conda create -y \
  -p /Users/frank/Documents/New\ project/.envs/slide-build \
  -c conda-forge cmake ninja
```

## Build
```bash
/Users/frank/Documents/New\ project/.envs/slide-build/bin/cmake \
  -S /Users/frank/Documents/New\ project/.upstream/Battery-Intelligence-Lab__SLIDE \
  -B /Users/frank/Documents/New\ project/.upstream/Battery-Intelligence-Lab__SLIDE/build-codex \
  -G Ninja \
  -DCMAKE_MAKE_PROGRAM=/Users/frank/Documents/New\ project/.envs/slide-build/bin/ninja \
  -DCMAKE_CXX_COMPILER=/usr/bin/clang++ \
  -DCMAKE_BUILD_TYPE=Release

/Users/frank/Documents/New\ project/.envs/slide-build/bin/cmake \
  --build /Users/frank/Documents/New\ project/.upstream/Battery-Intelligence-Lab__SLIDE/build-codex \
  --parallel 6
```

## Run
```bash
/Users/frank/Documents/New\ project/.envs/slide-build/bin/ctest \
  --test-dir /Users/frank/Documents/New\ project/.upstream/Battery-Intelligence-Lab__SLIDE/build-codex \
  --output-on-failure

cd /Users/frank/Documents/New\ project/.upstream/Battery-Intelligence-Lab__SLIDE
./bin/Release/slide
```

## Outcome
- Result: success.
- Build generated the `slide` executable plus 8 unit-test executables in `bin/Release/`.
- CTest result: `100% tests passed, 0 tests failed out of 8`.
- CTest total time: `64.62 sec`.
- Tests passed: `unit_test_Cell_Bucket`, `unit_test_Cell_ECM`, `unit_test_Cell_SPM`, `unit_test_Converter`, `unit_test_Module_p`, `unit_test_Module_s`, `unit_test_Cycler`, `unit_test_Procedure`.
- Default `slide` binary output:
```text
Start simulations
Available number of threads : 8
finished all simulations in 0:0.000238167 min:sec.
```

## Notes
- The default upstream `src/main.cpp` currently starts and exits without running a full example because example/benchmark calls are commented out. Therefore the upstream CTest suite is the stronger smoke-reproduction evidence.
- MATLAB post-processing was not required for this C++ unit-test reproduction.
- Build produced warnings from AppleClang, mostly unused-parameter/sign-conversion warnings and a `ranlib` empty static library warning for `libcells.a`; none blocked the build or tests.
