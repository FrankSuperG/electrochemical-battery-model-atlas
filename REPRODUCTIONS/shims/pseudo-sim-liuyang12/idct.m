function x = idct(y, n)
%IDCT Minimal inverse DCT-II for Octave reproduction.
    if nargin < 2
        n = size(y, 1);
    end
    if size(y, 1) < n
        y = [y; zeros(n - size(y, 1), size(y, 2))];
    elseif size(y, 1) > n
        y = y(1:n, :);
    end
    x = dctmtx(n)' * y;
end
