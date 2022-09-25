/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-syntax */

function reorganize(str) {
  const letterCounts = {};
  const reorganized = Array(str.length).fill(null);

  // Count the occurrences of each letter
  for (const letter of str.split('')) { // Split string into letters
    if (!(letter in letterCounts)) letterCounts[letter] = 0;
    letterCounts[letter] += 1;
  }

  const sortedCounts = Object.entries(letterCounts);
  sortedCounts.sort((a, b) => b[1] - a[1]);

  let i = 0;
  let odd = false;
  let changed = false;

  /*
  Fill even (and 0) indices of result first, then fill the remaining (odd) indices.
  All occurrences of one letter are inputted before moving onto the next.
  I guess you have to start with the most common letters.
  */
  while (sortedCounts.length > 0) {
    reorganized[i] = sortedCounts[0][0]; // Place one occurrence of letter at pos 0
    sortedCounts[0][1] -= 1; // Decrement its occurrences
    if (sortedCounts[0][1] === 0) { // If, now, there are none left
      sortedCounts.shift(); // Remove the letter; a new letter is at index 0
      changed = true; // To help prevent adjacent numbers
    }
    i += 2; // Step for even/odd sequence
    if (i > reorganized.length - 1) { // If we've reached the end of the result
      if (!changed) return ''; // If there are still remaining occurrences of the first letter, can't reorganize
      if (!odd) { // Otherwise, if we haven't already switched to odd indices
        odd = true; // Now we will
        i = 1; // Start sequence at 1 (, 3, 5...)
      }
    }
  }

  return reorganized.join(''); // Join array of letters
}

console.log('hello:', reorganize('hello'));
console.log('bye:', reorganize('bye'));
console.log('wooow:', reorganize('wooow'));
console.log('woooot:', reorganize('woooot'));
console.log('aaaaabbbbbbbbbbbbccccccddddddssspqpq:', reorganize('aaaaabbbbbbbbbbbbccccccddddddssspqpq'));
console.log('ooowwwuuu:', reorganize('ooowwwuuu'));

/*
function reorganize(str) {
  const letterCounts = {};
  const reorganized = Array(str.length).fill(null);

  // Count the occurrences of each letter
  for (const letter of str.split('')) { // Split string into letters
    if (!(letter in letterCounts)) letterCounts[letter] = 0;
    letterCounts[letter] += 1;
  }

  // If one letter makes up more than half of the string, reorganization is impossible.
  const counts = Object.values(letterCounts);
  const countsSum = counts.reduce((a, b) => a + b);
  if (Math.max(...counts) / countsSum > 0.5) return '';

  const orderedCounts = Object.entries(letterCounts);

  let i = 0;
  let odd = false;

  /*
  Fill even (and 0) indices of result first, then fill the remaining (odd) indices.
  All occurrences of one letter are inputted before moving onto the next.
  Since we already checked that no letter makes up more than half of the string,
  it's impossible for a letter that, for instance, starts at 0, to go through all
  the even indices (at least half of the string), loop back, and become adjacent to
  itself. I think that's the only case where reorganization would be impossible.

  while (orderedCounts.length > 0) {
    reorganized[i] = orderedCounts[0][0]; // Place one occurrence of letter at pos 0
    orderedCounts[0][1] -= 1; // Decrement its occurrences
    if (orderedCounts[0][1] === 0) { // If, now, there are none left
      orderedCounts.shift(); // Remove the letter; a new letter is at index 0
    }
    i += 2; // Step for even/odd sequence
    if (i > reorganized.length - 1) { // If we've reached the end of the result
      if (!odd) { // And if we haven't already switched to odd indices
        odd = true; // Now we will
        i = 1; // Start sequence at 1 (, 3, 5...)
      }
    }
  }

  return reorganized.join(''); // Join array of letters
}
*/
