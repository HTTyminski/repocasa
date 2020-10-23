import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import LoadGraph from '../../components/LoadGraph';
import Shimmer from 'react-shimmer-effect';

import { StyledBoxes, StyledTitleAction } from './styles';

import ChartBar from '../../components/ChartBar';
import Container from '../../components/Container';
import RadioSliding from '../../components/RadioSliding';
import TableConsumption from '../../components/TableConsumption';

import api from '../../services/api';
import { currencyBRoptions } from '../../util/graphs/currency';
import { consumptionTypes } from '../../util/consumption/types';

export default function ConsumoHotel() {
  const [loading, setLoading] = useState(false);
  const [hotelConsumption, setHotelConsumption] = useState([]);
  const [hotelConsumptionChart, setHotelConsumptionChart] = useState([]);
  const [hotelConsumptionReadChart, sethotelConsumptionReadChart] = useState(
    []
  );
  const [totalsConsumption, setTotalsConsumption] = useState([]);
  const [isToggleContainer, setToggleContainer] = useState(true);
  const [isToggleGraphConsumption, setToggleGraphConsumption] = useState(true);

  const optionsConsumptionHotel = useSelector(state => state.consumptionhotel);
  const clockConfig = consumptionTypes.find(
    a => a.value === optionsConsumptionHotel.consumption[0]
  );

  const hotelID = useSelector(state => state.user.profile.activeHotel);

  const loadTotals = useCallback(async () => {
    try {
      if (optionsConsumptionHotel.end && optionsConsumptionHotel.start) {
        setLoading(true);
        const setStartYear = optionsConsumptionHotel.start.year();
        const setStartMonth = optionsConsumptionHotel.start.month() + 1;
        const setEndYear = optionsConsumptionHotel.end.year();
        const setEndMonth = optionsConsumptionHotel.end.month() + 1;
        const selectedHotelParams = new URLSearchParams();
        selectedHotelParams.append('selected_hotels', hotelID);
        selectedHotelParams.append('initial_range_year', setStartYear);
        selectedHotelParams.append('initial_range_month', setStartMonth);
        selectedHotelParams.append('final_range_month', setEndMonth);
        selectedHotelParams.append('final_range_year', setEndYear);
        if (clockConfig.type) {
          selectedHotelParams.append('type', clockConfig.type);
        }
        if (optionsConsumptionHotel.select) {
          optionsConsumptionHotel.select.forEach(element => {
            return selectedHotelParams.append('selected_clocks', element.value);
          });
        }
        const request = { params: selectedHotelParams };
        const response = await api.get(`/general-consumption-totals`, request);
        setTotalsConsumption(response.data);
      }
    } catch (error) {
      toast.error('Não foi possível carregar o consumo do hotel.');
      console.error('LoadTotals errors: ', error);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsConsumptionHotel, hotelID]);

  const loadHotelConsumption = useCallback(async () => {
    try {
      setLoading(true);
      const setStartYear = optionsConsumptionHotel.start.year();
      const setStartMonth = optionsConsumptionHotel.start.month() + 1;
      const setEndYear = optionsConsumptionHotel.end.year();
      const setEndMonth = optionsConsumptionHotel.end.month() + 1;
      const selectedHotelParams = new URLSearchParams();
      selectedHotelParams.append('hotel_id', hotelID);
      selectedHotelParams.append('initial_range_year', setStartYear);
      selectedHotelParams.append('initial_range_month', setStartMonth);
      selectedHotelParams.append('final_range_month', setEndMonth);
      selectedHotelParams.append('final_range_year', setEndYear);
      if (clockConfig.type) {
        selectedHotelParams.append('type', clockConfig.type);
      }
      if (optionsConsumptionHotel.select) {
        optionsConsumptionHotel.select.forEach(element => {
          return selectedHotelParams.append('selected_clocks', element.value);
        });
      }
      const request = { params: selectedHotelParams };
      const response = await api.get(`/consumption-by-hotel`, request);
      setHotelConsumption(response.data);
    } catch (error) {
      toast.error('Não foi possível carregar o consumo do hotel.');
      console.error('Error on loadHotelConsumption: ', error);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsConsumptionHotel, hotelID]);

  useEffect(() => {
    loadHotelConsumption();
  }, [loadHotelConsumption]);

  const mountChartConsumption = useCallback(async () => {
    let spentBackgroundColor = clockConfig.backgroundcolor;
    const dataHotelSpent = [];
    const dataHotelBudgeted = [];
    const dataHotelPaxOcupado = [];
    const dataHotelRead = [];
    const labelMonths = [];
    for (let key in hotelConsumption) {
      let monthYear = 'Não informado';
      if (
        hotelConsumption[key] &&
        hotelConsumption[key].month &&
        hotelConsumption[key].year
      ) {
        const month = hotelConsumption[key].month_name;
        const year = hotelConsumption[key].year;
        monthYear = month + '/' + year;
      }
      dataHotelSpent.push(hotelConsumption[key] && hotelConsumption[key].spent);
      dataHotelBudgeted.push(
        hotelConsumption[key] && hotelConsumption[key].budgeted
      );
      dataHotelPaxOcupado.push(
        hotelConsumption[key] && hotelConsumption[key].pax
      );
      dataHotelRead.push(hotelConsumption[key] && hotelConsumption[key].read);
      labelMonths.push(monthYear);
    }
    const mountChart = {
      data: {
        labels: labelMonths,
        datasets: [
          {
            label: 'Ocupado',
            data: dataHotelPaxOcupado,
            fill: false,
            borderColor: 'rgba(82, 201, 102, 1)',
            type: 'line',
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(82, 201, 102, 1)',
            pointRadius: 5,
            pointBorderWidth: 2,
            index: 2,
          },
          {
            label: 'Realizado',
            data: dataHotelSpent,
            backgroundColor: spentBackgroundColor,
            maxBarThickness: 45,
            type: 'bar',
            index: 1,
          },
          {
            label: 'Orçado',
            data: dataHotelBudgeted,
            backgroundColor: 'rgba(242, 243, 255, 1)',
            maxBarThickness: 65,
            type: 'bar',
            index: 0,
          },
        ],
      },
      options: currencyBRoptions,
    };
    setHotelConsumptionChart([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsConsumptionHotel, hotelConsumption]);

  const mountChartConsumptionRead = useCallback(async () => {
    let spentBackgroundColor = clockConfig.backgroundcolor;
    const dataHotelSpent = [];
    const dataHotelPaxOcupado = [];
    const dataHotelRead = [];
    const labelMonths = [];
    for (let key in hotelConsumption) {
      let monthYear = 'Não informado';
      if (
        hotelConsumption[key] &&
        hotelConsumption[key].month &&
        hotelConsumption[key].year
      ) {
        const month = hotelConsumption[key].month_name;
        const year = hotelConsumption[key].year;
        monthYear = month + '/' + year;
      }
      dataHotelSpent.push(hotelConsumption[key] && hotelConsumption[key].spent);
      dataHotelPaxOcupado.push(
        hotelConsumption[key] && hotelConsumption[key].pax
      );
      dataHotelRead.push(hotelConsumption[key] && hotelConsumption[key].read);
      labelMonths.push(monthYear);
    }
    const mountChart = {
      data: {
        labels: labelMonths,
        datasets: [
          {
            label: 'Ocupado',
            data: dataHotelPaxOcupado,
            fill: false,
            borderColor: 'rgba(82, 201, 102, 1)',
            type: 'line',
            pointBackgroundColor: '#fff',
            pointBorderColor: 'rgba(82, 201, 102, 1)',
            pointRadius: 5,
            pointBorderWidth: 2,
            index: 2,
          },
          {
            label: 'Realizado',
            data: dataHotelSpent,
            backgroundColor: spentBackgroundColor,
            maxBarThickness: 45,
            type: 'bar',
            index: 1,
          },
        ],
      },
      options: {
        elements: {
          line: {
            tension: 0,
          },
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function(value) {
                  const metric =
                    clockConfig.type === 1
                      ? ' Kg'
                      : clockConfig.type === 2
                      ? ' KWh'
                      : ' m³';
                  return (
                    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') +
                    metric
                  );
                },
              },
            },
          ],
          xAxes: [
            {
              gridLines: {
                display: false,
              },
              stacked: true,
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
          },
        },
      },
    };
    sethotelConsumptionReadChart([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsConsumptionHotel, hotelConsumption]);

  useEffect(() => {
    document.title = 'SIM - Consumo | Consumo por Hotel';
    loadTotals();
  }, [loadTotals, setHotelConsumption]);

  useEffect(() => {
    mountChartConsumption();
  }, [mountChartConsumption]);

  useEffect(() => {
    mountChartConsumptionRead();
  }, [mountChartConsumptionRead]);

  function toggleContainer() {
    setToggleContainer(!isToggleContainer);
  }

  function toggleGraphConsumption() {
    setToggleGraphConsumption(!isToggleGraphConsumption);
  }

  return (
    <>
      <StyledBoxes className="box">
        {totalsConsumption.map((item, key) => (
          <div key={item.type} className="box__item">
            <div className="box__item-left">
              <h3>
                {clockConfig && clockConfig.name}
                {key === 1 ? ' / RNE' : key === 2 ? ' / Rec' : ''}
              </h3>
              <span>
                <span
                  className={`arrow consumption-${
                    item.difference > 0 ? 'up' : 'down'
                  }`}
                />
                {item.difference}%
              </span>
            </div>
            <div className="box__item-right">
              <div>
                <span className="icon icon--budget" data-tip="Orçado">
                  <ReactTooltip />
                  <span className="circle" />
                </span>
                {item.budgeted_formatted}
              </div>
              <div>
                <span
                  className={`icon icon--fulfilled icon-type-${clockConfig.type}`}
                  data-tip="Realizado"
                >
                  <span className="letter">R</span>
                </span>
                {item.spent_formatted}
              </div>
            </div>
          </div>
        ))}
      </StyledBoxes>
      <Container className="content full">
        <StyledTitleAction>
          <div className="chart-title">
            Consumo orçado x realizado{' '}
            <span>{clockConfig && clockConfig.name}</span>
          </div>
          <RadioSliding
            name="isToggleContainer"
            changeRadio={toggleContainer}
            icon={true}
            opOne="iconGraph"
            opTwo="iconList"
          />
        </StyledTitleAction>
        {clockConfig.value !== 'UTILITIES' && isToggleContainer ? (
          <RadioSliding
            name="isToggleGraphConsumption"
            changeRadio={toggleGraphConsumption}
            icon={false}
            opOne={
              clockConfig.type === 3 ? (
                'Kg'
              ) : clockConfig.type === 2 ? (
                'KWh'
              ) : clockConfig.type === 1 ? (
                'm³'
              ) : (
                <> </>
              )
            }
            opTwo="R$"
          />
        ) : (
          ''
        )}
        {loading ? (
          <Shimmer>
            <LoadGraph />
          </Shimmer>
        ) : isToggleContainer ? (
          isToggleGraphConsumption && clockConfig.value !== 'UTILITIES' ? (
            hotelConsumptionReadChart.map(item => (
              <ChartBar
                key={item.data}
                displayTitle={false}
                displayLegend
                data={item.data}
                options={item.options}
              />
            ))
          ) : (
            hotelConsumptionChart.map(item => (
              <ChartBar
                key={item.data}
                displayTitle={false}
                displayLegend
                data={item.data}
                options={item.options}
              />
            ))
          )
        ) : (
          <TableConsumption data={hotelConsumption} clockType={clockConfig} />
        )}
      </Container>
    </>
  );
}
