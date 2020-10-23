import styled from 'styled-components';
import iconCalendar from '../../assets/svg/icon-calendario.svg';

const DateRangePickerWrapper = styled.div`
  background: url(${iconCalendar});
  background-repeat: no-repeat;
  background-position: top right;
  border-bottom: solid 1px #00305e;
  margin-top: 15px;

  .react-datepicker__input-container {
    > input {
      border: 0;
    }
  }

  .DateRangePickerInput__withBorder {
    border: 0;
  }

  .DateInput {
    width: 70px;
  }

  .DateInput_input {
    color: #6d7882;
    font-size: 12px;
    font-weight: 400;
    padding: 0;

    &__focused {
      border-color: #00305e;
      border-width: 0;
    }
  }

  .DateRangePickerInput_arrow {
    width: 15px;

    svg {
      display: none;
    }

    &:before {
      content: '-';
      display: block;
    }
  }
`;

export default DateRangePickerWrapper;
