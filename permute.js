// http://homepage.math.uiowa.edu/~goodman/22m150.dir/2007/Permutation%20Generation%20Methods.pdf

function permute(perm) {
  const permutation = perm;
  const { length } = permutation;
  const result = [permutation.slice()];
  const c = new Array(length).fill(0);
  let i = 1;
  let k;
  let p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      c[i] += 1;
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      i += 1;
    }
  }
  return result;
}

function boolPermute(iteration, length, current) {
  const curr = current === undefined ? [[]] : current;
  const result = [];

  for (const sequence of curr) {
    result.push(sequence.concat([true]), sequence.concat([false]));
  }

  if (iteration === length) return result;
  return boolPermute(iteration + 1, length, result);
}

module.exports = {
  permute,
  boolPermute,
};
