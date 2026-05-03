function Prob = WarmDefSOL(~, Prob, Result)
% Minimal TOMLAB WarmDefSOL compatibility shim.
Prob.x_0 = Result.x_k(:);
end
