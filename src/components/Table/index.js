import React from 'react';

import { StyledTable } from './styles';

export default function Table() {
  return (
    <>
      <StyledTable className="table">
        <div className="table__group">
          <div className="table__head">Mês</div>
          <div className="table__column">
            <ul className="table__body">
              <li />
              <li>Mar/19</li>
              <li>Mar/19</li>
              <li>Mar/19</li>
              <li>Mar/19</li>
              <li>Mar/19</li>
            </ul>
          </div>
        </div>
        <div className="table__group">
          <div className="table__head">Consumo</div>
          <div className="table__column">
            <ul className="table__body">
              <li>Orçado</li>
              <li>1.600,00m</li>
              <li>1.600,00m</li>
              <li>1.600,00m</li>
              <li>1.600,00m</li>
              <li>1.600,00m</li>
            </ul>
            <ul className="table__body">
              <li>Realizado</li>
              <li>1.640,00m</li>
              <li>1.640,00m</li>
              <li>1.640,00m</li>
              <li>1.640,00m</li>
              <li>1.640,00m</li>
            </ul>
            <ul className="table__body">
              <li>YTD</li>
              <li>2.420,00m</li>
              <li>2.420,00m</li>
              <li>2.420,00m</li>
              <li>2.420,00m</li>
              <li>2.420,00m</li>
            </ul>
          </div>
        </div>
        <div className="table__group">
          <div className="table__head">Custo (R$)</div>
          <div className="table__column">
            <ul className="table__body">
              <li>Orçado</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
            </ul>
            <ul className="table__body">
              <li>Realizado</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
            </ul>
            <ul className="table__body">
              <li>YTD</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
              <li>R$ 23.285,87</li>
            </ul>
          </div>
        </div>
        <div className="table__group">
          <div className="table__head">Custo / RN</div>
          <div className="table__column">
            <ul className="table__body">
              <li>Realizado</li>
              <li>R$ 23,87</li>
              <li>R$ 23,87</li>
              <li>R$ 23,87</li>
              <li>R$ 23,87</li>
              <li>R$ 23,87</li>
            </ul>
          </div>
        </div>
      </StyledTable>
    </>
  );
}
