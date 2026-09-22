"""Headless upstream quickstart with explicit numerical assertions."""
import argparse
import json
import logging

import jax
jax.config.update("jax_enable_x64", True)
import jax.numpy as jnp
import numpy as np
from jax_fem import logger
from difflibx import Parameter, make_mesh, LiBProblem

parser = argparse.ArgumentParser()
parser.add_argument("parameters")
parser.add_argument("--end-time", type=int, default=3620)
parser.add_argument("--gradient", action="store_true")
args = parser.parse_args()
assert args.end_time >= 5 and args.end_time % 5 == 0
logger.setLevel(logging.WARNING)
params = Parameter(args.parameters)
mesh = make_mesh(type="layer3", cfg={
    "z_an": 100., "n_an": 20, "z_se": 25., "n_se": 20,
    "z_ca": 100., "n_ca": 20, "y": 10., "n_y": 2, "r": 1., "n_r": 10,
})
problem = LiBProblem(params, mesh,
    ground_pos_fn=lambda p: jnp.isclose(p[0], 0., atol=1e-5),
    current_pos_fn=lambda p: jnp.isclose(p[0], 225., atol=1e-5))
theta = jnp.array([params.alpha_an, params.alpha_ca, params.alpha_se,
                  params.ks[0], params.ks[1], params.tp, params.ds_an,
                  params.ds_ca, params.cs0_an, params.cs0_ca])
sol = problem.solve(dt=5, c_rate=1., t_eval=(0, args.end_time), theta=theta)
macro, micro = np.asarray(sol.macro), np.asarray(sol.micro)
terminal = mesh[0].dofs[2][mesh[0].terminal]
voltage = macro[np.asarray(terminal), :]
assert macro.shape[-1] == args.end_time // 5 + 1
assert np.isfinite(macro).all() and np.isfinite(micro).all()
assert (voltage > 1.5).all() and (voltage < 5.).all()
assert voltage[..., -1].mean() < voltage[..., 0].mean()
result = {"end_time_s": args.end_time, "samples": macro.shape[-1],
          "initial_voltage_V": float(voltage[..., 0].mean()),
          "final_voltage_V": float(voltage[..., -1].mean()),
          "solve_time_s": float(sol.time_cost), "gradient_checked": False}
if args.gradient:
    # Keep the AD/finite-difference check short; it is not a paper-wide Taylor test.
    def objective(x):
        return jnp.sum(problem.solve(dt=5, c_rate=1., t_eval=(0, 10), theta=x).macro)
    derivative = np.asarray(jax.grad(objective)(theta))
    assert np.isfinite(derivative).all()
    index, h = 6, 1e-3
    plus = objective(theta.at[index].set(theta[index] * (1 + h)))
    minus = objective(theta.at[index].set(theta[index] * (1 - h)))
    fd = float((plus - minus) / (2 * h * theta[index]))
    relative_error = abs(derivative[index] - fd) / max(abs(fd), 1e-30)
    assert np.isfinite(fd) and abs(fd) > 1e-10
    assert relative_error < 0.01, (derivative[index], fd, relative_error)
    result.update(gradient_checked=True, gradient_relative_error=float(relative_error))
print("ATLAS_RESULT " + json.dumps(result), flush=True)
