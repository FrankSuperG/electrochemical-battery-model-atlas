function Prob = conAssign(fun, ~, ~, ~, x_L, x_U, Name, x_0, ~, ~, A, b_L, b_U)
% Minimal TOMLAB conAssign compatibility shim for local reproduction.
% It stores only the fields used by T1master/tomRun in this project.
Prob = struct();
Prob.Name = Name;
Prob.FUNCS.f = fun;
Prob.x_0 = x_0(:);
Prob.x_L = x_L(:);
Prob.x_U = x_U(:);
Prob.A = A;
Prob.b_L = b_L(:);
Prob.b_U = b_U(:);
Prob.KNITRO.options = struct();
end
