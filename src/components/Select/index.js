/* eslint-disable react/prop-types */
import React, { forwardRef, useState, useEffect } from 'react';

const Select = forwardRef(
  (
    {
      name = 'select',
      defaultOption = {},
      options = [],
      placeholder = null,
      onChange = () => {},
    },
    ref
  ) => {
    const [selectedItem, setSelectedItem] = useState();

    useEffect(() => {
      const select = placeholder ? '' : defaultOption.name;
      setSelectedItem(select);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [options]);

    function updateSelect(e) {
      setSelectedItem(ref.current.selectedOptions[0].name);
      onChange(e);
    }

    return (
      <select
        id={name}
        name={name}
        ref={ref}
        value={selectedItem}
        onChange={updateSelect}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>

        {options.map(component => (
          <option key={component.name} id={component.id} value={component.name}>
            {component.title || component.name}
          </option>
        ))}
      </select>
    );
  }
);

export default Select;
