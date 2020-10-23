import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';

import Icon from '../../../components/Icons';

import api from '../../../services/api';

import { Label } from '../../../components/Modal/styles';

function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}

const schema = Yup.object().shape({
  pax: Yup.number()
    .positive('O número deve ser maior que zero.')
    .transform(emptyStringToNull)
    .nullable()
    .required('PAX é obrigatória.'),
  uhs: Yup.number()
    .positive('O número deve ser maior que zero.')
    .transform(emptyStringToNull)
    .nullable()
    .required('UHs é obrigatória.'),
});

export default function UhsPaxFormModal({ handleClose, item, loadOccupation }) {
  console.log('Form data occupation', item); // eslint-disable-line

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  const setDay = item.day;
  const setMonth = item.month;
  const setYear = item.year;
  const formattedDate = `${setYear}/${setMonth}/${setDay}`;

  async function handleSubmit(data) {
    try {
      await api.post(`/hotels/${hotelID}/occupations`, {
        ...data,
        hotel_id: JSON.parse(hotelID),
        date: new Date(formattedDate),
      });
      toast.success('UHs e PAX cadastrado com sucesso.');
      handleClose();
      loadOccupation();
    } catch (error) {
      toast.error('Erro ao adicionar.');
    }
  }

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
        <h3>Incluir UHs e PAX</h3>
        <button className="close" type="button" onClick={handleClose}>
          <Icon name="iconDelete" />
        </button>
      </div>
      <div className="modal__body">
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
        <Form schema={schema} onSubmit={handleSubmit}>
          <div className="form__group">
            <Label htmlFor="uhs" className="label_input">
              UHs
            </Label>
            <Input
              className="form__input"
              name="uhs"
              type="number"
              id="uhs"
              placeholder=""
              autoComplete="off"
            />
          </div>
          <div className="form__group">
            <Label htmlFor="pax" className="label_input">
              PAX
            </Label>
            <Input
              className="form__input"
              name="pax"
              type="number"
              id="pax"
              placeholder=""
            />
          </div>
          <button ref={buttonRef} className="btn btn-add" type="submit">
            Incluir
          </button>
        </Form>
      </div>
    </>
  );
}

UhsPaxFormModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // item: PropTypes.number,
  loadOccupation: PropTypes.func.isRequired,
};

UhsPaxFormModal.defaultProps = {
  // item: null,
};
