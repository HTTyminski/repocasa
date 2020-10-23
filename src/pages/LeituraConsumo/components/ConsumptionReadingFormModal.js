import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import Icon from '../../../components/Icons';
import TimePickerInput from '../../../components/TimePickerInput';

import api from '../../../services/api';

import { Label } from '../../../components/Modal/styles';

function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}

const schema = Yup.object().shape({
  read: Yup.number()
    .positive('Leitura deve ser maior que 0.')
    .transform(emptyStringToNull)
    .nullable()
    .required('Leitura é obrigatória.'),
  read_at: Yup.string()
    .transform(emptyStringToNull)
    .nullable()
    .required('Horário é obrigatória.'),
});

export default function ConsumptionReadingFormModal({
  handleClose,
  item,
  loadClocksConsumption,
  clockListId,
}) {
  const [lastRead, setLastRead] = useState([]);

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelName = useSelector(state => state.user.profile.activeHotelName);
  const clockName = clockListId.find(clock => clock.id === item.clock_id);

  const setDay = item.day;
  const setMonth = item.month;
  const setYear = item.year;

  async function handleSubmit(data) {
    try {
      await api.post(`/hotels/${hotelID}/consumptions`, {
        ...data,
        hotel_id: JSON.parse(hotelID),
        clock_id: clockName.id,
        day: setDay,
        month: setMonth,
        year: setYear,
      });
      toast.success('Leitura de consumo cadastrada com sucesso.');
      handleClose();
      loadClocksConsumption();
    } catch (error) {
      console.log('error.response: ', error.response);
      console.log('error.response.data.errors: ', error.response.data.errors);
      console.log('error.response: ', error.response);
      if (error.response && error.response.data.errors) {
        if (error.response.data.errors[0]) {
          toast.error(error.response.data.errors[0]);
        }
      } else {
        toast.error('Erro ao adicionar leitura de consumo.');
      }
    }
  }

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/hotels/${hotelID}/consumptions`, {
        params: {
          clock_id: item.clock_id,
          year: item.year,
          month: item.month,
          day: item.day,
        },
      });
      const { data } = response;
      setLastRead(data);
    }
    loadData();
  }, [hotelID, item]);

  return (
    <>
      <div className="modal__header">
        <h3>Incluir leitura de consumo</h3>
        <button className="close" type="button" onClick={handleClose}>
          <Icon name="iconDelete" />
        </button>
      </div>
      <div className="modal__body">
        <div className="modal__group-info">
          <span className="modal__group-text">
            Registre o consumo diário das utilities para o hotel
          </span>
        </div>
        <div className="modal__group-info">
          <p className="modal__group-title">Empreendimento</p>
          <span className="modal__group-text">{hotelName}</span>
        </div>
        <div className="modal__group-info">
          <p className="modal__group-title">Data</p>
          <span className="modal__group-text">
            {setDay}/{setMonth}/{setYear}
          </span>
        </div>
        <div className="modal__group-info">
          <p className="modal__group-title">Relógio</p>
          <span className="modal__group-text">
            {clockName && clockName.name}
          </span>
        </div>
        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="form__group">
            <Label htmlFor="read" className="label_input">
              Leitura
            </Label>
            <Input
              className="form__input"
              name="read"
              type="number"
              id="read"
              placeholder="Informe a leitura"
              step="0.01"
            />
          </div>
          <div className="form__group">
            <Label className="label_input">Horário</Label>
            <TimePickerInput name="read_at" format="HH:mm" />
          </div>
          <div className="form__group">
            <label htmlFor="">
              Última leitura: {lastRead.read}
              {lastRead.read_unit_of_measurement}
            </label>
          </div>
          <button className="btn btn-add" type="submit">
            Incluir leitura
          </button>
        </Form>
      </div>
    </>
  );
}

ConsumptionReadingFormModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // item: PropTypes.number,
  loadClocksConsumption: PropTypes.func.isRequired,
};

ConsumptionReadingFormModal.defaultProps = {
  // item: null,
};
