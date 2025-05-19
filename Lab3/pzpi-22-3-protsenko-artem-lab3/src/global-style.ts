import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
* {
      margin: 0;
      padding: 0;
  }

  body{
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
      margin: 0;
  }

  a {
      display: block;
      text-decoration: none;
  }

  ul,
  ol {
      margin: 0;
      padding: 0;
      list-style: none;
  }

  button {
      cursor: pointer;
      border: none;
      outline: none !important;
  }

  input {
      outline: none !important;
      border: none;
  }


`
export default GlobalStyle
