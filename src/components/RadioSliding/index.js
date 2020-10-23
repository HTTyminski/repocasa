import React, { useEffect } from 'react';

import Icon from '../../components/Icons';

import { RadioWrapper } from './styles';

export default function RadioSliding({
  name,
  changeRadio,
  icon,
  opOne,
  opTwo,
}) {
  const blockedIfChecked = () => {
    if (document.getElementById(`${name}-0`).getAttributeNode('checked')) {
      document.getElementById(`${name}-0`).setAttribute('disabled', true);
    }

    document.getElementById(`${name}-0`).addEventListener('click', function() {
      document.getElementById(`${name}-0`).setAttribute('disabled', true);
      document.getElementById(`${name}-1`).removeAttribute('disabled');
    });

    document.getElementById(`${name}-1`).addEventListener('click', function() {
      document.getElementById(`${name}-1`).setAttribute('disabled', true);
      document.getElementById(`${name}-0`).removeAttribute('disabled');
    });
  };

  useEffect(() => {
    blockedIfChecked();
  }, [name]);

  return (
    <RadioWrapper>
      <div className="wrapper section-radio-button">
        <div className="radio-buttons">
          <input
            type="radio"
            id={`${name}-0`}
            className="first"
            onClick={changeRadio}
            name={name}
            value="0"
            defaultChecked
          />
          <label htmlFor={`${name}-0`}>
            {icon ? <Icon name={opOne} /> : opOne}
          </label>
          <input
            type="radio"
            id={`${name}-1`}
            className="second"
            onClick={changeRadio}
            name={name}
            value="1"
          />
          <label htmlFor={`${name}-1`}>
            {icon ? <Icon name={opTwo} /> : opTwo}
          </label>
          <div className="slider"></div>
        </div>
      </div>
    </RadioWrapper>
  );
}
