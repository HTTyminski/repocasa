import React, { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';
import CurrencyInputWrapper from 'react-currency-input';
import { getCurrencySymbol } from '../../util/format';

import { CurrencyInputContainer } from './styles';

export default function CurrencyInput({
  name,
  label,
  onChange,
  value,
  ...rest
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  const [amount, setAmount] = useState(defaultValue);

  const currency = useMemo(() => getCurrencySymbol(), []);

  useEffect(() => {
    setAmount(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <CurrencyInputContainer>
      <label htmlFor={name}>
        {label}
        <CurrencyInputWrapper
          id={name}
          name={name}
          prefix={`${currency} `}
          decimalSeparator=","
          thousandSeparator="."
          ref={ref}
          value={value || amount}
          onChange={onChange}
          {...rest}
        />
        {error && <span>{error}</span>}
      </label>
    </CurrencyInputContainer>
  );
}

CurrencyInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
};

CurrencyInput.defaultProps = {
  label: null,
  onChange: null,
  value: null,
};
