// Assumes 0 < num < 100
function below100ToWord(num) {
  const units = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'];
  const tens = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if (num < 10) return units[num - 1];
  if (num < 20) return teens[num - 11];

  const tensDigit = Math.floor(num / 10);
  let result = tens[tensDigit - 2];

  if (num % 10 !== 0) result += `-${below100ToWord(num % 10)}`;
  return result;
}

// Assumes 0 < num < 100
function below100ToOrdinal(num) {
  const units = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh',
    'eighth', 'ninth'];

  if (num < 10) return units[num - 1];
  if (num < 20) {
    if (num === 12) return 'twelfth';
    return `${below100ToWord(num)}th`;
  }

  if (num % 10 === 0) return `${below100ToWord(num).slice(0, -1)}ieth`;
  const ones = num % 10;
  return `${below100ToWord(num - ones)}-${below100ToOrdinal(ones)}`;
}

// Splits larger numbers into an array for easier processing
function splitNum(num) {
  let remaining = num;
  const result = [];

  while (remaining !== 0) {
    result.push(remaining % 100);
    remaining = Math.floor(remaining / 100);
    result.push(remaining % 10);
    remaining = Math.floor(remaining / 10);
  }

  /*
  The result is from biggest to smallest place value and alternates
  between "hundreds" and "tens" (starts with hundreds). Every two
  elements is an "order of a thousand" (100 * 10; thousand, million, ...)
  */
  return result.reverse();
}

// Assumes 0 < num < 1,000,000,000,000,000
function numToOrdinal(num) {
  const ordersOfThous = ['thousand', 'million', 'billion', 'trillion', 'quadrillion'];
  const parts = splitNum(num);
  const result = [];
  let orderIndex = parts.length / 2 - 2; // num's current index of ordersOfThous
  let ordinalIndex; // the index of the last nonzero "part" (where "th" is applied)
  let i;

  for (i = parts.length - 1; i >= 0; i -= 1) {
    if (parts[i] !== 0) {
      ordinalIndex = i;
      break;
    }
  }

  i = 0;
  while (i <= ordinalIndex) {
    if (parts[i] !== 0) {
      result.push(below100ToWord(parts[i]));
      result.push(i === ordinalIndex ? 'hundredth' : 'hundred');
    }

    i += 1;
    if (parts[i] !== 0) {
      result.push(i === ordinalIndex && orderIndex < 0
        ? below100ToOrdinal(parts[i]) : below100ToWord(parts[i]));
    }

    if (orderIndex >= 0) {
      result.push(i === ordinalIndex ? `${ordersOfThous[orderIndex]}th` : `${ordersOfThous[orderIndex]}`);
      orderIndex -= 1;
    }
    i += 1;
  }

  return result.join(' ');
}

if (process.argv.length > 2) {
  const num = parseInt(process.argv[2], 10);
  console.log(numToOrdinal(num));
}
