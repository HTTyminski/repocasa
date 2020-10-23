import React, { useState } from 'react';

import ModalWrapper from './ModalWrapper';

export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  const RenderModal = ({ children }) => (
    <>
      {isVisible && <ModalWrapper closeModal={hide}>{children}</ModalWrapper>}
    </>
  );

  return {
    show,
    hide,
    RenderModal,
  };
};
