exports.randomRGB = () => {
  const template = ['#08F7FE', '#09FBD3', '#FE53BB', '#F5D300', '#F148FB', '#7122FA'];
  return template[Math.floor(Math.random() * template.length)];
};
