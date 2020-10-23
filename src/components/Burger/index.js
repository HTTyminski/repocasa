import React, { useContext } from 'react';

import { ReactComponent as IconFiltro } from '../../assets/svg/icon-filtro.svg';
import { SidebarContext } from '../SideBar/SidebarContext';
import { StyledBurger } from './styles';

const Burger = () => {
  const { visible, setVisible } = useContext(SidebarContext);
  const handleClick = e => {
    e.preventDefault();
    setVisible(!visible);
  };

  return (
    <StyledBurger>
      <a
        href="'#"
        className="filter__icon"
        type="button"
        aria-label="Filter button"
        open={visible}
        onClick={handleClick}
      >
        <IconFiltro />
      </a>
    </StyledBurger>
  );
};

export default Burger;
