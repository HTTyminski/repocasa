import React from 'react';
// import PropTypes from 'prop-types';

import { Overlay, StyledModal } from './styles';

const Modal = ({
  children,
  id,
  name,
  initial_read,
  read_at_date,
  read_at_time,
}) => (
  <Overlay>
    <StyledModal>{children}</StyledModal>
  </Overlay>
);

export default Modal;
