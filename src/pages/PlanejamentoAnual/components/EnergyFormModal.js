import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form } from '@rocketseat/unform';

import Icon from '../../../components/Icons';
import CurrencyInput from '../../../components/CurrencyInput';

import api from '../../../services/api';

import { Label } from '../../../components/Modal/styles';

const schema = Yup.object().shape({
  electricity_consumption: Yup.number()
    // .positive('Valor deve ser maior que 0.')
    .required('Valor é obrigatório.'),
});

export default function EnergyFormModal({ handleClose, item, loadPlanning }) {
  const [initialData, setInitialData] = useState();
  const [isEdit, setEdit] = useState(false);
  const [planning, setPlanning] = useState([]);

  console.log('Form data energy', item); // eslint-disable-line

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  async function handleSubmit(data) {
    const { electricity_consumption } = data;

    await api.put(`/annual-plans/${item}`, {
      hotel_id: hotelID,
      electricity_consumption,
    });

    toast.success('Valor de energia cadastrado com sucesso.');

    handleClose();
    loadPlanning();
  }

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/annual-plans/${item}`, {
        params: {
          hotel_id: hotelID,
        },
      });

      const { data } = response;

      if (data.electricity_consumption !== 0) {
        setEdit(true);
      }

      setInitialData({
        ...data,
      });

      setPlanning(data);
    }
    loadData();
  }, [hotelID, item]);

  const buttonRef = useRef();

  useEffect(() => {
    const { current } = buttonRef;

    const handleFocus = () => (current.style.opacity = '0.8');
    const handleBlur = () => (current.style.opacity = '1');

    current.addEventListener('focusin', handleFocus);
    current.addEventListener('blur', handleBlur);

    return () => {
      current.removeEventListener('focusin', handleFocus);
      current.removeEventListener('blur', handleBlur);
    };
  }, []);

  return (
    <>
      <div className="modal__header">
        {isEdit ? <h3>Editar planejamento</h3> : <h3>Incluir planejamento</h3>}
        <button className="close" type="button" onClick={handleClose}>
          <Icon name="iconDelete" />
        </button>
      </div>
      <div className="modal__body">
        <div className="modal__group-info">
          <span className="modal__group-text">
            Planeje o valor de receita mensal por Unidade
            <br />
            Habitacional para cada ano.
          </span>
        </div>
        <div className="modal__group-info">
          <p className="modal__group-title">Empreendimento</p>
          <span className="modal__group-text">{hotelName}</span>
        </div>
        <Form schema={schema} onSubmit={handleSubmit} initialData={initialData}>
          <div className="modal__group-info">
            <p className="modal__group-title">Mês</p>
            <span className="modal__group-text">
              {planning.month_name} / {planning.year}
            </span>
          </div>
          <div className="form__group">
            <Label className="label_input">Valor</Label>
            <CurrencyInput
              className="form__input"
              name="electricity_consumption"
              onChange={() => {}}
            />
          </div>
          <button ref={buttonRef} className="btn btn-add" type="submit">
            {isEdit ? 'Concluir edição' : 'Incluir planejamento'}
          </button>
        </Form>
      </div>
    </>
  );
}

EnergyFormModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.number,
  loadPlanning: PropTypes.func.isRequired,
};

EnergyFormModal.defaultProps = {
  item: null,
};
