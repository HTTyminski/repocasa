import styled from 'styled-components';
import iconCalendar from '../../assets/svg/icon-calendario.svg';

export const DatePickerInputWrapper = styled.div`
  margin-top: 28px;

  label {
    color: #6d7882;
    font-weight: 500;
    margin-top: 28px;
  }

  .react-datepicker-wrapper {
    display: block;

    .react-datepicker__input-container {
      background: url(${iconCalendar});
      background-repeat: no-repeat;
      background-position: center right;
      border-bottom: solid 1px #00305e;
      /* margin-top: 15px; */

      input {
        background-color: transparent;
        border: 0;
        color: #6d7882;
        font-size: 12px;
        padding: 8.5px 0;
        width: 100%;
      }
    }
  }

  .react-datepicker__month .react-datepicker__month-text, .react-datepicker__month .react-datepicker__quarter-text {
    display: inline-block;
    width: 4rem;
    text-transform: capitalize;
    font-size: 15px;
    font-weight: 400;
    color: #00305e;
    border: 1px solid white;
    height: 35px !important;
    padding: 7px;
  }
  .react-datepicker__month--selected, .react-datepicker__month--in-selecting-range, .react-datepicker__month--in-range, .react-datepicker__quarter--selected, .react-datepicker__quarter--in-selecting-range, .react-datepicker__quarter--in-range {
    border-radius: 0px;
    background-color: #00305e;
    margin: 0 !important;
    padding: 7px;
    height: 30px;
    top: 0 !important;
    color: #fff !important;
  }
  .react-datepicker__month-text:hover, .react-datepicker__quarter-text:hover {
    background-color: white;
    border: 1px solid #00305e;
    border-radius: 0px;
  }
  .react-datepicker__header {
    text-align: center;
    background-color: white;
    border-bottom: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    padding: 14px;
    position: relative;
    border: 0px !important;
  }
  .react-datepicker {
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 0.8rem;
    background-color: #fff;
    color: #00305e;
    border: 0px;
    border-radius: 0.2rem;
    display: inline-block;
    position: relative;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, .5);
  }
  .react-datepicker__month-text.react-datepicker__month--selected:hover {
    background-color: #00305ead;
  }
`;
