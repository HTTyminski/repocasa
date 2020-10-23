import React from 'react';
import PropTypes from 'prop-types';

import {
  IconCheckBox,
  HiddenCheckBox,
  StyledCheckBox,
  CheckBoxContainer,
} from '../../styles';

export const INVOICE_CHECKBOXES = [
  {
    id: 'checkbox-gas',
    label: 'Gás',
    icon: 'iconGas',
    checked: false,
    value: 'GAS',
  },
  {
    id: 'checkbox-energia',
    label: 'Energia',
    icon: 'iconEnergy',
    checked: false,
    value: 'ELECTRICITY',
  },
  {
    id: 'checkbox-agua',
    label: 'Água',
    icon: 'iconWater',
    checked: false,
    value: 'WATER',
  },
];

export const CheckBoxInvoice = ({ className, checked, ...props }) => {
  return (
    <CheckBoxContainer className={className}>
      <HiddenCheckBox checked={checked} {...props} />
      <StyledCheckBox checked={checked}>
        <IconCheckBox viewBox="0 0 16.34 12">
          <path
            fill="#fff"
            d="M16.1.24a.817.817 0 00-1.155 0l-9.788 9.788-3.763-3.762A.817.817 0 00.239 7.421l4.34 4.34a.817.817 0 001.155 0L16.1 1.395a.817.817 0 000-1.155z"
          />
        </IconCheckBox>
      </StyledCheckBox>
    </CheckBoxContainer>
  );
};

CheckBoxInvoice.propTypes = {
  className: PropTypes.string,
  checked: PropTypes.bool.isRequired,
};

CheckBoxInvoice.defaultProps = {
  className: '',
};
