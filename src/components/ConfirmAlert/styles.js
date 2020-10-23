import styled from 'styled-components';

export const Card = styled.div`
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 3px 6px 0px #8a97b1;
  display: flex;
  flex-direction: column;
  max-width: 410px;
  padding: 40px 0 35px 0;
  width: 100%;
  text-align: center;

  svg {
    fill: #e61c1c;
    margin-bottom: 30px;
  }

  h1 {
    color: #404040;
    font-size: 16px;
    margin-bottom: 16px;
  }

  p {
    color: #6d7882;
    padding: 0 30px;
    margin-bottom: 40px;
  }

  .actions {
    .btn {
      border: 0;
      border-radius: 3px;
      font-size: 14px;
      padding: 12px 23px;
      transition: opacity 300ms ease;

      &:hover {
        opacity: 0.9;
      }

      + .btn {
        margin-left: 16px;
      }
    }

    .btn-add {
      background-color: #00305e;
      color: #fff;
      width: 100%;
    }

    .btn-delete {
      background-color: #e61c1c;
      color: #fff;
    }

    .btn-cancel {
      background-color: transparent;
      color: #6d7882;
    }
  }
`;
