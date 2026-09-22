using BattMo
using BattMo: JSON

parameters = load_cell_parameters(; from_default_set = "chen_2020")
protocol = load_cycling_protocol(; from_default_set = "cc_discharge")
simulation = Simulation(LithiumIonBattery(), parameters, protocol)
output = solve(simulation; info_level = 0)
t = output.time_series["Time"]
v = output.time_series["Voltage"]
i = output.time_series["Current"]
@assert length(t) == length(v) == length(i)
@assert length(t) > 10
@assert all(isfinite, t) && all(isfinite, v) && all(isfinite, i)
@assert all(diff(t) .> 0)
@assert t[end] > 1000
@assert all(1.5 .< v .< 5.0)
@assert v[end] < v[1]
@assert maximum(abs.(i)) > 0
@assert abs(v[end] - protocol["LowerVoltageLimit"]) < 0.05
# Jutul records the cutoff report but omits that final state from time_series.
stopped_by_controller = get(output.jutul_output.reports[end][:ministeps][end], :stopnow, false)
@assert stopped_by_controller
println("ATLAS_RESULT " * JSON.json(Dict(
    "samples" => length(t), "end_time_s" => t[end],
    "initial_voltage_V" => v[1], "final_voltage_V" => v[end],
    "current_min_A" => minimum(i), "current_max_A" => maximum(i),
    "stopped_by_controller" => stopped_by_controller,
    "scope" => "default Chen 2020 0.5C discharge; last stored state precedes cutoff"
)))
