import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  createRef,
} from 'react';
import { useSelector } from 'react-redux';

import * as Yup from 'yup';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import { Form, Input, Select } from '@rocketseat/unform';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import Icon from '../../components/Icons';
import Modal from '../../components/Modal';
import LoadLine from '../../components/LoadLine';
import ConfirmAlert from '../../components/ConfirmAlert';
import DatePickerInput from '../../components/DatePickerInput';
import TimePickerInput from '../../components/TimePickerInput';

import TableDropDownCustom from '../../components/TableDropDownCustom';

import { StyledContainer, TableWrapper } from './styles';

import api from '../../services/api';
import { Label } from '../../components/Modal/styles';

function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}

const schemaCreate = Yup.object().shape({
  name: Yup.string()
    .max(50, 'O nome deve ter no máximo 50 caracteres.')
    .required('Nome do relógio é obrigatório.'),
  initial_read: Yup.number()
    .test(
      'len',
      'A Leitura dever ter no máximo 35 caracteres.',
      val => Math.ceil(Math.log10(val + 1)) <= 35
    )
    .transform(emptyStringToNull)
    .nullable()
    .required('Leitura do relógio é obrigatória.'),
  read_at_date: Yup.date().required('Data é obrigatória.'),
  read_at_time: Yup.string()
    .transform(emptyStringToNull)
    .nullable()
    .required('Hora é obrigatória.'),
  read_unit_of_measurement: Yup.string(),
  hour12: Yup.number(),
  minute: Yup.number(),
});

const schemaEdit = Yup.object().shape({
  name: Yup.string().required('Nome do relógio é obrigatório.'),
  initial_read: Yup.number()
    .positive('O número deve ser maior que zero.')
    .transform(emptyStringToNull)
    .nullable()
    .required('Leitura do relógio é obrigatória.'),
});

const clocksConfigs = [
  {
    name: 'Gás',
    value: 'GAS',
    measurement: [
      { name: 'quilograma', value: 'KG' },
      { name: 'metro cúbico (m³)', value: 'M3' },
    ],
  },
  {
    name: 'Energia',
    value: 'ELECTRICITY',
    measurement: [{ name: 'quilowatt (kW)', value: 'KW' }],
  },
  {
    name: 'Água',
    value: 'WATER',
    measurement: [{ name: 'metro cúbico (m³)', value: 'M3' }],
  },
];

