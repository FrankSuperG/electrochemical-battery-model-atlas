function y = dct(x, n)
%DCT Minimal MATLAB-compatible DCT-II for Octave reproduction.
    if nargin < 2
        n = size(x, 1);
    end
    if size(x, 1) < n
        x = [x; zeros(n - size(x, 1), size(x, 2))];
    elseif size(x, 1) > n
        x = x(1:n, :);
    end
    y = dctmtx(n) * x;
end
