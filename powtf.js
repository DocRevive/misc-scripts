function powtf(base, exponent, precision) {
  const points = 10 ** -(precision + 1);
  const lol = Math.log(base);
  const sums = [0, 0];

  for (let goal = -15; goal <= exponent; goal += points) {
    sums[1] += lol * lol * Math.sin(goal) * (base ** goal) + lol * Math.cos(goal) * (base ** goal);
    sums[0] += points * points * (Math.abs(goal) < points / 10 ? 0 : sums[1] / Math.sin(goal));
  }

  return sums[0].toPrecision(precision);
}

console.log(powtf(4, 0.5, 1));
console.log(powtf(5, 3, 3));
console.log(powtf(6, 5, 4));
