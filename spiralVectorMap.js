function tileVector(x, y) {
  if (Math.abs(x) === Math.abs(y)) {
      if (x >= 0 && y >= 0) {
          return [0, 1];
      } else if (x < 0 && y > 0) {
          return [-1, -1];
      } else if (x > 0 && y < 0) {
          return [1, 1];
      } else if (x < 0 && y < 0) {
          return [1, -1];
      }
  } else if (x + 1 === y && x >= 0) {
      return [-1, 1];
  } else if (y >= -(Math.abs(x) - 1) && y <= (Math.abs(x) - 1)) {
        if (x > 0) return [0, 1];
        if (x < 0) return [0, -1];
  } else if (y < 0) {
      const maxX = Math.abs(y) - 1;
      if (x >= -maxX && x <= maxX) {
          return [1, 0];
      }
  } else if (y > 1) {
      const start = -y + 1;
      if (x >= start && x <= (start + 2*y - 3)) {
          return [-1, 0];
      }
  }
  return false;
}

const side = 35;
const coords = [[0, 0], [0, 1]];
let steps = [0, 1];
let direction = [-1, 0];
for (let i = 2; i < side * side; i += 1) {
    coords.push([coords[i - 1][0] + direction[0], coords[i - 1][1] + direction[1]]);
    steps[0] += 1;
    if (steps[0] === steps[1]) {
        if (direction[0] !== 0) {
            steps = [0, steps[1] + 1];
        } else {
            steps[0] = 0;
        }
        if (direction[0] === 0) {
            if (direction[1] === 1) {
                direction = [-1, 0];
            } else {
                direction = [1, 0]
            }
        } else if (direction[0] === -1) {
            direction = [0, -1];
        } else if (direction[0] === 1) {
            direction = [0, 1]
        }
    }
}

let plane = Array.from({length: side}, e => Array(side));
const iOff = Math.floor(side / 2);
for (const [x, y] of coords) {
  plane[y + iOff][x + iOff] = tileVector(x, y);
}
plane = plane.reverse();
const vis = plane.map((row) => row.map((coord) => {
  const newStr = `[${coord[0]}, ${coord[1]}]`;
  if (newStr.length < 8) {
    return newStr + ' '.repeat(8 - newStr.length);
  } else return newStr;
}).join(' '));
console.log(vis);
