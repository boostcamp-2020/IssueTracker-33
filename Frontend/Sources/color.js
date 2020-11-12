export const getRandomColor = () => {
  const colorR = Math.floor(Math.random() * (220 - 20) + 20).toString(16);
  const colorG = Math.floor(Math.random() * (220 - 20) + 20).toString(16);
  const colorB = Math.floor(Math.random() * (220 - 20) + 20).toString(16);
  return `#${colorR}${colorG}${colorB}`;
};

export const isDarkColor = (hexColor) => {
  const RGB = hexColor.split('#')[1];
  const colorR = parseInt(RGB.slice(0, 2), 16);
  const colorG = parseInt(RGB.slice(2, 4), 16);
  const colorB = parseInt(RGB.slice(4, 6), 16);
  const luminance = (0.299 * colorR + 0.587 * colorG + 0.114 * colorB) / 255;
  if (luminance > 0.5) {
    return false;
  }
  return true;
};
