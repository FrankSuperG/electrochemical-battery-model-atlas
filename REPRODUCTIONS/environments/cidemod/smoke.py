"""Run the upstream Chen case, adding finite-trajectory evidence to its comparisons.

Run with the upstream tests directory on PYTHONPATH and as the working directory.
"""
import json
import numpy as np
import helpers_pytest
from test_Chen_2020 import TestP2D_Chen

upstream_check = helpers_pytest._check_results


def checked_results(problem, *args, **kwargs):
    time = np.asarray(problem.get_global_variable("time"))
    voltage = np.asarray(problem.get_global_variable("voltage"))
    assert len(time) == len(voltage) and len(time) > 10
    assert np.isfinite(time).all() and np.isfinite(voltage).all()
    assert (np.diff(time) > 0).all()
    assert time[-1] > 1000
    assert (voltage > 1.5).all() and (voltage < 5.).all()
    assert voltage[-1] < voltage[0]
    upstream_check(problem, *args, **kwargs)
    print("ATLAS_RESULT " + json.dumps({
        "samples": len(time), "end_time_s": float(time[-1]),
        "initial_voltage_V": float(voltage[0]), "final_voltage_V": float(voltage[-1]),
        "scope": "upstream Chen 2020 dimensional 1C reference comparisons",
    }), flush=True)


helpers_pytest._check_results = checked_results
TestP2D_Chen().test_dimensional()
