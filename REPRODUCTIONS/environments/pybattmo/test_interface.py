"""Independent Python API checks; run against the pinned headless Julia project."""
import json

import numpy as np
import pytest
import battmo


def test_bridge_extension_loaded():
    # PyBattMo names its bridge module BattMo too; inspect the actual package module.
    assert bool(battmo.jl.seval("using PythonCall; Base.get_extension(parentmodule(LithiumIonBattery), :BattMoPythonCallExt) !== nothing"))
    make_invokable = battmo.jl.seval("parentmodule(LithiumIonBattery).make_invokable")
    callback = make_invokable(lambda value: 2 * float(value))
    assert float(callback(3.0)) == 6.0


def test_loading():
    assert battmo.load_cell_parameters(from_default_set="chen_2020") is not None
    assert battmo.load_cycling_protocol(from_default_set="cc_discharge") is not None
    assert battmo.load_model_settings(from_default_set="p2d") is not None
    assert battmo.load_simulation_settings(from_default_set="p2d") is not None
    assert battmo.load_solver_settings(from_default_set="direct") is not None
    assert battmo.load_full_simulation_input(from_default_set="chen_2020") is not None


@pytest.mark.parametrize("rate", [0.5, 1.0])
def test_python_discharge_and_dataframe(rate):
    parameters = battmo.load_cell_parameters(from_default_set="chen_2020")
    protocol = battmo.load_cycling_protocol(from_default_set="cc_discharge")
    protocol["DRate"] = rate
    assert float(protocol["DRate"]) == rate
    simulation = battmo.Simulation(battmo.LithiumIonBattery(), parameters, protocol)
    output = battmo.solve(simulation, info_level=0)
    frame = battmo.to_pandas(output.time_series)
    assert {"Time", "Voltage", "Current"}.issubset(frame.columns)
    values = frame[["Time", "Voltage", "Current"]].to_numpy(dtype=float)
    assert len(frame) > 10 and np.isfinite(values).all()
    t, v, current = values.T
    assert (np.diff(t) > 0).all()
    assert 3000 / rate < t[-1] < 4000 / rate
    assert ((v > 1.5) & (v < 5.)).all() and v[-1] < v[0]
    # The cutoff-triggering state is omitted from stored output by Jutul.
    assert v[-1] >= float(protocol["LowerVoltageLimit"])
    stopped = battmo.jl.seval(
        "o -> get(o.jutul_output.reports[end][:ministeps][end], :stopnow, false)"
    )(output)
    assert bool(stopped)
    assert np.isclose(current.max(), 5.090421803494574 * rate, rtol=1e-8)
    if rate == 0.5:
        # Compare the Python path with the separately verified Julia example.
        assert np.isclose(t[-1], 7048.4375, rtol=1e-10)
        assert np.isclose(v[-1], 2.4170830348696746, atol=1e-8)
    print("ATLAS_RESULT " + json.dumps({
        "rate_C": rate, "samples": len(frame), "last_stored_time_s": float(t[-1]),
        "first_voltage_V": float(v[0]), "last_voltage_V": float(v[-1]),
        "max_current_A": float(current.max()), "controller_stopped": bool(stopped),
        "dataframe_columns": list(frame.columns),
    }))


def test_full_input_constructor_type():
    full = battmo.load_full_simulation_input(from_default_set="chen_2020")
    rebuilt = battmo.FullSimulationInput(full.all)
    assert bool(battmo.jl.isa(rebuilt, battmo.jl.FullSimulationInput))


def test_direct_julia_constructor_workaround():
    full = battmo.load_full_simulation_input(from_default_set="chen_2020")
    rebuilt = battmo.jl.FullSimulationInput(full.all)
    assert bool(battmo.jl.isa(rebuilt, battmo.jl.FullSimulationInput))
