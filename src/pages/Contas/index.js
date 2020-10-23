import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import { EmptyContainer, TableWrapper } from './styles';

import { useModal } from '../../hook/useModal';

import Icon from '../../components/Icons';
import Select from '../../components/Select';
import LoadLine from '../../components/LoadLine';
import Container from '../../components/Container';
import ButtonAdd from '../../components/ButtonAdd';
import ConfirmAlert from '../../components/ConfirmAlert';
import InvoiceFormModal from './components/InvoiceFormModal';
import TableDropDownCustom from '../../components/TableDropDownCustom';

import api from '../../services/api';

import { changeDateAction } from '../../store/modules/consumo/invoice/actions';
import { formatPrice } from '../../util/format';

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

export default function Contas() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [clockListId, setClockListId] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [clockId, setClockId] = useState();
  const [payload, setPayload] = useState({});
  const clockIdRef = useRef();
  const { RenderModal: InvoiceModalWrapper, ...invoiceHook } = useModal();

  const invoice = useSelector(state => state.invoice);
  const hotelID = useSelector(state => state.user.profile.activeHotel);

  const clockConfig = clocksConfigs.find(
    a => a.value === invoice.consumption[0]
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
          clock_type: invoice.consumption[0],
        },
      });

      setClockListId(response.data);
    } catch (error) {
      toast.error('Não foi possível carregar relógios.');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoice, getActiveHotelFromLocalStorage()]);

  useEffect(() => {
    document.title = 'SIM - Consumo | Contas';

    loadClockID();
  }, [loadClockID]);

  const loadInvoices = useCallback(async () => {
    try {
      setLoading(true);

      if (invoice.date === null) return;

      // if (!clockId) return;

      const setYear = invoice.date.getFullYear();

      const response = await api.get(`/invoices`, {
        params: {
          hotel_id: hotelID,
          clock_id: clockId,
          year: setYear,
        },
      });

      setInvoices(response.data);
    } catch (error) {
      // toast.error('Não foi possível carregar contas.');
    }
    setLoading(false);
  }, [clockId, invoice.date, hotelID]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  useEffect(() => {
    dispatch(changeDateAction(new Date()));
  }, []); // eslint-disable-line

  const handleOpenModal = async (modalFn, item) => {
    setPayload(item);
    modalFn();
  };

  async function handleInvoiceDelete(id) {
    async function deleteInvoice() {
      try {
        await api.delete(`/invoices/${id}`);

        toast.success('Leitura de consumo excluída com sucesso.');

        loadInvoices();
      } catch (error) {
        toast.error('Não foi possível remover conta selecionada.');
      }
    }

    confirmAlert({
      customUI: (
        { onClose } // eslint-disable-line
      ) => (
        <ConfirmAlert
          callback={deleteInvoice}
          onClose={onClose}
          icon={<Icon name="iconTrash" />}
          title="Deletar leitura de consumo"
          message={<p>Tem certeza que deseja deletar leitura de consumo?</p>}
        />
      ),
    });
  }

  function handleClockOnChange() {
    setClockId(clockIdRef.current.selectedOptions[0]?.id);
  }

  useEffect(() => {
    handleClockOnChange();
  }, [clockListId]);

  return (
    <>
      <div id="modal-root" />
      <InvoiceModalWrapper>
        <InvoiceFormModal
          handleClose={invoiceHook.hide}
          item={payload}
          loadInvoices={loadInvoices}
        />
      </InvoiceModalWrapper>

      <Container className="content full">
        <div className={`title title--dropdown dd-${invoice.consumption}`}>
          <div className="dd-title">
            Consumo de <strong>{clockConfig && clockConfig.name}</strong>
            <span>{invoice.date && invoice.date.getFullYear()}</span>
          </div>
          <div className="dd-select">
            <Icon name="iconClockSmall" />
            <Select
              name="clockid"
              onChange={() => {
                handleClockOnChange();
              }}
              options={clockListId}
              defaultOption={clockListId[0]}
              ref={clockIdRef}
            />
          </div>
        </div>

        {!clockListId.length ? (
          <EmptyContainer>
            <div className="inner">
              <Icon name="iconClockBig" />
              <p>Nenhum relógio foi selecionado.</p>
            </div>
          </EmptyContainer>
        ) : (
          <TableWrapper>
            <table>
              <thead>
                <tr>
                  <th>Mês</th>
                  <th>Consumo</th>
                  <th>Valor (R$)</th>
                  <th>Anexo</th>
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
                    <td>
                      <Shimmer>
                        <LoadLine />
                      </Shimmer>
                    </td>
                  </tr>
                ) : (
                  invoices.map(item => (
                    <tr key={item.id}>
                      <td>{item.month_name}</td>
                      {!item.read ? (
                        <td colSpan="4">
                          <ButtonAdd
                            onClick={() =>
                              handleOpenModal(invoiceHook.show, item)
                            }
                          >
                            <Icon name="iconPlus" />
                            Adicionar
                          </ButtonAdd>
                        </td>
                      ) : (
                        <>
                          <td>
                            {formatPrice(item.read).replace('R$', '')}
                            {item.unit_of_measurement.toLowerCase()}
                          </td>
                          <td>{item.value_formatted}</td>
                          <td className="attachment">
                            <a
                              href={item.attachment}
                              className="attach"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.attachment.split('/').pop()}
                            </a>
                          </td>
                          <td width="75">
                            <TableDropDownCustom>
                              <button
                                type="button"
                                onClick={() => {
                                  handleInvoiceDelete(item.id);
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
    </>
  );
}
