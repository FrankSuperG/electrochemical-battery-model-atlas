function Result = tomRun(solver, Prob, varargin)
% Minimal TOMLAB tomRun compatibility shim backed by MATLAB fmincon.
% This is for reproduction triage only; it is not a numerical replacement
% guarantee for KNITRO.
if nargin < 1 || ~strcmpi(solver, 'knitro')
    error('tomRun shim only supports the KNITRO call pattern used here.');
end
if exist('fmincon', 'file') ~= 2
    error('tomRun shim requires MATLAB Optimization Toolbox fmincon.');
end

x0 = Prob.x_0(:);
lb = Prob.x_L(:);
ub = Prob.x_U(:);
[Aineq, bineq] = linearIneq(Prob.A, Prob.b_L, Prob.b_U);

maxIter = 10;
if isfield(Prob, 'KNITRO') && isfield(Prob.KNITRO, 'options') && isfield(Prob.KNITRO.options, 'MAXIT')
    maxIter = Prob.KNITRO.options.MAXIT;
end

opts = optimoptions('fmincon', ...
    'Algorithm', 'sqp', ...
    'Display', 'off', ...
    'MaxIterations', maxIter, ...
    'MaxFunctionEvaluations', max(200, 100 * numel(x0)), ...
    'OptimalityTolerance', 1e-1, ...
    'ConstraintTolerance', 1e-1, ...
    'StepTolerance', 1e-8);

objective = @(x) guardedObjective(Prob.FUNCS.f, x);
[xopt, fval, exitflag, output] = fmincon(objective, x0, Aineq, bineq, [], [], lb, ub, [], opts);

Result = struct();
Result.x_k = xopt(:);
Result.f_k = fval;
Result.ExitFlag = exitflag;
Result.Inform = exitflag;
Result.output = output;
end

function [Aineq, bineq] = linearIneq(A, b_L, b_U)
Aineq = [];
bineq = [];
if isempty(A)
    return;
end

finiteUpper = isfinite(b_U);
if any(finiteUpper)
    Aineq = [Aineq; A(finiteUpper, :)];
    bineq = [bineq; b_U(finiteUpper)];
end

finiteLower = isfinite(b_L);
if any(finiteLower)
    Aineq = [Aineq; -A(finiteLower, :)];
    bineq = [bineq; -b_L(finiteLower)];
end
end

function f = guardedObjective(fun, x)
f = feval(fun, x(:));
if ~isfinite(f) || ~isreal(f)
    f = realmax('double') / 1e12;
end
end
