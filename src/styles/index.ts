import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', 'Arial', sans-serif;
  }

  html,
  body,
  #root {
    height: 100%;
  }
`;
