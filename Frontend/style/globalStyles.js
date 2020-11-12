import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

	:root {
		--login-gray: #A0A0A0;
		--border-gray: #E1E4E8;
		--background-gray: #F5F8FA;
		--button-green: #32C654;
		--header-black: #242A2E;
		--list-gray: #F7F8FA;
		--open-green: #28A745;
		--closed-red: #D73A4A;
		--owner-blue: #F0F8FE;
		--tab-blue: #0466D6;
		--font-white: #FAFBFC;
	}

	body {
		font-family: 'Open Sans', sans-serif;
		margin: 0;
		padding: 0;
	}

	*,
	*:before,
	*:after {
	  box-sizing: border-box;
	}

	p {
		margin: 0;
	}

	h3 {
		margin: 5px;
	}

	input[type="file"] { 
		position: absolute; 
		width: 1px; 
		height: 1px; 
		padding: 0; 
		margin: -1px; 
		overflow: hidden; 
		clip:rect(0,0,0,0); 
		border: 0; 
	}
`;

export default GlobalStyle;
