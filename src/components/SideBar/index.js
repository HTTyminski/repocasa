import React, { useContext } from 'react';

import moment from 'moment';
import ptLocale from 'moment/locale/pt-br';

import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Icon from '../Icons';
import { SidebarContext } from './SidebarContext';
import { Filters } from './Filters/Filters';
import { StyledSideBar } from './styles';

moment.updateLocale('pt-br', ptLocale);

const Sidebar = () => {
  const { visible: open, setVisible: setOpen } = useContext(SidebarContext);
  // const [startDate, setStartDate] = useState(null);
  // const [endDate, setEndDate] = useState(null);
  // const [focusedInput, setFocusedInput] = useState(null);
  // const [checkboxes, setCheckboxes] = useState(DEFAULT_CHECKBOXES);

  // const handleCheckboxChange = useCallback(
  //   e => {
  //     const { name, checked } = e.target;
  //     if (checked) {
  //       e.target.parentNode.parentElement.classList.add(
  //         'aside__content-button--selected'
  //       );
  //     } else {
  //       e.target.parentNode.parentElement.classList.remove(
  //         'aside__content-button--selected'
  //       );
  //     }

  //     setCheckboxes([
  //       ...checkboxes.map(checkbox =>
  //         checkbox.id === e.target.name
  //           ? { ...checkbox, id: name, checked }
  //           : checkbox
  //       ),
  //     ]);
  //   },
  //   [checkboxes]
  // );

  return (
    <StyledSideBar open={open}>
      <div className="aside__header">
        <div className="aside__header-title">
          <Icon name="iconFilter" />
          <span>Filtros</span>
        </div>
        <a
          href="'#"
          className="aside__header-button"
          type="button"
          aria-label="Filter button"
          open={open}
          onClick={e => {
            e.preventDefault();
            setOpen(!open);
          }}
        >
          <Icon name="iconArrowRight" />
        </a>
      </div>
      <Filters />
    </StyledSideBar>
  );
};

export default Sidebar;
