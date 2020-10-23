import React, { useRef, useEffect, useState } from 'react';

import TimePicker from 'react-time-picker';

import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import { TimePickerInputWrapper } from './styles';

export default function TimePickerInput({
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
    if (!value || value !== 'Hora inválida') {
      setSelected(value);
    }
  }, [value]);

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

  useEffect(() => {
    if (ref.current) {
      ref.current.wrapper.addEventListener('focusin', function() {
        ref.current.wrapper.style.border = '1px solid #00305e';
      });
      ref.current.wrapper.addEventListener('focusout', function() {
        ref.current.wrapper.style.border = '0';
      });
    }
  }, []);

  return (
    <TimePickerInputWrapper>
      <label htmlFor={fieldName}>
        {label}
        <TimePicker
          value={value}
          disableClock
          clearIcon={false}
          hourPlaceholder="00"
          minutePlaceholder="00"
          id={fieldName}
          autoComplete="off"
          disabled={disabled}
          name={fieldName}
          selected={selected}
          onChange={time => {
            setSelected(time);
            onChange(time);
          }}
          ref={ref}
          {...rest} // eslint-disable-line
        />
        {error && <span>{error}</span>}
      </label>
    </TimePickerInputWrapper>
  );
}

TimePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.any, // eslint-disable-line
};

TimePickerInput.defaultProps = {
  label: '',
  disabled: false,
  onChange: () => {},
  value: null,
};
