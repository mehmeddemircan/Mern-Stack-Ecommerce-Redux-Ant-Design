// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
      margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: none;
  cursor: pointer
    }
  html ,body {
      min-height: 280px;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }
  *::before,
  *::after {
  margin: 0;
  padding: 0;
  box-sizing: inherit;

  
}
`;

export default GlobalStyle;