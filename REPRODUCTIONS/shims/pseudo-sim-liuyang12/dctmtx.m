function D = dctmtx(n)
%DCTMTX MATLAB-compatible DCT-II transform matrix for Octave reproduction.
%   This provides the subset needed by Pseudo_sim's T1master script.
    if nargin ~= 1 || ~isscalar(n) || n <= 0 || fix(n) ~= n
        error('dctmtx: n must be a positive integer scalar');
    end

    [j, k] = ndgrid(0:n-1, 0:n-1);
    D = sqrt(2 / n) * cos(pi * (2 * j + 1) .* k / (2 * n));
    D(:, 1) = D(:, 1) / sqrt(2);
end
