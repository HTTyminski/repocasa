import styled from 'styled-components';

export const TableDropDownWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;

  button {
    background-color: transparent;
    border: 0;

    svg {
      fill: #707070;
      margin: 0;
    }
  }

  nav {
    background-color: #fff;
    border: 1px solid #f6f7ff;
    box-shadow: 0px 3px 6px 0px #f6f7ff;
    left: -100px;
    position: absolute;
    top: 0;
    width: 110px;
    z-index: 1;

    button {
      appearance: none;
      color: #8a97b1;
      font-size: 10px;
      font-weight: 500;
      height: 30px;
      padding: 0 8px;
      width: 100%;

      &:hover {
        background-color: #f6f7ff;
        color: #8a97b1;
      }
    }

    a {
      color: #8a97b1;
      display: block;
      font-size: 10px;
      padding: 5px 8px;
      text-decoration: none;

      &:hover {
        background-color: #f6f7ff;
      }
    }
  }
`;
