import React, { useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import ReactSelect from 'react-select';

export const Select = ({ name, label, options, value, ...others }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'state.value',
      getValue: ref => {
        if (others.isMulti) {
          if (!ref.state.value) return [];

          return ref.state.value.map(option => option.value);
        }

        if (!ref.state.value) return '';

        return ref.state.value.value;
      },
    });
  }, [fieldName, registerField, others.isMulti]);

  const customStyles = {
    control: base => ({
      ...base,
      height: '30px',
      width: '470px',
      border: '0',
      boxShadow: 'none',
    }),
    valueContainer: base => ({
      ...base,
      height: '30px',
      padding: '0 8px',
    }),
    singleValue: base => ({
      ...base,
      display: 'contents',
    }),
    indicatorsContainer: base => ({
      ...base,
      display: 'none',
    }),
  };

  return (
    <>
      {label && <label htmlFor={name}>{label}</label>}

      <ReactSelect
        ref={selectRef}
        styles={customStyles}
        classNamePrefix="react-select"
        menuIsOpen={others.menuIsOpen}
        placeholder="Selecione..."
        options={options}
        value={defaultValue}
        noOptionsMessage={() => 'Nenhum item foi encontrado.'}
        {...others}
      />

      {error && <span>{error}</span>}
    </>
  );
};

export default Select;
