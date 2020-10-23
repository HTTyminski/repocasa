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
  value: Yup.number()
    .positive('Receita deve ser maior que 0.')
    .required('Receita é obrigatória.'),
});

export default function IncomeFormModal({ handleClose, item, loadIncome }) {
  const [income, setIcome] = useState([]);
  const [initialData, setInitialData] = useState();
  const [isEdit, setEdit] = useState(false);

  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  const buttonRef = useRef(null);

  async function handleSubmit(data) {
    const { id_financial_income = item, value } = data;

    await api.put(`/financial-incomes/${item}`, { id_financial_income, value });

    if (isEdit) {
      toast.success('Receita mensal editada com sucesso.');
    } else {
      toast.success('Receita mensal cadastrada com sucesso.');
    }

    handleClose();
    loadIncome();
  }

  useEffect(() => {
    async function loadData() {
      const response = await api.get(`/financial-incomes/${item}`, {
        params: {},
      });

      const { data } = response;

      if (data.value) {
        setEdit(true);
      }

      setInitialData({
        ...data,
      });

      setIcome(data);
    }
    loadData();
  }, [item]);

  useEffect(() => {
    document.getElementById('income').focus();

    buttonRef.current.addEventListener('focus', function() {
      document.getElementById('button').setAttribute('style', 'opacity: 0.7');
    });

    buttonRef.current.addEventListener('blur', function() {
      document.getElementById('button').removeAttribute('style', 'opacity: 0');
    });
  }, []);

  return (
    <>
      <div className="modal__header">
        {isEdit ? <h3>Editar receita</h3> : <h3>Incluir receita</h3>}
        <button className="close" type="button" onClick={handleClose}>
          <Icon name="iconDelete" />
        </button>
      </div>
      <div className="modal__body">
        <div className="modal__group-info">
          <span className="modal__group-text">
            Cadastre a Receita realizada pelo hotel
            <br />
            mensalmente para que possa comparar
            <br />a receita orçada x a realizada.
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
              {income.month} / {income.year}
            </span>
          </div>
          <div className="form__group">
            <Label className="label_input">Receita</Label>
            <CurrencyInput
              id="income"
              className="form__input"
              name="value"
              onChange={() => {}}
            />
          </div>
          <button
            className="btn btn-add"
            type="submit"
            id="button"
            ref={buttonRef}
          >
            {isEdit ? 'Concluir edição' : 'Incluir receita'}
          </button>
        </Form>
      </div>
    </>
  );
}

IncomeFormModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  item: PropTypes.number,
  loadIncome: PropTypes.func.isRequired,
};

IncomeFormModal.defaultProps = {
  item: null,
};
