function powtf(base, exponent, precision) {
  const deltaX = 10 ** -(precision + 1);
  const lnBase = Math.log(base);
  const sums = [1, 0];

  for (let x = 0; x <= exponent; x += deltaX) {
    sums[1] += lnBase * lnBase * Math.sin(x) * (base ** x) + lnBase * Math.cos(x) * (base ** x);
    sums[0] += deltaX * deltaX * (Math.abs(x) < deltaX / 10 ? 0 : sums[1] / Math.sin(x));
  }

  return sums[0].toPrecision(precision);
}

console.log(powtf(4, 0.5, 1));
console.log(powtf(5, 3, 3));
console.log(powtf(6, 5, 4));

/*
  function powtf(base, exponent, precision) {
    const h = 10 ** -(precision + 1);
    const e = Math.log(base);
    const l = Math.E ** e;
    const p = [1, 0];

    for (let g = 0; g <= exponent; g += h) {
      p[1] += e * e * Math.sin(g) * (l ** g) + e * Math.cos(g) * (l ** g);
      p[0] += h * h * (Math.abs(g) < h / 10 ? 0 : p[1] / Math.sin(g));
    }

    return p[0].toPrecision(precision);
  }
*/
