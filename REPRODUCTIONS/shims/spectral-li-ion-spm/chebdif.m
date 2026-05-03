function [x, DM] = chebdif(N, M)
%CHEBDIF Minimal Chebyshev differentiation matrices for reproduction.
%   Provides the subset used by Spectral_li-ion_SPM: nodes plus first and
%   second differentiation matrices on Chebyshev-Lobatto points.
    if nargin < 2
        M = 1;
    end
    if N < 2
        error('chebdif: N must be at least 2');
    end

    x = cos(pi * (0:N-1)' / (N-1));
    c = [2; ones(N-2, 1); 2] .* (-1).^(0:N-1)';
    X = repmat(x, 1, N);
    dX = X - X';
    D = (c * (1 ./ c)') ./ (dX + eye(N));
    D = D - diag(sum(D, 2));

    if M == 0
        DM = zeros(N, N, 0);
        return;
    end

    DM = zeros(N, N, M);
    DM(:, :, 1) = D;
    for ell = 2:M
        DM(:, :, ell) = D * DM(:, :, ell - 1);
    end
end
