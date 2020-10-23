import styled from 'styled-components';

export const TimePickerInputWrapper = styled.div`
  .react-time-picker {
    display: block;
  }

  .react-time-picker__wrapper {
    border: solid 1px #f6f7ff;
    border-left: solid 3px #00305e;
    border-radius: 0;
    color: #8a97b1;
    display: flex;
    font-size: 12px;
    font-weight: 500;
    height: 47px;
    padding: 0 15px;
    width: 300px;
  }

  .react-time-picker__inputGroup {
    display: flex;
  }

  .react-time-picker__inputGroup__divider,
  .react-time-picker__inputGroup__leadingZero {
    align-self: center !important;
    color: #8a97b1 !important;
  }

  .react-time-picker__inputGroup__divider {
    padding: 0 10px;
  }

  .react-time-picker__inputGroup__leadingZero {
    font-size: 12px !important;
    font-weight: 500 !important;
  }

  .react-time-picker__inputGroup__input {
    color: #8a97b1;
    display: inherit !important;

    &::placeholder {
      color: #ddd;
      /* border-bottom: dashed 1px #8a97b1; */
    }
  }
`;
