/* eslint-disable no-restricted-syntax */
// https://courses.cit.cornell.edu/info2950_2012sp/mh.pdf
// How many coin flips on average does it take to get n consecutive heads?

function routine1() {
  const n = 30;
  const prob = 0.5;

  const howMany = (num, p) => (p ** (-num) - 1) / (1 - p);

  for (let i = 0; i < 50; i += 1) {
    console.log(i, howMany(i, prob));
  }
}
routine1();

// What is the probability p(n) of n heads in a row somewhere in a sequence of 'flips' coin flips?

function routine2() {
  const flips = 1000;
  const iters = 2000000;

  const final = {};
  let last = process.hrtime();
  last = last[0] + last[1] / 1e9;

  for (let i = 0; i < iters; i += 1) {
    const f = Array.from({ length: flips }, () => Math.round(Math.random()));
    let consec = [];

    const result = {};
    for (let j = 0; j < f.length; j += 1) {
      if (f[j] === 1) {
        consec.push(f[j]);
        if (consec.length > 1) {
          if (!(consec.length in result)) result[consec.length] = 0;
          result[consec.length] += 1;
        }
      } else {
        consec = [];
      }
    }

    for (const [key, value] of Object.entries(result)) {
      if (!(key in final)) final[key] = [0, 0];
      final[key][0] += 1;
      final[key][1] += value;
    }

    if (i % 10000 === 0 && i !== 0) {
      let curr = process.hrtime();
      curr = curr[0] + curr[1] / 1e9;

      console.log('Iteration', i, '|', 'ETA:', (curr - last) * ((iters - i) / 10000), 'seconds');
      last = curr;
    }
  }

  for (const [key, value] of Object.entries(final)) {
    final[key][0] = value[0] / iters;
    final[key][1] = value[1] / iters;
  }

  console.log(final);
}
