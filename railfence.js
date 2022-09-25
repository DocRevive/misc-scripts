function decode(ciphertext, key) {
  const chars = ciphertext.length;
  const plaintext = Array(chars);
  const indices = [];

  for (let i = 0; i < plaintext.length; i += 2 * key - 2) indices.push(i);
  const range = [0, indices.length];

  for (let times = 0; times < key; times += 1) {
    while (range[0] <= range[1]) {
      [indices[range[0]] - 1, indices[range[0]] + 1].forEach((poss) => {
        if (poss < chars && poss >= 0 && !indices.includes(poss)) indices.push(poss);
      });
      range[0] += 1;
    }
    range[1] = indices.length - 1;
  }

  indices.forEach((plainI, cipherI) => {
    plaintext[plainI] = ciphertext[cipherI];
  });

  return plaintext.join('');
}
console.log(decode('ye oor gfnouaaia b bt', 4));

/*
Comparison: https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/cryptography/rail-fence-cipher

Rails: 2
13 chars: (this is) 560% faster
57 chars: 724% faster
190 chars: 1878% faster

Rails: 12
13 chars: 1919% faster
57 chars: 2839% faster
190 chars: 10829% faster

Rails: 98
13 chars: 3000% faster
57 chars: 18749% faster
*/
