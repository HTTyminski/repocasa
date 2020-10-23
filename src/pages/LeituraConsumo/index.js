import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { TwoColumns, EmptyContainer, TableWrapper } from './styles';

import { useModal } from '../../hook/useModal';

import Select from '../../components/Select';
import Icon from '../../components/Icons';
import LoadLine from '../../components/LoadLine';
import Container from '../../components/Container';
import ButtonAdd from '../../components/ButtonAdd';
import ConfirmAlert from '../../components/ConfirmAlert';
import UhsPaxFormModal from './components/UhsPaxFormModal';
import TableDropDownCustom from '../../components/TableDropDownCustom';
import ConsumptionReadingFormModal from './components/ConsumptionReadingFormModal';

import api from '../../services/api';

import { changeDateAction } from '../../store/modules/consumo/consumptionreading/actions';

const clocksConfigs = [
  {
    name: 'Gás',
    value: 'GAS',
  },
  {
    name: 'Energia',
    value: 'ELECTRICITY',
  },
  {
    name: 'Água',
    value: 'WATER',
  },
];

export default function LeituraConsumo() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [clockListId, setClockListId] = useState([]);
  const [clockId, setClockId] = useState();
  const [clocksConsumption, setClocksConsumption] = useState([]);
  const [occupation, setOccupation] = useState([]);
  const [payload, setPayload] = useState({});
  const [currentClock, setCurrentClock] = useState({});
  const clockIdRef = useRef();
  const { RenderModal: UhsPaxModalWrapper, ...uhsPaxHook } = useModal();
  const {
    RenderModal: ConsumptionReadingModalWrapper,
    ...consumptionreadingHook
  } = useModal();

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const consumptionreading = useSelector(state => state.consumptionreading);

  const clockConfig = clocksConfigs.find(
    a => a.value === consumptionreading.consumption[0]
  );

  function getActiveHotelFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem('persist:sim'));
    const user = data.user ? JSON.parse(data.user) : {};
    const activeHotel = user.profile ? user.profile.activeHotel : 0;

    return Number(activeHotel);
  }

  const loadClockID = useCallback(async () => {
    try {
      const response = await api.get(`/clocks`, {
        params: {
          hotel_id: getActiveHotelFromLocalStorage(),
          clock_type: consumptionreading.consumption[0],
        },
      });
      setClockListId(response.data);
    } catch (error) {
      // toast.error('Não foi possível carregar relógios.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consumptionreading, getActiveHotelFromLocalStorage()]);

  const loadClocksConsumption = useCallback(async () => {
    try {
      setLoading(true);

      if (consumptionreading.date === null) return;

      if (!clockId) return;

      const setYear = consumptionreading.date.getFullYear();
      const setMonth = consumptionreading.date.getMonth() + 1;

      const response = await api.get(
        `/hotels/${hotelID}/clocks/${clockId}/consumptions`,
        {
          params: {
            month: setMonth,
            year: setYear,
          },
        }
      );

      const mapped = response.data.map(item => ({
        ...item,
        read_at: format(new Date(item.read_at), 'dd/MM/yyyy'),
      }));

      setClocksConsumption(mapped);
    } catch (error) {
      // toast.error('Não foi possível carregar lista de consumo.');
    }
    setLoading(false);
  }, [clockId, consumptionreading.date, hotelID]);

  const loadOccupation = useCallback(async () => {
    try {
      setLoading(true);

      const setYear = consumptionreading.date.getFullYear();
      const setMonth = consumptionreading.date.getMonth() + 1;

      const response = await api.get(`/hotels/${hotelID}/occupations`, {
        params: {
          month: setMonth,
          year: setYear,
        },
      });

      setOccupation(response.data);
    } catch (error) {
      // toast.error('Não foi possível carregar ocupação.');
    }
    setLoading(false);
  }, [consumptionreading.date, hotelID]);

  useEffect(() => {
    dispatch(changeDateAction(new Date()));
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = 'SIM - Consumo | Leitura de Consumo';

    loadClockID();
  }, [loadClockID]);

  useEffect(() => {
    loadClocksConsumption();
  }, [loadClocksConsumption]);

  useEffect(() => {
    loadOccupation();
  }, [loadOccupation]);

  const handleOpenModal = async (modalFn, item) => {
    setPayload(item);
    modalFn();
  };

  async function handleOccupationDelete(myObj) {
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
        await api.delete(`hotels/${hotelID}/occupations/${myObj.id}`, {});

        toast.success('Ocupação excluída com sucesso.');

        loadOccupation();
      } catch (error) {
        toast.error('Não foi possível remover a ocupação selecionado.');
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
          title="Deletar ocupação"
          message={
            <p>
              Tem certeza que deseja deletar a ocupação de <br />
              <strong>{myObj.day}</strong>/<strong>{myObj.month}</strong>/
              <strong>{myObj.year}</strong>?
            </p>
          }
        />
      ),
    });
  }

  async function handleConsumptionReadingDelete(id) {
    async function deleteIdividualEntries() {
      try {
        await api.delete(`hotels/${hotelID}/consumptions/${id}`, {});

        toast.success('Leitura de consumo excluída com sucesso.');

        loadClocksConsumption();
      } catch (error) {
        toast.error('Não foi possível remover leitura de consumo selecionada.');
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
          title="Deletar leitura de consumo"
          message={<p>Tem certeza que deseja deletar leitura de consumo?</p>}
        />
      ),
    });
  }

  function handleClockOnChange() {
    const currentClockValue = clockListId.find(value => {
      // eslint-disable-next-line radix
      return value.id === parseInt(clockIdRef.current.selectedOptions[0]?.id);
    });
    setCurrentClock(currentClockValue);
    setClockId(clockIdRef.current.selectedOptions[0]?.id);
  }
  useEffect(() => {
    handleClockOnChange();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleClockOnChange]);

  return (
    <>
      <div id="modal-root" />
      <UhsPaxModalWrapper>
        <UhsPaxFormModal
          handleClose={uhsPaxHook.hide}
          item={payload}
          loadOccupation={loadOccupation}
        />
      </UhsPaxModalWrapper>

      <ConsumptionReadingModalWrapper>
        <ConsumptionReadingFormModal
          handleClose={consumptionreadingHook.hide}
          item={payload}
          loadClocksConsumption={loadClocksConsumption}
          clockListId={clockListId}
        />
      </ConsumptionReadingModalWrapper>

      <TwoColumns>
        <Container className="content full">
          <div className="title title--equal">
            <h1>Ocupação</h1>
          </div>

          <TableWrapper className="flex">
            <table className="day">
              <thead>
                <tr>
                  <th>Dia</th>
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
                  occupation.map(item => (
                    <tr key={item.day}>
                      <td>{item.day}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            <table className="table_right">
              <thead>
                <tr>
                  <th>PAX</th>
                  <th>UHs</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    {/* <td width="15%">
                      <Shimmer>
                        <LoadLine />
                      </Shimmer>
                    </td> */}
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
                  </tr>
                ) : (
                  occupation.map(item => (
                    <tr key={item.day}>
                      {/* // <td>{item.day}</td> */}
                      {!item.pax && !item.uhs ? (
                        <td colSpan="3">
                          <ButtonAdd
                            onClick={() =>
                              handleOpenModal(uhsPaxHook.show, item)
                            }
                          >
                            <Icon name="iconPlus" />
                            Adicionar
                          </ButtonAdd>
                        </td>
                      ) : (
                        <>
                          <td>{item.pax}</td>
                          <td>{item.uhs}</td>
                          <td width="75">
                            <TableDropDownCustom>
                              <button
                                type="button"
                                onClick={() => {
                                  handleOccupationDelete({
                                    key: ['pax', 'uhs'],
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
        <Container className="content full">
          <div
            className={`title title--dropdown dd-${consumptionreading.consumption}`}
          >
            <div className="dd-title">
              Consumo de <strong>{clockConfig && clockConfig.name}</strong>
              <span>
                {consumptionreading.date &&
                  consumptionreading.date.getMonth() + 1}{' '}
                /
                {consumptionreading.date &&
                  consumptionreading.date.getFullYear()}
              </span>
            </div>

            <div className="dd-select">
              <Icon name="iconClockSmall" />
              <Select
                name="clockid"
                onChange={() => {
                  handleClockOnChange();
                }}
                options={clockListId}
                placeholder="Selecione..."
                defaultOption={currentClock}
                value={currentClock}
                ref={clockIdRef}
              />
            </div>
          </div>

          {!currentClock ? (
            <EmptyContainer>
              <div className="inner">
                <Icon name="iconClockBig" />
                <p>Nenhum relógio foi encontrado.</p>
              </div>
            </EmptyContainer>
          ) : (
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Leitura</th>
                    <th>Consumo</th>
                    <th>Hora</th>
                    <th>
                      {currentClock && currentClock.read_unit_of_measurement
                        ? `${currentClock.read_unit_of_measurement.toLowerCase()}/UHs`
                        : 'UHs'}
                    </th>
                    <th>&nbsp;</th>
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
                      <td>
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
                    clocksConsumption.map(item => (
                      <tr key={item.day}>
                        {!item.read ? (
                          <td colSpan="5">
                            <ButtonAdd
                              onClick={() =>
                                handleOpenModal(
                                  consumptionreadingHook.show,
                                  item
                                )
                              }
                            >
                              <Icon name="iconPlus" />
                              Adicionar
                            </ButtonAdd>
                          </td>
                        ) : (
                          <>
                            <td>
                              {item.read}
                              {item.read_unit_of_measurement}
                            </td>
                            <td>
                              {item.consumption_value
                                ? item.consumption_value
                                : '0'}
                              {item.read_unit_of_measurement}
                            </td>
                            <td>{item.hour}</td>
                            <td>
                              {item.consumption_uhs ? item.consumption_uhs : ''}
                              {item.read_unit_of_measurement}
                            </td>
                            <td width="75">
                              <TableDropDownCustom>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleConsumptionReadingDelete(item.id);
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
          )}
        </Container>
      </TwoColumns>
    </>
  );
}
