import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --purple: #3a416f;
    --box-shadow: 0 7px 13px -3px rgba(45, 35, 66, 0.3),
      0 2px 4px 0 rgba(45, 35, 66, 0.4), inset 0 -2px 0 0 #3a416f;
    --border: 1px solid var(--purple);
  }

  * {
    box-sizing: border-box;
  }

    body {
    margin: 0;
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
      "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;

    h1,h2,h3,h4,h5,h6 {
    font-family: Karla;
    color: #0c2340;
    }
  }

  a {
    text-decoration: none;
    color: inherit;
  }

`;
