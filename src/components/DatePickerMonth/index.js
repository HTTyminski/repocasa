import React, { useRef, useEffect, useState } from 'react';

import ReactDatePicker, { setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';
// import MaskedInput from 'react-text-mask';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { DatePickerInputWrapper } from './styles';
import 'react-datepicker/dist/react-datepicker.css';

setDefaultLocale(pt);

export default function DatePickerMonth({
  name,
  label,
  disabled,
  onChange,
  value,
  ...rest
}) {
  const ref = useRef();
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    if (!value || value !== 'Data inválida') {
      setSelected(value);
    }
  }, [value]);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <DatePickerInputWrapper>
      <label htmlFor={fieldName}>
        {label}
        <ReactDatePicker
          id={fieldName}
          autoComplete="off"
          disabled={disabled}
          // customInput
          name={fieldName}
          selected={selected}
          onChange={date => {
            setSelected(date);
            onChange(date);
          }}
          dateFormat="MMMM/yyyy"
          ref={ref}
          showMonthYearPicker
          {...rest}
        />
        {error && <span>{error}</span>}
      </label>
    </DatePickerInputWrapper>
  );
}

DatePickerMonth.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line
};

DatePickerMonth.defaultProps = {
  label: '',
  disabled: false,
  onChange: () => {},
  value: null,
};
