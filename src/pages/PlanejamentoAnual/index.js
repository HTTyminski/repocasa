import React, { useState, useEffect, useCallback } from 'react';
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
import TableDropDownCustom from '../../components/TableDropDownCustom';

import UhsFormModal from './components/UhsFormModal';
import GasFormModal from './components/GasFormModal';
import WaterFormModal from './components/WaterFormModal';
import EnergyFormModal from './components/EnergyFormModal';

import api from '../../services/api';

import { changeDateAction } from '../../store/modules/consumo/annualplanning/actions';

export default function PlanejamentoAnual() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [planning, setPlanning] = useState([]);
  const [payload, setPayload] = useState({});
  const { RenderModal: UshModalWrapper, ...ushHook } = useModal();
  const { RenderModal: EnergyModalWrapper, ...energyHook } = useModal();
  const { RenderModal: GasModalWrapper, ...gasHook } = useModal();
  const { RenderModal: WaterModalWrapper, ...waterHook } = useModal();

  const annualplanning = useSelector(state => state.annualplanning);
  console.log('annualplanning', annualplanning);

  const hotelID = useSelector(state => state.user.profile.activeHotel);

  const loadPlanning = useCallback(async () => {
    try {
      setLoading(true);

      if (annualplanning.date === null) {
        return;
      }

      const setYear = annualplanning.date.getFullYear();

      const response = await api.get('/annual-plans', {
        params: {
          hotel_id: hotelID,
          year: setYear,
        },
      });

      setPlanning(response.data);
    } catch (error) {
      toast.error('Não foi possível carregar planejamento anual.');
    }
    setLoading(false);
  }, [hotelID, annualplanning.date]);

  // TODO: setar diretamente no redux
  useEffect(() => {
    dispatch(changeDateAction(new Date()));
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = 'SIM - Consumo | Planejamento Anual';

    loadPlanning();
  }, [loadPlanning]);

  const handleOpenModal = async (modalFn, item) => {
    const response = await api.get(`/annual-plans/${item}`, {
      params: {
        hotel_id: hotelID,
      },
    });

    const { data } = response;

    setPayload(data);
    modalFn();
  };

  async function handleDelete(myObj) {
    console.log('myObj', myObj);

    if (!Array.isArray(myObj.key)) {
      throw new Error('Key is not an array');
    }

    const values = myObj.key;
    const newValues = {};
    values.forEach(value => {
      newValues[value] = 0;
    });

    async function deleteIdividualEntries() {
      try {
        await api.put(`/annual-plans/${myObj.id}`, {
          id: myObj.id,
          ...newValues,
          hotel_id: hotelID,
        });

        toast.success('Planejamento anual excluído com sucesso.');

        loadPlanning();
      } catch (error) {
        toast.error('Não foi possível remover o relógio selecionado.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteIdividualEntries}
          onClose={onClose}
          icon={<Icon name="iconTrash" />}
          title="Deletar planejamento"
          message={
            <p>
              Tem certeza que deseja deletar planejamento anual de{' '}
              <strong>{myObj.month_name}</strong> de{' '}
              <strong>{myObj.year}</strong>?
            </p>
          }
        />
      ),
    });
  }

  return (
    <>
      <div id="modal-root" />
      <UshModalWrapper>
        <UhsFormModal
          handleClose={ushHook.hide}
          item={payload.id}
          loadPlanning={loadPlanning}
        />
      </UshModalWrapper>

      <EnergyModalWrapper>
        <EnergyFormModal
          handleClose={energyHook.hide}
          item={payload.id}
          loadPlanning={loadPlanning}
        />
      </EnergyModalWrapper>

      <GasModalWrapper>
        <GasFormModal
          handleClose={gasHook.hide}
          item={payload.id}
          loadPlanning={loadPlanning}
        />
      </GasModalWrapper>

      <WaterModalWrapper>
        <WaterFormModal
          handleClose={waterHook.hide}
          item={payload.id}
          loadPlanning={loadPlanning}
        />
      </WaterModalWrapper>

      <Container className="content full">
        <div className="title">
          <p>
            Planejamento{' '}
            {annualplanning.date && annualplanning.date.getFullYear()}
          </p>
        </div>
        <TableWrapper>
          <table className="col_5">
            <thead>
              <tr>
                <th>Mês</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>&nbsp;</td>
              </tr>
              {loading ? (
                <tr>
                  <td width="15%">
                    <Shimmer>
                      <LoadLine />
                    </Shimmer>
                  </td>
                </tr>
              ) : (
                planning.map(item => (
                  <tr key={item.id}>
                    <td>{item.month_name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <table className="col_35">
            <thead>
              <tr>
                <th>UHs ocupadas</th>
                <th>Receita</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Unidades</td>
                <td>Reais</td>
                <th>&nbsp;</th>
              </tr>
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
                planning.map(item => (
                  <tr key={item.id}>
                    {!item.uhs && !item.income ? (
                      <td colSpan="3">
                        <ButtonAdd
                          onClick={() => handleOpenModal(ushHook.show, item.id)}
                        >
                          <Icon name="iconPlus" />
                          Adicionar
                        </ButtonAdd>
                      </td>
                    ) : (
                      <>
                        <td>{item.uhs}</td>
                        <td>{item.income_formatted}</td>
                        <td width="75">
                          <TableDropDownCustom>
                            <button
                              type="button"
                              onClick={() => {
                                handleOpenModal(ushHook.show, item.id);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete({
                                  key: ['uhs', 'income'],
                                  ...item,
                                });
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

          <table className="col_60">
            <thead>
              <tr>
                <th>Energia</th>
                <th>&nbsp;</th>
                <th>Gás</th>
                <th>&nbsp;</th>
                <th>Água</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Valor</td>
                <td>&nbsp;</td>
                <td>Valor</td>
                <td>&nbsp;</td>
                <td>Valor</td>
                <td>&nbsp;</td>
              </tr>
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
                  <td colSpan="2">
                    <Shimmer>
                      <LoadLine />
                    </Shimmer>
                  </td>
                  <td colSpan="2">
                    <Shimmer>
                      <LoadLine />
                    </Shimmer>
                  </td>
                  <td colSpan="2">
                    <Shimmer>
                      <LoadLine />
                    </Shimmer>
                  </td>
                  <td colSpan="2">
                    <Shimmer>
                      <LoadLine />
                    </Shimmer>
                  </td>
                </tr>
              ) : (
                planning.map(item => (
                  <tr key={item.id}>
                    {!item.electricity_consumption ? (
                      <td colSpan="2">
                        <ButtonAdd
                          onClick={() =>
                            handleOpenModal(energyHook.show, item.id)
                          }
                        >
                          <Icon name="iconPlus" />
                          Adicionar
                        </ButtonAdd>
                      </td>
                    ) : (
                      <>
                        <td>{item.electricity_consumption_formatted}</td>
                        <td width="75">
                          <TableDropDownCustom>
                            <button
                              type="button"
                              onClick={() => {
                                handleOpenModal(energyHook.show, item.id);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete({
                                  key: ['electricity_consumption'],
                                  ...item,
                                });
                              }}
                            >
                              Excluir
                            </button>
                          </TableDropDownCustom>
                        </td>
                      </>
                    )}

                    {!item.gas_consumption ? (
                      <td colSpan="2">
                        <ButtonAdd
                          onClick={() => handleOpenModal(gasHook.show, item.id)}
                        >
                          <Icon name="iconPlus" />
                          Adicionar
                        </ButtonAdd>
                      </td>
                    ) : (
                      <>
                        <td>{item.gas_consumption_formatted}</td>
                        <td width="75">
                          <TableDropDownCustom>
                            <button
                              type="button"
                              onClick={() => {
                                handleOpenModal(gasHook.show, item.id);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete({
                                  key: ['gas_consumption'],
                                  ...item,
                                });
                              }}
                            >
                              Excluir
                            </button>
                          </TableDropDownCustom>
                        </td>
                      </>
                    )}

                    {!item.water_consumption ? (
                      <td colSpan="2">
                        <ButtonAdd
                          onClick={() =>
                            handleOpenModal(waterHook.show, item.id)
                          }
                        >
                          <Icon name="iconPlus" />
                          Adicionar
                        </ButtonAdd>
                      </td>
                    ) : (
                      <>
                        <td>{item.water_consumption_formatted}</td>
                        <td width="75">
                          <TableDropDownCustom>
                            <button
                              type="button"
                              onClick={() => {
                                handleOpenModal(waterHook.show, item.id);
                              }}
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                handleDelete({
                                  key: ['water_consumption'],
                                  ...item,
                                });
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
      </Container>
    </>
  );
}
