import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Shimmer from 'react-shimmer-effect';
import { toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';

import { StyledBoxes, TwoColumns, StyledTitleAction } from './styles';

import LoadGraph from '../../components/LoadGraph';
import ChartBar from '../../components/ChartBar';
import Container from '../../components/Container';
import RadioSliding from '../../components/RadioSliding';

import api from '../../services/api';

import {
  changeDateAction,
  selectMultiAction,
} from '../../store/modules/consumo/generalconsumption/actions';

export default function ConsumoGeral() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [totals, setTotals] = useState([]);
  const [spentUtilitiesData, setSpentUtilitiesData] = useState([]);
  const [spentUtilitiesDataNegative, setSpentUtilitiesDataNegative] = useState(
    []
  );
  const [spentUtilitiesDataRne, setspentUtilitiesDataRne] = useState([]);
  const [
    spentUtilitiesDataRneNegative,
    setspentUtilitiesDataRneNegative,
  ] = useState([]);

  const [spentUtilities, setSpentUtilities] = useState([]);
  const [spentUtilitiesRne, setSpentUtilitiesRne] = useState([]);
  const [spentsUtilitiesPositive, setSpentsUtilitiesPositive] = useState([]);
  const [spentsUtilitiesNegative, setSpentsUtilitiesNegative] = useState([]);
  const [spentsUtilitiesRnePositive, setSpentsUtilitiesRnePositive] = useState(
    []
  );
  const [spentsUtilitiesRneNegative, setSpentsUtilitiesRneNegative] = useState(
    []
  );
  const [isToggleUtilities, setToggle] = useState(true);
  const [isToggleUtilitiesRne, setToggleRne] = useState(true);

  const generalconsumption = useSelector(state => state.generalconsumption);
  const hotelID = useSelector(state => state.user.profile.activeHotel);
  const hotelActiveName = useSelector(
    state => state.user.profile.activeHotelName
  );

  const loadTotals = useCallback(async () => {
    try {
      setLoading(true);
      if (generalconsumption.date && generalconsumption.select) {
        const hotelID = generalconsumption.select[0].value
          ? generalconsumption.select[0].value
          : false;
        if (hotelID) {
          const setYear = generalconsumption.date.getFullYear();
          const setMonth = generalconsumption.date.getMonth() + 1;
          const selectedHotelsParams = new URLSearchParams();
          generalconsumption.select.forEach(element => {
            return selectedHotelsParams.append(
              'selected_hotels',
              element.value
            );
          });
          selectedHotelsParams.append('initial_range_year', setYear);
          selectedHotelsParams.append('initial_range_month', setMonth);
          const request = { params: selectedHotelsParams };
          const response = await api.get(
            `/general-consumption-totals`,
            request
          );
          setTotals(response.data);
        }
      }
    } catch (error) {
      toast.error('Não foi possível carregar consumo geral.');
      console.error('LoadTotals error: ', error);
    }
    setLoading(false);
  }, [generalconsumption.date, generalconsumption.select]);

  const loadSpentUtilities = useCallback(async () => {
    try {
      setLoading(true);
      if (generalconsumption.date && generalconsumption.select) {
        const hotelID = generalconsumption.select[0].value
          ? generalconsumption.select[0].value
          : false;
        if (hotelID) {
          const setYear = generalconsumption.date.getFullYear();
          const setMonth = generalconsumption.date.getMonth() + 1;
          const selectedHotelsParams = new URLSearchParams();
          generalconsumption.select.forEach(element => {
            return selectedHotelsParams.append(
              'selected_hotels',
              element.value
            );
          });
          selectedHotelsParams.append('year', setYear);
          selectedHotelsParams.append('month', setMonth);
          selectedHotelsParams.append('order', 1);
          const requestP = { params: selectedHotelsParams };
          const responsePositive = await api.get(`/utilities-spent`, requestP);
          selectedHotelsParams.set('order', 2);
          const requestN = { params: selectedHotelsParams };
          const responseNegative = await api.get(`/utilities-spent`, requestN);
          setSpentUtilitiesData(responsePositive.data);
          setSpentUtilitiesDataNegative(responseNegative.data);
        }
      }
    } catch (error) {
      toast.error('Não foi possível carregar despesas com utilities.');
      console.error('LoadTotals error: ', error);
    }
    setLoading(false);
  }, [generalconsumption.date, generalconsumption.select]);

  const loadUtilitiesRneSpentVsBudgeted = useCallback(async () => {
    try {
      setLoading(true);
      if (generalconsumption.date && generalconsumption.select) {
        const hotelID = generalconsumption.select[0].value
          ? generalconsumption.select[0].value
          : false;
        if (hotelID) {
          const setYear = generalconsumption.date.getFullYear();
          const setMonth = generalconsumption.date.getMonth() + 1;
          const selectedHotelsParams = new URLSearchParams();
          generalconsumption.select.forEach(element => {
            return selectedHotelsParams.append(
              'selected_hotels',
              element.value
            );
          });
          selectedHotelsParams.append('year', setYear);
          selectedHotelsParams.append('month', setMonth);
          selectedHotelsParams.append('order', 1);
          const requestP = { params: selectedHotelsParams };
          const responsePositive = await api.get(`/utilities-rne`, requestP);
          selectedHotelsParams.set('order', 2);
          const requestN = { params: selectedHotelsParams };
          const responseNegative = await api.get(`/utilities-rne`, requestN);
          setspentUtilitiesDataRne(responsePositive.data);
          setspentUtilitiesDataRneNegative(responseNegative.data);
        }
      }
    } catch (error) {
      toast.error('Não foi possível carregar despesas com utilities.');
      console.error('LoadTotals error: ', error);
    }
    setLoading(false);
  }, [generalconsumption.date, generalconsumption.select]);

  useEffect(() => {
    loadSpentUtilities();
  }, [loadSpentUtilities]);

  useEffect(() => {
    loadUtilitiesRneSpentVsBudgeted();
  }, [loadUtilitiesRneSpentVsBudgeted]);

  useEffect(() => {
    dispatch(changeDateAction(new Date()));
    dispatch(
      selectMultiAction([{ value: Number(hotelID), label: hotelActiveName }])
    );
  }, []); // eslint-disable-line

  useEffect(() => {
    document.title = 'SIM - Consumo | Consumo Geral';
    if (!generalconsumption.select) return;
    loadTotals();
  }, [generalconsumption.select, loadTotals]);

  const currencyBRoptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value) {
              return (
                'R$ ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              );
            },
          },
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
  };

  const setSpentUtilitiesChart = useCallback(async () => {
    const dataChart = {
      data: {
        labels: [''],
        datasets: [
          {
            label: 'Realizado',
            data: [totals[0] && totals[0].spent],
            backgroundColor: ['rgba(0, 48, 94, 0.9)'],
            categoryPercentage: 1.0,
            maxBarThickness: 75,
          },
          {
            label: 'Orçado',
            data: [totals[0] && totals[0].budgeted],
            backgroundColor: ['rgba(227, 231, 255, 0.9)'],
            categoryPercentage: 1.0,
            maxBarThickness: 75,
          },
        ],
      },
      options: currencyBRoptions,
    };
    setSpentUtilities([dataChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals]);

  useEffect(() => {
    setSpentUtilitiesChart();
  }, [setSpentUtilitiesChart]);

  const setUtilitiesRneChart = useCallback(async () => {
    const dataChart = {
      data: {
        labels: [''],
        datasets: [
          {
            label: 'Realizado',
            data: [totals[0] && totals[1].spent],
            backgroundColor: ['rgba(0, 48, 94, 0.9)'],
            maxBarThickness: 75,
          },
          {
            label: 'Orçado',
            data: [totals[0] && totals[1].budgeted],
            backgroundColor: ['rgba(227, 231, 255, 0.9)'],
            maxBarThickness: 75,
          },
        ],
      },
      options: currencyBRoptions,
    };
    setSpentUtilitiesRne([dataChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totals]);

  useEffect(() => {
    setUtilitiesRneChart();
  }, [setUtilitiesRneChart]);

  const optionsBarsWithSliding = {
    scales: {
      yAxes: [
        {
          ticks: {
            callback: function(value) {
              return value + '%';
            },
          },
          scaleLabel: {
            display: true,
            labelString: 'Percentage',
          },
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
  };

  const setSpentsUtilitiesChartPositive = useCallback(async () => {
    const dataSpentsUtilities = [];
    const labelsUtilities = [];
    for (let key in spentUtilitiesData) {
      if (spentUtilitiesData[key].difference > 0) {
        dataSpentsUtilities.push(
          spentUtilitiesData[key] && spentUtilitiesData[key].difference
        );
        labelsUtilities.push(
          spentUtilitiesData[key] && spentUtilitiesData[key].hotel_initials
        );
      }
    }
    const mountChart = {
      data: {
        labels: labelsUtilities,
        datasets: [
          {
            label: 'Utilities',
            data: dataSpentsUtilities,
            backgroundColor: 'rgba(0, 48, 94, 0.9)',
            maxBarThickness: 75,
          },
        ],
      },
      options: optionsBarsWithSliding,
    };
    setSpentsUtilitiesPositive([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spentUtilitiesData]);

  useEffect(() => {
    setSpentsUtilitiesChartPositive();
  }, [setSpentsUtilitiesChartPositive]);

  const setSpentsUtilitiesChartNegative = useCallback(async () => {
    const dataSpentsUtilities = [];
    const labelsUtilities = [];
    for (let key in spentUtilitiesDataNegative) {
      if (spentUtilitiesDataNegative[key].difference < 0) {
        dataSpentsUtilities.push(
          spentUtilitiesDataNegative[key] &&
            spentUtilitiesDataNegative[key].difference
        );
        labelsUtilities.push(
          spentUtilitiesDataNegative[key] &&
            spentUtilitiesDataNegative[key].hotel_initials
        );
      }
    }
    const mountChart = {
      data: {
        labels: labelsUtilities,
        datasets: [
          {
            label: 'Utilities',
            data: dataSpentsUtilities,
            backgroundColor: 'rgba(0, 48, 94, 0.9)',
            maxBarThickness: 75,
          },
        ],
      },
      options: optionsBarsWithSliding,
    };
    setSpentsUtilitiesNegative([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spentUtilitiesDataNegative]);

  useEffect(() => {
    setSpentsUtilitiesChartNegative();
  }, [setSpentsUtilitiesChartNegative]);

  const setSpentsUtilitiesRneChartPositive = useCallback(async () => {
    const dataSpentsUtilitiesRne = [];
    const labelsUtilities = [];
    for (let key in spentUtilitiesDataRne) {
      if (spentUtilitiesDataRne[key].difference > 0) {
        dataSpentsUtilitiesRne.push(
          spentUtilitiesDataRne[key] && spentUtilitiesDataRne[key].difference
        );
        labelsUtilities.push(
          spentUtilitiesDataRne[key] && spentUtilitiesDataRne[key].hotel_initial
        );
      }
    }
    const mountChart = {
      data: {
        labels: labelsUtilities,
        datasets: [
          {
            label: 'Utilities / RNE',
            data: dataSpentsUtilitiesRne,
            backgroundColor: 'rgba(0, 48, 94, 0.9)',
            maxBarThickness: 75,
          },
        ],
      },
      options: optionsBarsWithSliding,
    };
    setSpentsUtilitiesRnePositive([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spentUtilitiesDataRne]);

  useEffect(() => {
    setSpentsUtilitiesRneChartPositive();
  }, [setSpentsUtilitiesRneChartPositive]);

  const setSpentsUtilitiesRneChartNegative = useCallback(async () => {
    const dataSpentsUtilities = [];
    const labelsUtilities = [];
    for (let key in spentUtilitiesDataRneNegative) {
      if (spentUtilitiesDataRneNegative[key].difference < 0) {
        dataSpentsUtilities.push(
          spentUtilitiesDataRneNegative[key] &&
            spentUtilitiesDataRneNegative[key].difference
        );
        labelsUtilities.push(
          spentUtilitiesDataRneNegative[key] &&
            spentUtilitiesDataRneNegative[key].hotel_initial
        );
      }
    }
    const mountChart = {
      data: {
        labels: labelsUtilities,
        datasets: [
          {
            label: 'Utilities',
            data: dataSpentsUtilities,
            backgroundColor: 'rgba(0, 48, 94, 0.9)',
            maxBarThickness: 75,
          },
        ],
      },
      options: optionsBarsWithSliding,
    };
    setSpentsUtilitiesRneNegative([mountChart]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spentUtilitiesDataRneNegative]);

  useEffect(() => {
    setSpentsUtilitiesRneChartNegative();
  }, [setSpentsUtilitiesRneChartNegative]);

  function toggle() {
    setToggle(!isToggleUtilities);
  }

  function toggleRne() {
    setToggleRne(!isToggleUtilitiesRne);
  }

  return (
    <>
      <StyledBoxes className="box">
        {totals.map(item => (
          <div key={item.type} className="box__item">
            <div className="box__item-left">
              <h3>{item.type}</h3>
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
                <span className="icon icon--fulfilled" data-tip="Realizado">
                  <span className="letter">R</span>
                </span>
                {item.spent_formatted}
              </div>
            </div>
          </div>
        ))}
      </StyledBoxes>
      <TwoColumns>
        <Container className="content full">
          <StyledTitleAction>
            <div className="chart-title">Gasto | Utilities</div>
          </StyledTitleAction>
          {loading ? (
            <Shimmer>
              <LoadGraph />
            </Shimmer>
          ) : (
            spentUtilities.map(item => (
              <ChartBar
                key={item.data}
                displayTitle={false}
                displayLegend
                data={item.data}
                options={item.options}
              />
            ))
          )}
        </Container>
        <Container className="content full">
          <StyledTitleAction>
            <div className="chart-title">Utilities x RNE </div>
          </StyledTitleAction>
          {loading ? (
            <Shimmer>
              <LoadGraph />
            </Shimmer>
          ) : (
            spentUtilitiesRne.map(item => (
              <ChartBar
                key={item.data}
                displayTitle={false}
                displayLegend
                data={item.data}
                options={item.options}
              />
            ))
          )}
        </Container>
      </TwoColumns>
      <Container className="content full">
        <StyledTitleAction>
          <div className="chart-title">
            Despesas com Utilities <span>Valores Realizados x Orçados</span>
          </div>
        </StyledTitleAction>
        <RadioSliding
          name="isToggleUtilities"
          changeRadio={toggle}
          icon={false}
          opOne="+10"
          opTwo="-10"
        />
        {loading ? (
          <Shimmer>
            <LoadGraph />
          </Shimmer>
        ) : isToggleUtilities ? (
          spentsUtilitiesPositive.map(item => (
            <ChartBar
              key={item.data}
              displayTitle={false}
              displayLegend
              data={item.data}
              options={item.options}
            />
          ))
        ) : (
          spentsUtilitiesNegative.map(item => (
            <ChartBar
              key={item.data}
              displayTitle={false}
              displayLegend
              data={item.data}
              options={item.options}
            />
          ))
        )}
      </Container>
      <Container className="content full">
        <StyledTitleAction>
          <div className="chart-title">
            Valor Utilities / RNE <span>Valores Realizados x Orçados</span>
          </div>
        </StyledTitleAction>
        <RadioSliding
          name="isToggleUtilitiesRne"
          changeRadio={toggleRne}
          icon={false}
          opOne="+10"
          opTwo="-10"
        />
        {loading ? (
          <Shimmer>
            <LoadGraph />
          </Shimmer>
        ) : isToggleUtilitiesRne ? (
          spentsUtilitiesRnePositive.map(item => (
            <ChartBar
              key={item.data}
              displayTitle={false}
              displayLegend
              data={item.data}
              options={item.options}
            />
          ))
        ) : (
          spentsUtilitiesRneNegative.map(item => (
            <ChartBar
              key={item.data}
              displayTitle={false}
              displayLegend
              data={item.data}
              options={item.options}
            />
          ))
        )}
      </Container>
    </>
  );
}
