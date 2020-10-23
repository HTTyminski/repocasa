import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Select from 'react-select';

import { useField } from '@rocketseat/unform';

import { MultiSelectWrapper } from './styles';

export default function MultiSelectInput({
  name,
  label,
  options,
  multiple,
  onChange,
  ...rest
}) {
  const ref = useRef(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);

  function parseSelectValue(selectRef) {
    const selectValue = selectRef.state.value;

    if (!multiple) {
      return selectValue ? selectValue.id : '';
    }

    return selectValue ? selectValue.map(option => option.value) : [];
  }

  const [test, setTest] = useState();

  useEffect(() => {
    if (defaultValue) {
      if (!multiple && defaultValue.includes) {
        setTest(options.filter(option => defaultValue.includes(option.value)));
      }

      setTest(options.find(option => option.value === defaultValue));
    }
  }, [defaultValue, multiple, options, test]);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  return (
    <MultiSelectWrapper>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <Select
        name={fieldName}
        aria-label={fieldName}
        label="Hotéis:"
        value={test}
        options={options.map(el => ({
          value: el.value,
          label: el.label,
          sigla: el.sigla,
        }))}
        ref={ref}
        loadingMessage={() => 'Carregando...'}
        getOptionValue={option => option.value}
        getOptionLabel={option =>
          `${option.label
            .split(' ')
            .map(elem => elem.substr(0, 1))
            .join()
            .normalize('NFD')
            .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
            .toUpperCase()}-${option.label}`
        }
        onChange={value => {
          setTest(value);
          onChange(value);
        }}
        {...rest}
      />

      {error && <span>{error}</span>}
    </MultiSelectWrapper>
  );
}

MultiSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.oneOfType([PropTypes.array]).isRequired,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
};

MultiSelectInput.defaultProps = {
  multiple: false,
  onChange: () => {},
};
