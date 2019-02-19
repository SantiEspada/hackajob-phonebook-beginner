// Simple function to get an HEX color from a given string.
// Found at https://stackoverflow.com/a/16348977
export const stringToColour = (str) => {
  for (var i = 0, hash = 0; i < str.length; hash = str.charCodeAt(i++) + ((hash << 5) - hash));
  const color = Math.floor(Math.abs((Math.sin(hash) * 10000) % 1 * 16777216)).toString(16);
  return '#' + Array(6 - color.length + 1).join('0') + color;
}
