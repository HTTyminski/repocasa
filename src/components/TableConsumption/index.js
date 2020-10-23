import React from 'react';

import { StyledTable } from './styles';

export default function TableConsumption({ data, clockType }) {
  const generateKey = pre => {
    return Math.floor(Math.random() * 156432156461);
  };

  return (
    <>
      <StyledTable className="table">
        <div className="table__group">
          <div className="table__head">Mês</div>
          <div className="table__column">
            <ul className="table__body">
              <li />
              {data.map(item => (
                <li key={generateKey()}>
                  {item.month_name}/{item.year}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {clockType.value !== 'UTILITIES' && (
          <div className="table__group">
            <div className="table__head">Consumo</div>
            <div className="table__column">
              <ul className="table__body">
                <li>Orçado</li>
                {data.map(item => (
                  <li key={generateKey()}></li>
                ))}
              </ul>
              <ul className="table__body">
                <li>Realizado</li>
                {data.map(item => (
                  <li key={generateKey()}>{item.read_formatted}</li>
                ))}
              </ul>
              <ul className="table__body">
                <li>YTD</li>
                {data.map(item => (
                  <li key={generateKey()}>
                    {item.year_to_date_read_formatted}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="table__group">
          <div className="table__head">Custo (R$)</div>
          <div className="table__column">
            <ul className="table__body">
              <li>Orçado</li>
              {data.map(item => (
                <li key={generateKey()}>{item.budgeted_formatted}</li>
              ))}
            </ul>
            <ul className="table__body">
              <li>Realizado</li>
              {data.map(item => (
                <li key={generateKey()}>{item.spent_formatted}</li>
              ))}
            </ul>
            <ul className="table__body">
              <li>YTD</li>
              {data.map(item => (
                <li key={generateKey()}>{item.year_to_date_value_formatted}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="table__group">
          <div className="table__head">Custo / RN</div>
          <div className="table__column">
            <ul className="table__body">
              <li>Realizado</li>
              {data.map(item => (
                <li key={generateKey()}>{item.rne_formatted}</li>
              ))}
            </ul>
          </div>
        </div>
      </StyledTable>
    </>
  );
}
