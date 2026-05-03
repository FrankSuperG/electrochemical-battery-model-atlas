using PETLION

p = petlion(LCO)
sol = simulate(p, 10; I=1, SOC=0.5)

println("points ", length(sol.t))
println("v_end ", sol.V[end])
