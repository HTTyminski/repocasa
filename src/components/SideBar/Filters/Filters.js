import React from 'react';

import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import moment from 'moment';
/**
 * TODO: melhorar isso generalizando os imports
 */
import * as ClockActions from '../../../store/modules/consumo/clock/actions';
import * as ReceitaActions from '../../../store/modules/consumo/receita/actions';
import * as InvoiceActions from '../../../store/modules/consumo/invoice/actions';
import * as AnnualPlanningActions from '../../../store/modules/consumo/annualplanning/actions';
import * as ConsumptionHotelActions from '../../../store/modules/consumo/consumptionhotel/actions';
import * as ConsumptionReadingActions from '../../../store/modules/consumo/consumptionreading/actions';
import * as GeneralConsumptionActions from '../../../store/modules/consumo/generalconsumption/actions';

import Icon from '../../Icons';

import { DateMonth } from './components/DateMonth';
import { MultiSelect } from './components/MultiSelect';
import { MultiSelectHotel } from './components/MultiSelectHotel';
import { CheckBoxClock, CLOCK_CHECKBOXES } from './components/CheckBoxClock';
import {
  CheckBoxConsumptionHotel,
  CONSUMPTIONHOTEL_CHECKBOXES,
} from './components/CheckBoxConsumptionHotel';
import {
  CheckBoxConsumptionReading,
  CONSUMPTIONREADING_CHECKBOXES,
} from './components/CheckBoxConsumptionReading';
import {
  CheckBoxInvoice,
  INVOICE_CHECKBOXES,
} from './components/CheckBoxInvoice';

import { consumptionTypes } from '../../../util/consumption/types';
import { DateRangeMonth } from './components/DateRangeMonth';

// renderiza o os componentes de filtro e manipula o redux
const ClockFilters = () => {
  const checkBoxValues = useSelector(state => state.clock.consumption);

  const dispatch = useDispatch();

  const handleCheckboxChange = event => {
    const { value } = event.target;

    dispatch(ClockActions.changeClockCheckboxAction(value));
  };

  return (
    <div className="aside__content">
      <span className="aside__content-title">Consumo:</span>
      {CLOCK_CHECKBOXES.map(checkbox => {
        const isChecked = checkBoxValues.includes(checkbox.value);

        const checkedClass = isChecked ? 'aside__content-button--selected' : '';

        return (
          <label
            key={checkbox.id}
            htmlFor={checkbox.id}
            className={`aside__content-button ${checkedClass}`}
          >
            <span>
              <Icon name={checkbox.icon} />
              <span>{checkbox.label}</span>
            </span>
            <CheckBoxClock
              id={checkbox.id}
              name={checkbox.name}
              value={checkbox.value}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        );
      })}
    </div>
  );
};

const ReceitaFilters = () => {
  const dispatch = useDispatch();
  const receita = useSelector(state => state.receita);

  const handleChangeDate = newDate => {
    dispatch(ReceitaActions.changeDateAction(newDate));
  };

  return (
    <div className="aside__content">
      <DateMonth
        onChange={handleChangeDate}
        value={receita.date}
        dateFormat="yyyy"
        showYearPicker
      />
    </div>
  );
};

const AnnualPlanningFilters = () => {
  const dispatch = useDispatch();
  const annualplanning = useSelector(state => state.annualplanning);

  const handleChangeDate = newDate => {
    dispatch(AnnualPlanningActions.changeDateAction(newDate));
  };

  return (
    <div className="aside__content">
      <DateMonth onChange={handleChangeDate} value={annualplanning.date} />
    </div>
  );
};

const ConsumptionReadingFilters = () => {
  const dispatch = useDispatch();
  const consumptionreading = useSelector(state => state.consumptionreading);
  const checkBoxValues = useSelector(
    state => state.consumptionreading.consumption
  );

  const handleChangeDate = newDate => {
    dispatch(ConsumptionReadingActions.changeDateAction(newDate));
  };

  const handleCheckboxChange = event => {
    const { value } = event.target;

    dispatch(
      ConsumptionReadingActions.changeConsumptionReadingboxAction(value)
    );
  };

  return (
    <div className="aside__content">
      <DateMonth onChange={handleChangeDate} value={consumptionreading.date} />

      <span className="aside__content-title">Consumo:</span>
      {CONSUMPTIONREADING_CHECKBOXES.map(checkbox => {
        const isChecked = checkBoxValues.includes(checkbox.value);
        const checkedClass = isChecked ? 'aside__content-button--selected' : '';
        return (
          <label
            key={checkbox.id}
            htmlFor={checkbox.id}
            className={`aside__content-button ${checkedClass}`}
          >
            <span>
              <Icon name={checkbox.icon} />
              <span>{checkbox.label}</span>
            </span>
            <CheckBoxConsumptionReading
              id={checkbox.id}
              name={checkbox.id}
              value={checkbox.value}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        );
      })}
    </div>
  );
};

