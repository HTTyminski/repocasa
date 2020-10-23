import React, { useState } from 'react';
import './style.css';

// import { StyledMenuItem } from './style';

const MenuCollapsable = ({ children, route }) => {
  const [open, setOpen] = useState();

  return (
    <>
      <li onClick={() => setOpen(!open)}>{route.text}</li>
      <li className={open ? 'submenu open' : 'submenu hidden'}>
        <ul>{children}</ul>
      </li>
    </>
  );
};

const MenuItem = ({ route }) => {
  return (
    <li primary key={route.id}>
      {route.text}
    </li>
  );
};

const Menu = ({ routes }) => {
  return (
    <ul>
      {routes.map(route => {
        if (route.routes) {
          return (
            <MenuCollapsable route={route}>
              <Menu routes={route.routes} />
            </MenuCollapsable>
          );
        }

        return <MenuItem route={route} />;
      })}
    </ul>
  );
};

export default Menu;
