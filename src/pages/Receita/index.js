import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { TableWrapper } from './styles';

import { useModal } from '../../hook/useModal';

import Icon from '../../components/Icons';
import LoadLine from '../../components/LoadLine';
import Container from '../../components/Container';
import ButtonAdd from '../../components/ButtonAdd';
import ConfirmAlert from '../../components/ConfirmAlert';
import IncomeFormModal from './components/IncomeFormModal';
import TableDropDownCustom from '../../components/TableDropDownCustom';

import api from '../../services/api';

import { changeDateAction } from '../../store/modules/consumo/receita/actions';
import { MonthEnum } from '../../enums/month-enum';

export default function Receita() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [income, setIncome] = useState([]);
  const [payload, setPayload] = useState({});
  const { RenderModal: IncomeModalWrapper, ...incomeHook } = useModal();

  const receita = useSelector(state => state.receita);
  const hotelID = useSelector(state => state.user.profile.activeHotel);

  const loadIncome = useCallback(async () => {
    try {
      setLoading(true);
      if (receita.date === null) {
        return;
      }
      const setYear = receita.date.getFullYear();
      const response = await api.get('/financial-incomes', {
        params: {
          hotel_id: hotelID,
          year: setYear,
        },
      });
      setIncome(response.data);
    } catch (error) {
      toast.error('Não foi possível carregar receitas.');
    }
    setLoading(false);
  }, [hotelID, receita.date]);

  useEffect(() => {
    dispatch(changeDateAction(new Date()));
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = 'SIM - Consumo | Receita';

    loadIncome();
  }, [loadIncome]);

  const handleOpenModal = async (modalFn, item) => {
    const response = await api.get(`/financial-incomes/${item}`, {
      params: {
        hotel_id: hotelID,
      },
    });

    const { data } = response;

    setPayload(data);
    modalFn();
  };

  async function handleDelete(id, key) {
    async function deleteIncomes() {
      try {
        await api.delete(`/financial-incomes/${id}`, {
          id,
          // [key]: null,
        });

        toast.success('Receita mensal excluída com sucesso.');

        loadIncome();
      } catch (error) {
        toast.error('Não foi possível remover a receita mensal selecionada.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteIncomes}
          onClose={onClose}
          icon={<Icon name="iconTrash" />}
          title="Deletar receita"
          message={<p>Tem certeza que deseja deletar receita mensal?</p>}
        />
      ),
    });
  }

  return (
    <>
      <div id="modal-root" />
      <IncomeModalWrapper>
        <IncomeFormModal
          handleClose={incomeHook.hide}
          item={payload.id}
          loadIncome={loadIncome}
        />
      </IncomeModalWrapper>

      <Container className="content full">
        <div className="title">
          <h1>Receita {receita.date && receita.date.getFullYear()}</h1>
        </div>
        <div style={{ display: 'flex' }}>
          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th width="15%">Mês</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td width="15%">
                      <Shimmer>
                        <LoadLine />
                      </Shimmer>
                    </td>
                  </tr>
                ) : (
                  income.map(item => (
                    <tr>
                      <td width="75">{MonthEnum[item.month_name]}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableWrapper>
          <TableWrapper width="100%">
            <table>
              <thead>
                <tr>
                  <th colSpan="1">Receita</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td width="15%">
                      <Shimmer>
                        <LoadLine />
                      </Shimmer>
                    </td>
                    <td>
                      <Shimmer>
                        <LoadLine />
                      </Shimmer>
                    </td>
                  </tr>
                ) : (
                  income.map(item => (
                    <tr key={item.id}>
                      {!item.income && !item.value ? (
                        <td>
                          <ButtonAdd
                            onClick={() =>
                              handleOpenModal(incomeHook.show, item.id)
                            }
                          >
                            <Icon name="iconPlus" />
                            Adicionar
                          </ButtonAdd>
                        </td>
                      ) : (
                        <>
                          <td>
                            R$ {item.value}
                            <TableDropDownCustom>
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenModal(incomeHook.show, item.id);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDelete(item.id, ['value']);
                                }}
                              >
                                Excluir
                              </button>
                            </TableDropDownCustom>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </TableWrapper>
        </div>
      </Container>
    </>
  );
}
