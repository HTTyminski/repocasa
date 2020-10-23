import React from 'react';

import Route from './Route';

// import Dashboard from '../pages/Dashboard';
import Main from '../pages/Main';

import Contas from '../pages/Contas';
import Rotinas from '../pages/Rotinas';
import Receita from '../pages/Receita';
import Relogios from '../pages/Relogios';
import ConsumoGeral from '../pages/ConsumoGeral';
import ConsumoHotel from '../pages/ConsumoHotel';
import LeituraConsumo from '../pages/LeituraConsumo';
import PlanejamentoAnual from '../pages/PlanejamentoAnual';

const key = [];

export default [
  <Route
    key={key}
    path="/dashboard"
    exact
    titlePage="Dashboard"
    component={Main}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/rotinas"
    titlePage="Rotinas"
    component={Rotinas}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/consumo-geral"
    titlePage="Consumo geral"
    component={ConsumoGeral}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/consumo-hotel"
    titlePage="Consumo por hotel"
    component={ConsumoHotel}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/contas"
    titlePage="Contas"
    component={Contas}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/leitura-consumo"
    titlePage="Leitura de consumo"
    component={LeituraConsumo}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/planejamento-anual"
    titlePage="Planejamento anual de utilities"
    component={PlanejamentoAnual}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/receita"
    titlePage="Receita"
    component={Receita}
    isPrivate
  />,
  <Route
    key={key}
    path="/dashboard/consumo/relogios"
    titlePage="Relógios"
    component={Relogios}
    isPrivate
  />,
];
