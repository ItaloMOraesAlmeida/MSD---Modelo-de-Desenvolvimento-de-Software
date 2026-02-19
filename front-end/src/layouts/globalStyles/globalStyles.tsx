import { Global, css } from "@emotion/react";
import { theme } from "./theme";

export const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      html,
      body,
      #root {
        width: 100%;
        height: 100%;
        font-family:
          -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      body {
        background-color: ${theme.colors.background.default};
        color: ${theme.colors.text.primary};
        font-size: ${theme.fontSize.base};
        font-weight: ${theme.fontWeight.regular};
        line-height: ${theme.lineHeight.normal};
      }

      button {
        cursor: pointer;
        font-family: inherit;
      }

      input,
      textarea,
      select {
        font-family: inherit;
      }

      a {
        text-decoration: none;
        color: inherit;
      }

      ul,
      ol {
        list-style: none;
      }

      img {
        max-width: 100%;
        height: auto;
      }
    `}
  />
);
