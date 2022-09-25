/* eslint-disable no-restricted-syntax */
const fs = require('fs');

const ipaLetters = {
  a: /eɪ/g,
  b: /biː/g,
  c: /siː/g,
  d: /diː/g,
  e: /iː/g,
  f: /ɛf/g,
  g: /dʒiː/g,
  h: /eɪt͡ʃ/g,
  i: /aɪ/g,
  j: /dʒeɪ/g,
  k: /keɪ/g,
  l: /ɛl/g,
  m: /ɛm/g,
  n: /ɛn/g,
  o: /oʊ/g,
  p: /piː/g,
  q: /kjuː/g,
  r: /ɑɹ/g,
  s: /ɛs/g,
  t: /tiː/g,
  u: /juː/g,
  v: /viː/g,
  w: /dʌbl̩.juː/g,
  x: /ɛks/g,
  y: /waɪ/g,
  z: /ziː/g,
  0: /zɪɚˌoʊ|zɪɚoʊ|ziˌɹoʊ|ziɹoʊ/g,
  1: /wʌn/g,
  2: /tu/g,
  3: /θɹiː/g,
  4: /fɔɹ/g,
  5: /faɪv/g,
  6: /sɪks/g,
  7: /sɛvən/g,
  8: /eɪt/g,
  9: /naɪn/g,
};

const ipaEntries = Object.entries(ipaLetters);

// 125927 English words: https://github.com/open-dict-data/ipa-dict/blob/master/data/en_US.txt
const whitespace = /\s/;
const words = fs.readFileSync('en_US.txt', { encoding: 'utf-8' }).split('\n').map((line) => line.split(whitespace));

function boolPermute(iteration, length, current) {
  if (length === 0) return [];

  const curr = current === undefined ? [[]] : current;
  const result = [];

  for (const sequence of curr) {
    result.push(sequence.concat([true]), sequence.concat([false]));
  }

  if (iteration === length) return result;
  return boolPermute(iteration + 1, length, result);
}

for (const [word, ipa] of words) {
  if (word.length > 1) {
    const matches = [];

    for (const entry of ipaEntries) {
      if (entry[1].test(ipa)) matches.push(entry);
    }

    const perms = boolPermute(1, matches.length);
    for (const perm of perms) {
      if (perm.filter(Boolean).length > 1) {
        let replaced = ipa;
        for (let i = 0; i < matches.length; i += 1) {
          if (perm[i]) {
            replaced = replaced.replace(matches[i][1], `{${matches[i][0]}}`);
          }
        }

        const lengthCheck = replaced.replace(/\{.\}/g, '');
        if (lengthCheck.length < 5) {
          // && !/\w{2,}/.test(lengthCheck)
          // lengthCheck.length + 3 < ipa.length
          // lengthCheck < 8
          console.log(word, 'could be', replaced);
        }
      }
    }
  }
}
