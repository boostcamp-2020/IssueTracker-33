import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	font-family: 'Open Sans', sans-serif;

	body {
		margin: 0;
		padding: 0;
	}

	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}

	h3 {
		margin: 5px;
	}
`;

export default GlobalStyle;
