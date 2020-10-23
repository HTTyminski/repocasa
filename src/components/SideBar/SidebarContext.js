import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const SidebarContext = createContext({
  visible: false,
});

export const SidebarProvider = ({ children }) => {
  const [visible, setVisible] = useState(true);

  return (
    <SidebarContext.Provider value={{ visible, setVisible }}>
      {children}
    </SidebarContext.Provider>
  );
};

SidebarProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
