const { default: styled } = require('styled-components');

const randomRGB = () => {
  const template = ['#08F7FE', '#09FBD3', '#FE53BB', '#F5D300', '#F148FB', '#7122FA'];
  return template[Math.floor(Math.random() * template.length)];
};

const CustomButton = styled.button`
  margin: 3px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bolder;
  color: purple;
  background-color: ${randomRGB};
  text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #ff00de, 0 0 7px #ff00de, 0 0 8px #ff00de, 0 0 10px #ffffff, 0 0 15px #ffffff;
  &:hover {
    color: white;
  }
`;

export { CustomButton, randomRGB };