export default function Relogios() {
  const [loading, setLoading] = useState(false);
  const [clocks, setClocks] = useState([]);
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getId, setId] = useState(); // eslint-disable-line
  const [getItem, setItem] = useState();
  const [initialData, setInitialData] = useState();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const clock = useSelector(state => state.clock);
  console.log('clock state', clock);

  const strClockType = clock.consumption.join();
  const clockConfig = clocksConfigs.find(a => a.value === clock.consumption[0]);

  const clockConfigMeasurement =
    clockConfig &&
    clockConfig.measurement.map(item => {
      return {
        id: item.value,
        title: item.name,
      };
    });

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  const loadClocks = useCallback(async () => {
    try {
      setLoading(true);

      const response = await api.get(`/clocks`, {
        params: {
          hotel_id: hotelID,
          clock_type: strClockType,
        },
      });

      const mapped = response.data.map(item => ({
        ...item,
        read_at_date: format(new Date(item.read_at_date), 'dd/MM/yyyy'),
      }));

      setClocks(mapped);
    } catch (error) {
      toast.error('Não foi possível carregar relógios.');
    }
    setLoading(false);
  }, [hotelID, strClockType]);

  const buttonRef = useRef();
  const buttonRefEdit = createRef();

  useEffect(() => {
    document.title = 'SIM - Consumo | Relógios';

    loadClocks();
  }, [loadClocks]);

  useEffect(() => {
    if (document.getElementById('dateRef')) {
      document.getElementById('dateRef').addEventListener('focus', function() {
        setCalendarOpen(true);
      });

      document.getElementById('dateRef').addEventListener('blur', function() {
        setCalendarOpen(false);
      });
    }
  }, [createModal]);

  function handleOpenAddModal() {
    setCreateModal(true);
  }

  function handleCloseAddModal() {
    setCreateModal(false);
  }

  async function getById(id) {
    const response = await api.get(`/clocks/${id}`, {
      params: {},
    });

    const { data } = response;

    const hours = response.data.read_at.substr(11, 2);
    const minutes = response.data.read_at.substr(14, 2);

    setInitialData({
      ...data,
      read_at_date: parseISO(response.data.read_at_date),
      read_at_time: `${hours}:${minutes}`,
    });

    setItem(response.data);
  }

  function handleOpenEditModal(id) {
    setEditModal(true);
    getById(id);
  }

  function handleCloseEditModal() {
    setItem(null);
    setEditModal(false);
  }

  async function handleSubmit(data) {
    try {
      const {
        name,
        hotel_id = Number(hotelID),
        clock_type = strClockType,
        initial_read,
        read_at_date,
        read_at_time,
        read_unit_of_measurement,
      } = data;

      let newHour;

      if (read_at_time.length > 5) {
        newHour = read_at_time.substr(16, 5);
      }

      await api.post('/clocks', {
        name,
        hotel_id,
        clock_type,
        initial_read,
        read_at_date,
        read_at_time: newHour || read_at_time,
        read_unit_of_measurement,
      });

      toast.success('Relógio cadastrado com sucesso.');

      handleCloseAddModal();

      loadClocks();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        if (
          error.response.data.errors[0] ===
          'There is already a Clock with the name and type informed'
        ) {
          toast.error(
            'Já existe um relógio com este nome e mesmo tipo de medida.'
          );
        } else {
          toast.error(error.response.data.errors[0]);
        }
      } else {
        toast.error('Erro ao cadastrar relógio.');
      }
    }
  }

  async function handleEditClock(data) {
    if (getItem.id) {
      try {
        const { name, clock_id = getItem.id, initial_read } = data;

        await api.put(`/clocks`, {
          name,
          clock_id,
          initial_read,
        });

        toast.success('Relógio alterado com sucesso.');

        handleCloseEditModal();

        loadClocks();
      } catch (err) {
        toast.error('Erro ao editar relógio.');
      }
    }
  }

  async function handleDeleteClock(item) {
    function deleteClock() {
      try {
        api.delete(`/clocks/${item.id}`);

        toast.success('Relógio excluído com sucesso.');

        setClocks(clocks.filter(currentClock => currentClock.id !== item.id));
      } catch (err) {
        toast.error('Não foi possível remover o relógio selecionado.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteClock}
          onClose={onClose}
          icon={<Icon name="iconTrash" />}
          title="Deletar relógio"
          message={
            <p>
              Tem certeza que deseja deletar o relógio{' '}
              <strong>{item.name}</strong> selecionado?
            </p>
          }
        />
      ),
    });
  }

  useEffect(() => {
    const { current } = buttonRef;

    if (current) {
      const handleFocus = () => (current.style.opacity = '0.8');
      const handleBlur = () => (current.style.opacity = '1');

      current.addEventListener('focusin', handleFocus);
      current.addEventListener('blur', handleBlur);

      return () => {
        current.removeEventListener('focusin', handleFocus);
        current.removeEventListener('blur', handleBlur);
      };
    }
  }, [createModal]);

  useEffect(() => {
    if (buttonRefEdit.current) {
      buttonRefEdit.current.addEventListener('focus', function() {
        buttonRefEdit.current.style.opacity = '0.8';
      });

      buttonRefEdit.current.addEventListener('blur', function() {
        buttonRefEdit.current.style.opacity = '1';
      });
    }
  }, [getItem]);

  return (
    <>
      {createModal && (
        <Modal>
          <div className="modal__header">
            <h3>Incluir relógio</h3>
            <button
              className="close"
              type="button"
              onClick={handleCloseAddModal}
            >
              <Icon name="iconDelete" />
            </button>
          </div>
          <div className="modal__body">
            <div className="modal__group-info">
              <p className="modal__group-title">Empreendimento</p>
              <span className="modal__group-text">{hotelName}</span>
            </div>
            {clock.consumption.length > 0 && (
              <div className="modal__group-info">
                <p className="modal__group-title">Tipo</p>
                <span className="modal__group-text">
                  <span>{clockConfig.name}</span>
                </span>
              </div>
            )}
            <Form schema={schemaCreate} onSubmit={handleSubmit}>
              {clockConfig && (
                <div className="form__group">
                  <Label
                    htmlFor="read_unit_of_measurement"
                    className="Label_input"
                  >
                    Medida
                  </Label>
                  {clockConfig.name !== 'Gás' ? (
                    <Select
                      className="form__input"
                      name="read_unit_of_measurement"
                      value={clockConfigMeasurement[0].title}
                      options={clockConfigMeasurement}
                      placeholder="Selecionar medida..."
                    />
                  ) : (
                    <Select
                      className="form__input"
                      name="read_unit_of_measurement"
                      options={clockConfigMeasurement.sort(function(a, b) {
                        if (a.title > b.title) return 1;

                        if (a.title < b.title) return -1;

                        return 0;
                      })}
                      placeholder="Selecionar medida..."
                    />
                  )}
                </div>
              )}
              <div className="form__group">
                <Label htmlFor="name" className="Label_input">
                  Nome do relógio
                </Label>
                <Input
                  className="form__input"
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Informe o nome"
                  autoComplete="off"
                />
              </div>
              <div className="form__group">
                <Label htmlFor="initial_read" className="Label_input">
                  Leitura
                </Label>
                <Input
                  className="form__input"
                  name="initial_read"
                  type="number"
                  id="initial_read"
                  placeholder="Informe a leitura"
                  step="0.01"
                />
              </div>
              <div className="form__group">
                <Label className="Label_input">Data</Label>
                <DatePickerInput
                  className="form__input"
                  name="read_at_date"
                  id="dateRef"
                />
              </div>
              <div className="form__group">
                <Label className="Label_input" calendarOpen={calendarOpen}>
                  Hora
                </Label>
                <TimePickerInput
                  name="read_at_time"
                  format="H:m"
                  value={new Date()}
                />
              </div>
              <button ref={buttonRef} className="btn btn-add" type="submit">
                Cadastrar relógio
              </button>
            </Form>
          </div>
        </Modal>
      )}

      {editModal && getItem && (
        <Modal
          id={getId}
          name={getItem.name}
          initial_read={getItem.initial_read}
        >
          <div className="modal__header">
            <h3>Editar relógio</h3>
            <button
              className="close"
              type="button"
              onClick={handleCloseEditModal}
            >
              <Icon name="iconDelete" />
            </button>
          </div>
          <div className="modal__body">
            <div className="modal__group-info">
              <p className="modal__group-title">Empreendimento</p>
              <span className="modal__group-text">{hotelName}</span>
            </div>
            <div className="modal__group-info">
              <p className="modal__group-title">Tipo</p>
              <span className="modal__group-text">
                <strong>{clockConfig.name}</strong>
              </span>
            </div>
            <Form
              initialData={initialData}
              schema={schemaEdit}
              onSubmit={handleEditClock}
            >
              <div className="form__group">
                <Label>Nome do relógio</Label>
                <Input
                  className="form__input"
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Informe o nome"
                />
              </div>
              <div className="form__group">
                <Label>Leitura</Label>
                <Input
                  className="form__input"
                  name="initial_read"
                  type="number"
                  id="initial_read"
                  placeholder="Informe a leitura"
                  step="0.01"
                />
              </div>
              <div className="form__group">
                <Label disabled="true">Data</Label>
                <DatePickerInput
                  className="form__input"
                  name="read_at_date"
                  disabled
                />
              </div>
              <div className="form__group">
                <Label disabled="true">Hora</Label>
                <TimePickerInput
                  name="read_at_time"
                  value={initialData.read_at_time}
                  disabled
                />
              </div>
              <button
                ref={buttonRefEdit}
                id="buttonRefEdit"
                className="btn btn-add"
                type="submit"
              >
                Editar relógio
              </button>
            </Form>
          </div>
        </Modal>
      )}

      {!clocks.length && !loading ? (
        <StyledContainer className="content empty">
          <div className="inner">
            <Icon name="iconClockBig" />
            <p>
              Nenhum relógio do tipo{' '}
              <strong>{clockConfig ? clockConfig.name : 'Todos'}</strong>{' '}
              encontrado.
            </p>
            <button type="button" onClick={handleOpenAddModal}>
              <Icon name="iconClockSmall" />
              Cadastrar novo relógio
            </button>
          </div>
        </StyledContainer>
      ) : (
        <StyledContainer className="content full">
          <div className="inner">
            <div className="title">
              <p>
                Relógios cadastrados{' '}
                <span>
                  <strong>{clockConfig ? clockConfig.name : 'Todos'}</strong>
                </span>
              </p>
              <button type="button" onClick={handleOpenAddModal}>
                <Icon name="iconPlus" />
                Cadastrar relógio
              </button>
            </div>
            <TableWrapper>
              <table>
                <thead>
                  <tr>
                    <th>Nome do relógio</th>
                    <th width="15%">Unidade de medida</th>
                    <th>Data</th>
                    <th>Hora</th>
                    <th>Leitura</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
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
                    clocks.map(item => {
                      const hours = item.read_at.substr(11, 2);
                      const minutes = item.read_at.substr(14, 2);
                      return (
                        <tr key={item.id}>
                          <td>{item.name}</td>
                          <td>{item.read_unit_of_measurement_formatted}</td>
                          <td>{item.read_at_date}</td>
                          <td>{`${hours}:${minutes}`}</td>
                          <td>{item.initial_read}</td>
                          <td width="75">
                            <TableDropDownCustom>
                              <button
                                type="button"
                                onClick={() => {
                                  handleOpenEditModal(item.id);
                                }}
                              >
                                Editar
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  handleDeleteClock(item);
                                }}
                              >
                                Excluir
                              </button>
                            </TableDropDownCustom>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </TableWrapper>
          </div>
        </StyledContainer>
      )}
    </>
  );
}
