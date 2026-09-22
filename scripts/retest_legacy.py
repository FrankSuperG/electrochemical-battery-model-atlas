"""Bounded legacy probes using temporary copies; never edit upstream checkouts."""
import argparse
import os
from pathlib import Path
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]


def run(args):
    sources = {"hanrach": "hanrach__p2d_solver", "dkong": "dkong8s93__p2d-model", "decaluwe": "decaluwe__p2d_li_ion_battery"}
    source = ROOT / ".upstream" / sources[args.model]
    revision = subprocess.check_output(["git", "-C", str(source), "rev-parse", "HEAD"], text=True).strip()
    changes = subprocess.check_output(["git", "-C", str(source), "diff", "HEAD", "--name-only"], text=True).strip()
    print("SOURCE", revision, "TRACKED_CHANGES", changes or "none", flush=True)
    with tempfile.TemporaryDirectory(prefix="atlas-retest-") as tmp:
        work = Path(tmp) / "source"
        shutil.copytree(source, work, ignore=shutil.ignore_patterns(".git", "__pycache__", ".DS_Store"))
        if args.model == "hanrach":
            for file in work.rglob("*.py"):
                code = file.read_text().replace("from jax.config import config", "from jax import config")
                code = code.replace("from lax_newton import lax_newton", "# Unused legacy callback import removed for this probe")
                file.write_text(code)
            entry = work / "run_main.py"
            code = entry.read_text()
            if args.grid != 50:
                for key in ("Np", "Nn", "Mp", "Mn"):
                    code = code.replace(f"{key} = 50", f"{key} = {args.grid}")
                code = code.replace("Ms = 10", "Ms = 5")
            shim = "import jax, numpy\njax.ops.index = numpy.index_exp\njax.ops.index_update = lambda a, i, v: a.at[i].set(v)\n"
            # The upstream driver discards its Newton failure flag. Check the
            # final residual ourselves before calling this smoke test a pass.
            driver = work / "p2d_main_fn.py"
            driver.write_text(driver.read_text().replace("[state, fail] = newton(fn, jac_fn, U)", "[state, fail] = newton(fn, jac_fn, U)\n    residual = float(norm(fn(state, U), np.inf) / norm(state, np.inf))\n    print('ATLAS_FINAL_RESIDUAL', residual, 'FAIL', fail, flush=True)\n    assert fail == 0 and bool(np.all(np.isfinite(state))) and residual < 1e-8"))
            entry.write_text(shim + code)
            command = [args.python, "-u", "run_main.py"]
        elif args.model == "dkong":
            work = work / "reduced_temperature_model"
            code = (work / "script.m").read_text()
            code = "\n".join(line for line in code.splitlines() if "=initializePlotting(" not in line)
            code = code.split("for i=1:1:numsteps")[0]
            code += "\nfprintf('ATLAS_RCOND %.6g BACKWARD_ERROR %.6g FINITE %d\\n', rcond(full(J)), norm(J*(J\\residual)-residual,inf)/max(norm(residual,inf),eps), all(isfinite(U)));\n"
            (work / "atlas_probe.m").write_text(code)
            command = ["octave", "--no-gui", "--quiet", "atlas_probe.m"]
        else:
            command = [args.python, "-u", "li_ion_battery_p2d_model.py"]
        print("MODEL", args.model, "COMMAND", command, "TIMEOUT", args.timeout, flush=True)
        mpl_dir = Path(tmp) / "mpl"
        mpl_dir.mkdir()
        for cache in (Path.home() / ".matplotlib").glob("fontlist-v*.json"):
            shutil.copy2(cache, mpl_dir)
        try:
            env = {key: value for key, value in os.environ.items() if key != "__PYVENV_LAUNCHER__"}
            env.update(MPLBACKEND="Agg", MPLCONFIGDIR=str(mpl_dir))
            result = subprocess.run(command, cwd=work, env=env, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, timeout=args.timeout, text=True)
            print(result.stdout)
            print("EXIT", result.returncode)
            return result.returncode
        except subprocess.TimeoutExpired as exc:
            output = exc.stdout or b""
            print(output.decode(errors="replace") if isinstance(output, bytes) else output)
            print("TIMEOUT: no completed reproduction")
            return 124


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("model", choices=["hanrach", "dkong", "decaluwe"])
    parser.add_argument("--python", default=str(ROOT / ".envs/atlas-arm/bin/python"))
    parser.add_argument("--grid", type=int, default=10)
    parser.add_argument("--timeout", type=int, default=180)
    raise SystemExit(run(parser.parse_args()))
