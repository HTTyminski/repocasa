import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';

import Icon from '../../../components/Icons';
import CurrencyInput from '../../../components/CurrencyInput';

import api from '../../../services/api';
import { consumptionTypes } from '../../../util/consumption/types';
import { MonthEnum } from '../../../enums/month-enum';

import { Dropzone } from '../../../components/Dropzone';

import { Label } from '../../../components/Modal/styles';

function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}

const schema = Yup.object().shape({
  read: Yup.number()
    .positive('O número deve ser maior que zero.')
    .transform(emptyStringToNull)
    .nullable()
    .required('Consumo é obrigatório.'),
  value: Yup.number()
    .positive('O número deve ser maior que zero.')
    .transform(emptyStringToNull)
    .nullable()
    .required('Valor é obrigatório.'),
  attachment: Yup.mixed()
    .nullable()
    .transform(emptyStringToNull)
    .required('Arquivo é obrigatório.'),
});

export default function InvoiceFormModal({ handleClose, item, loadInvoices }) {
  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  const [amount, setAmount] = useState('');

  const [formUploadData, setFormUploadData] = useState(null);

  const setMonth = MonthEnum[item.month_name];
  const setYear = item.year;
  const setTypeConsumption = consumptionTypes.find(
    type => type.value === item.clock_type
  );

  async function handleSubmit(data) {
    try {
      const { read, value } = data;

      const formData = new FormData();

      formData.append('read', read);
      formData.append('value', value);
      formData.append('hotel_id', JSON.parse(hotelID));
      formData.append('invoice_id', item.id);
      formData.append('file', formUploadData);

      await api.put(`/invoices`, formData);

      toast.success('Conta cadastrada com sucesso.');
      handleClose();
      loadInvoices();
    } catch (error) {
      toast.error('Não foi possível cadastrar conta.');
    }
  }

  const handleDropDocument = files => {
    const formData = new FormData();

    formData.append('file', files[0]);
    setFormUploadData(formData);
  };

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
        <h3>Incluir conta de consumo</h3>
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
          <p className="modal__group-title">Mês</p>
          <span className="modal__group-text">
            {setMonth}/{setYear}
          </span>
        </div>
        <div className="modal__group-info">
          <p className="modal__group-title">Relógio</p>
          <span className="modal__group-text">{`Relógio ${setTypeConsumption.name}`}</span>
        </div>
        <Form
          schema={schema}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form__group">
            <Label htmlFor="read" className="label_input">
              Consumo
            </Label>
            <Input
              className="form__input"
              name="read"
              type="number"
              id="read"
              placeholder="Informe o consumo"
            />
          </div>
          <div className="form__group">
            <Label htmlFor="value" className="label_input">
              Valor
            </Label>
            <CurrencyInput
              className="form__input"
              name="value"
              id="value"
              onChange={e => setAmount(e)}
              placeholder="R$ 0,00"
              value={amount}
            />
          </div>
          <div className="form__group">
            <label htmlFor="attachment" className="anexo">
              <Dropzone
                onDrop={handleDropDocument}
                setFormUploadData={setFormUploadData}
                formUploadData={formUploadData}
              />
            </label>
          </div>
          <button ref={buttonRef} className="btn btn-add" type="submit">
            Incluir conta de consumo
          </button>
        </Form>
      </div>
    </>
  );
}

InvoiceFormModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  // item: PropTypes.number,
  loadInvoices: PropTypes.func.isRequired,
};

InvoiceFormModal.defaultProps = {
  // item: null,
};
