import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
	font-family: 'Open Sans', sans-serif;

	:root {
		--login-gray: #A0A0A0;
		--border-gray: #E1E4E8;
		--background-gray: #F5F8FA;
		--button-green: #32C654;
		--header-black: #242A2E;
		--list-gray: #F7F8FA;
		--open-green: #2BBE4E;
		--closed-red: #CA2431;
		--owner-blue: #F0F8FE;
		--tab-blue: #0466D6;
	}


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
