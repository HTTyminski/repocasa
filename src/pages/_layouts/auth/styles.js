import styled from 'styled-components';
import { darken } from 'polished';

import bg from '../../../assets/svg/wave-footer.svg';

export const Wrapper = styled.div`
  align-items: center;
  background: linear-gradient(-90deg, #f4f4f4, #fafafc);
  /* background: #fafafc url(${bg}) no-repeat center bottom; */
  /* background-image: url(${bg});
  background-repeat: no-repeat;
  background-position: center bottom; */
  display: flex;
  height: 100%;
  justify-content: center;
`;

export const Content = styled.div`
  animation: 1s ease-out 0s 1 slideInFromLeft;
  max-width: 375px;
  text-align: center;
  width: 100%;

  .logo-sim {
    height: 32px;
  }

  form {
    background-color: #fff;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 33px;

    p {
      color: #8a97b1;
      margin-bottom: 30px;
      height: 42px;

      strong {
        color: #6d7882;
      }
    }

    input {
      border: solid 1px #f6f7ff;
      border-left: solid 3px #6d7882;
      border-radius: 0;
      color: #8a97b1;
      height: 47px;
      margin: 0 0 15px;
      padding: 0 15px;

      &::placeholder {
        color: #8a97b1;
      }
    }

    span {
      animation: 300ms ease-out 0s 1 slideInFromLeft;
      color: #ff2f2f;
      align-self: flex-start;
      margin-bottom: 10px;
      font-size: 11px;
      font-weight: 600;
    }

    button {
      background-color: #00b81f;
      border-radius: 3px;
      border: 0;
      color: #fff;
      font-size: 16px;
      font-weight: 500;
      height: 44px;
      margin: 5px 0 0;
      transition: all 300ms ease;

      &:hover {
        background-color: ${darken(0.03, '#00b81f')};
      }
    }
  }

  a {
    align-items: center;
    color: rgba(0, 0, 0, 0.2);
    display: flex;
    font-size: 11px;
    justify-content: center;
    margin-top: 30px;
    opacity: 0.7;
    text-decoration: none;
    transition: opacity 300ms ease;

    &:hover {
      opacity: 1;
    }

    svg {
      height: 20px;
      margin-left: 10px;
    }
  }
`;
