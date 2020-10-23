import { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  *:focus {
    outline: 0;
  }

  html, body, #app {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased !important;
    background-color: #fafafc;
    overflow-x: hidden;
  }

  body, input, button {
    color: #222;
    font-family: 'Poppins', Arial, Helvetica, sans-serif;
    font-size: 14px;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  .show {
    display: block !important;
  }

  .hide-temporarily {
    display: none;
  }

  @keyframes slideInFromLeft {
    0% {
      transform: translateX(-10%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;
