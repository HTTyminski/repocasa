import styled from 'styled-components';

export const CurrencyInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  label {
    align-items: flex-start;
    color: #6d7882;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    font-weight: bold;

    input {
      border-left: solid 3px #00305e;
      border-radius: 0;
      border: solid 1px #f6f7ff;
      color: #8a97b1;
      display: flex;
      font-size: 12px;
      font-weight: 500;
      height: 47px;
      padding: 0 15px;
      width: 300px;

      &::placeholder {
        color: #ddd;
      }
    }
  }
`;
