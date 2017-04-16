export default function hexToDec(input) {
  const m = input.match(/^#([0-9a-f]{6})$/i)[1];
  if (m) {
    return parseInt(m.substr(0, 6), 16);
  }
}