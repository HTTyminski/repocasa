import React, { useState } from 'react';

import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import { DateRangePicker } from 'react-dates';
import DateRangePickerWrapper from '../../../DateRangePickerInput';

export const DateRange = ({ startDate, endDate, onDatesChange, ...props }) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const falseFunc = () => false;

  return (
    <>
      <span className="aside__content-title">Período:</span>
      <DateRangePickerWrapper>
        <DateRangePicker
          startDatePlaceholderText="Início"
          endDatePlaceholderText="Final"
          startDate={startDate}
          startDateId="start_date_id"
          endDate={endDate}
          endDateId="end_date_id"
          onDatesChange={onDatesChange}
          focusedInput={focusedInput}
          onFocusChange={setFocusedInput}
          isOutsideRange={falseFunc}
          {...props}
        />
      </DateRangePickerWrapper>
    </>
  );
};

DateRange.propTypes = {
  startDate: momentPropTypes.momentObj,
  endDate: momentPropTypes.momentObj,
  onDatesChange: PropTypes.func,
};

DateRange.defaultProps = {
  startDate: '',
  endDate: '',
  onDatesChange: () => {},
};
