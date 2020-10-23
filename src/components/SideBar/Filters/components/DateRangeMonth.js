import React, { useRef, useState } from 'react';

import DateRangePicker from 'react-datepicker';

import PropTypes from 'prop-types';
import momentPropTypes from 'react-moment-proptypes';

import moment from 'moment';

import DateRangePickerWrapper from '../../../DateRangePickerInput';

export const DateRangeMonth = ({ name, start, onDatesChange }) => {
  const ref = useRef(null);

  const [startDate, setStartDate] = useState(start._d);
  const [endDate, setEndDate] = useState(undefined);
  const [selectionComplete, toggleSelectionComplete] = useState(false);

  const handleDateChange = date => {
    if (!selectionComplete && !startDate) {
      setStartDate(date);
      onDatesChange({ startDate: date });
      return;
    }

    if (!selectionComplete && startDate && !endDate) {
      setEndDate(date);
      onDatesChange({ startDate, endDate: date });
      toggleSelectionComplete(true);

      return;
    }

    if (selectionComplete && startDate && endDate) {
      setStartDate(date);
      setEndDate(undefined);
      toggleSelectionComplete(false);
    }
  };

  const sameDay = (d1, d2) => {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleSelect = date => {
    if (
      !selectionComplete &&
      startDate &&
      !endDate &&
      sameDay(date, startDate)
    ) {
      handleDateChange(date);
    }
  };

  const formatDate = () => {
    return `${
      startDate
        ? moment(startDate).format('MM/YYYY')
        : moment(new Date()).format('MM/YYYY')
    } - ${endDate ? moment(endDate).format('MM/YYYY') : 'Final'}`;
  };

  return (
    <DateRangePickerWrapper>
      <>
        <div className="date-range">
          <DateRangePicker
            name={name}
            selected={startDate || new Date()}
            onChange={handleDateChange}
            onSelect={handleSelect}
            selectsEnd={Boolean(startDate)}
            startDate={startDate}
            endDate={endDate}
            showMonthYearPicker
            dateFormat="MM/yyyy"
            ref={ref}
            maxDate={moment(new Date()).add(-1, 'month')._d}
            value={formatDate()}
          />
        </div>
      </>
    </DateRangePickerWrapper>
  );
};

DateRangeMonth.propTypes = {
  onDatesChange: PropTypes.func,
  name: PropTypes.string,
  start: momentPropTypes.momentObj,
};

DateRangeMonth.defaultProps = {
  onDatesChange: () => {},
  name: '',
  start: '',
};
