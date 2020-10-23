import React from 'react';
import ReactDOM from 'react-dom';

import Modal from '../../components/Modal';

const ModalWrapper = React.memo(({ children }) => {
  const domEl = document.getElementById('modal-root');

  if (!domEl) return null;

  return ReactDOM.createPortal(<Modal>{children}</Modal>, domEl);
});

export default ModalWrapper;
