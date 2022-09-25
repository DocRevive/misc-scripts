function generatePartitions(n) {
  const parts = new Array(n);
  let k = 0;
  const result = [];
  parts[k] = n;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    result.push(parts.slice(0, k + 1));
    let remaining = 0;

    while (k >= 0 && parts[k] === 1) {
      remaining += parts[k];
      k -= 1;
    }

    if (k < 0) { break; }
    parts[k] -= 1;
    remaining += 1;

    while (remaining > parts[k]) {
      parts[k + 1] = parts[k];
      remaining -= parts[k];
      k += 1;
    }

    parts[k + 1] = remaining;
    k += 1;
  }

  return result;
}

function removeElementsLongerThan(n, array) {
  return array.filter((el) => el.length <= n);
}

module.exports = {
  generatePartitions,
  removeElementsLongerThan,
};