const InvoiceFilters = () => {
  const dispatch = useDispatch();
  const invoice = useSelector(state => state.invoice);
  const checkBoxValues = useSelector(state => state.invoice.consumption);

  const handleChangeDate = newDate => {
    dispatch(InvoiceActions.changeDateAction(newDate));
  };

  const handleCheckboxChange = event => {
    const { value } = event.target;

    dispatch(InvoiceActions.changeInvoiceCheckboxAction(value));
  };

  return (
    <div className="aside__content">
      <DateMonth
        onChange={handleChangeDate}
        value={invoice.date}
        dateFormat="yyyy"
        showYearPicker
      />

      <span className="aside__content-title">Consumo:</span>
      {INVOICE_CHECKBOXES.map(checkbox => {
        const isChecked = checkBoxValues.includes(checkbox.value);
        const checkedClass = isChecked ? 'aside__content-button--selected' : '';
        return (
          <label
            key={checkbox.id}
            htmlFor={checkbox.id}
            className={`aside__content-button ${checkedClass}`}
          >
            <span>
              <Icon name={checkbox.icon} />
              <span>{checkbox.label}</span>
            </span>
            <CheckBoxInvoice
              id={checkbox.id}
              name={checkbox.id}
              value={checkbox.value}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        );
      })}
    </div>
  );
};

const ConsumptionHotelFilters = () => {
  const dispatch = useDispatch();
  const consumptionhotel = useSelector(state => state.consumptionhotel);
  const { start, end } = useSelector(state => state.consumptionhotel);

  const optionsConsumptionHotel = useSelector(state => state.consumptionhotel);
  const clockConfig = consumptionTypes.find(
    a => a.value === optionsConsumptionHotel.consumption[0]
  );

  const checkBoxValues = useSelector(
    state => state.consumptionhotel.consumption
  );

  const handleChangeDate = ({ startDate: start, endDate: end }) => {
    if (!end) return;

    dispatch(
      ConsumptionHotelActions.changeDateAction(moment(start), moment(end))
    );
  };

  const handleCheckboxChange = event => {
    const { value } = event.target;
    dispatch(
      ConsumptionHotelActions.changeConsumptionHotelCheckboxAction(value)
    );
  };

  const handleSelect = newSelect => {
    dispatch(ConsumptionHotelActions.selectMultiAction(newSelect));
  };

  let showClocks = true;
  if (consumptionhotel.consumption) {
    showClocks = consumptionhotel.consumption[0] === 'UTILITIES' ? false : true;
  }

  return (
    <div className="aside__content">
      <DateRangeMonth
        name="dateRange"
        start={start}
        onDatesChange={handleChangeDate}
      />

      <span className="aside__content-title">Consumo:</span>
      {CONSUMPTIONHOTEL_CHECKBOXES.map(checkbox => {
        const isChecked = checkBoxValues.includes(checkbox.value);
        const checkedClass = isChecked ? 'aside__content-button--selected' : '';
        return (
          <label
            key={checkbox.id}
            htmlFor={checkbox.id}
            className={`aside__content-button ${checkedClass}`}
          >
            <span>
              <Icon name={checkbox.icon} />
              <span>{checkbox.label}</span>
            </span>
            <CheckBoxConsumptionHotel
              id={checkbox.id}
              name={checkbox.id}
              value={checkbox.value}
              checked={isChecked}
              onChange={handleCheckboxChange}
            />
          </label>
        );
      })}

      {showClocks ? (
        <MultiSelect
          clockConfig={clockConfig}
          onChange={handleSelect}
          value={consumptionhotel.select}
        />
      ) : (
        ''
      )}
    </div>
  );
};

const GeneralConsumptionFilters = () => {
  const dispatch = useDispatch();
  const generalconsumption = useSelector(state => state.generalconsumption);

  const handleChangeDate = newDate => {
    dispatch(GeneralConsumptionActions.changeDateAction(newDate));
  };

  const handleSelect = newSelect => {
    dispatch(GeneralConsumptionActions.selectMultiAction(newSelect));
  };

  return (
    <div className="aside__content">
      <DateMonth onChange={handleChangeDate} value={generalconsumption.date} />
      <MultiSelectHotel
        onChange={handleSelect}
        value={generalconsumption.select}
      />
    </div>
  );
};

// responsavel somente para chamar o componente de filtro para renderizar na tela conforme a rota
export const Filters = () => {
  const { pathname } = useLocation();

  // se entrar nessa rota renderiza esse filtro
  if (pathname.indexOf('dashboard/consumo/relogios') > -1) {
    return <ClockFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/receita') > -1) {
    return <ReceitaFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/planejamento-anual') > -1) {
    return <AnnualPlanningFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/leitura-consumo') > -1) {
    return <ConsumptionReadingFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/contas') > -1) {
    return <InvoiceFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/consumo-hotel') > -1) {
    return <ConsumptionHotelFilters />;
  }

  if (pathname.indexOf('dashboard/consumo/consumo-geral') > -1) {
    return <GeneralConsumptionFilters />;
  }

  return null;
};
