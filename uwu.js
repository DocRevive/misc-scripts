function uwuify(text) {
  return text.toLowerCase()
    .replace(/[rl]/g, 'w')
    .replace(/(?!\b)ov/g, 'uv')
    .replace(/n([aeiou])/g, 'ny$1');
}
