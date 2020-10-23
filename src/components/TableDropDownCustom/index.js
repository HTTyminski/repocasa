import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import Icon from '../Icons';
import useOutsideClick from '../../hook/useOutsideClick';

import { TableDropDownWrapper } from './styles';

export default function TableDropDownCustom({ children }) {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const menu = childrenArray
    .filter(c => !c.props.fixed)
    .map(c =>
      React.cloneElement(c, {
        onClick: e => {
          setOpen(false);
          return c.props.onClick(e);
        },
      })
    );

  useOutsideClick(ref, () => setOpen(false));

  return (
    <TableDropDownWrapper className="actions" ref={ref}>
      <button type="button" onClick={() => setOpen(!open)}>
        <Icon name="iconMore" />
      </button>
      {open && <nav>{menu}</nav>}
    </TableDropDownWrapper>
  );
}

TableDropDownCustom.propTypes = {
  children: PropTypes.node.isRequired,
};
