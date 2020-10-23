import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 3;
`;

export const StyledModal = styled.div`
  background-color: #fff;
  box-shadow: 0px 3px 6px 0px #8a97b1;
  color: #000;
  /* display: none; */
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  max-width: 370px;
  display: flex;
  flex-direction: column;

  @media (max-height: 700px) {
    overflow: hidden;
    height: 90%;
  }

  .modal__header {
    border-bottom: solid 1px #f6f7ff;
    display: flex;
    margin-bottom: 25px;
    padding: 18px 15px;
    position: relative;

    h3 {
      color: #6d7882;
      font-size: 16px;
      font-weight: 400;
    }

    .close {
      appearance: none;
      background-color: transparent;
      border: 0;
      height: 25px;
      margin-left: auto;

      svg {
        fill: #e3e7ff;
      }
    }
  }

  .modal__body {
    padding: 0 34px 33px 34px;
    text-align: center;
    overflow: auto;

    > svg {
      margin-bottom: 30px;

      &.trash {
        fill: #e61c1c;
      }
    }

    strong {
      color: #404040;
      display: block;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    p {
      color: #6d7882;
      font-size: 14px;
    }

    form {
      .btn {
        border-radius: 3px;
        border: 0;
        font-size: 14px;
        margin-top: 2px;
        padding: 12px 23px;
        transition: opacity 300ms ease;

        &:hover {
          opacity: 0.9;
        }
      }

      .btn-add {
        background-color: #00305e;
        color: #fff;
        width: 100%;
      }
    }
  }

  .modal__group-info {
    font-size: 12px;
    margin-bottom: 12px;
    text-align: left;
  }

  .modal__group-title {
    color: #6d7882;
    font-weight: 500;
  }

  .modal__group-text {
    color: #8a97b1;

    strong {
      color: #8a97b1;
      font-size: 12px;
    }
  }

  .form__group {
    text-align: left;
    margin: 0 0 15px;

    span {
      align-self: flex-start;
      animation: 300ms ease-out 0s 1 slideInFromLeft;
      color: #ff2f2f;
      font-size: 11px;
      font-weight: 600;
    }

    label {
      color: #6d7882;
      font-size: 12px;
      font-weight: 700;

      span {
        align-self: flex-start;
        animation: 300ms ease-out 0s 1 slideInFromLeft;
        color: #ff2f2f;
        font-size: 11px;
        font-weight: 600;
      }
    }

    .form__input {
      appearance: none;
      border: solid 1px #f6f7ff;
      border-left: solid 3px #00305e;
      border-radius: 0;
      color: #8a97b1;
      display: block;
      font-size: 12px;
      font-weight: 500;
      height: 47px;
      padding: 0 15px;
      width: 300px;

      &:disabled {
        background-color: #f0f0f0;
      }

      &::placeholder {
        color: #ddd;
        /* border-bottom: dashed 1px #8a97b1; */
      }

      &:focus {
        border-color: #00305e;

        label {
          color: red;
        }
      }
    }

    input[type='file'] {
      padding-top: 15px;
    }

    .anexo {
      margin: 0;
    }
  }

  .modal__footer {
    margin-top: 40px;
    padding: 0 34px 34px;
    text-align: center;

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

export const Label = styled.label`
  color: #6d7882;
  font-size: 12px;
  font-weight: 700;
  position: relative;
  bottom: -9px;
  margin-left: 20px;
  background: ${props => (props.disabled ? '' : '#fff')};
  padding: 0 5px;
  z-index: ${props => (props.calendarOpen ? 0 : 1)};
`;
