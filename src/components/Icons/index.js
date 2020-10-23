import React from 'react';

import { ReactComponent as IconRotina } from '../../assets/svg/icon-rotina.svg';
import { ReactComponent as IconConsumo } from '../../assets/svg/icon-consumo.svg';
import { ReactComponent as IconDocLegal } from '../../assets/svg/icon-documentacao.svg';
import { ReactComponent as IconFinanceiro } from '../../assets/svg/icon-financeiro.svg';
import { ReactComponent as IconOrdermServico } from '../../assets/svg/icon-ordem.svg';
import { ReactComponent as IconSempreNovo } from '../../assets/svg/icon-sempre-novo.svg';
import { ReactComponent as IconContatos } from '../../assets/svg/icon-contatos.svg';
import { ReactComponent as IconCorporativo } from '../../assets/svg/icon-corporativo.svg';
import { ReactComponent as IconGrupoHoteis } from '../../assets/svg/icon-grupo-hoteis.svg';

import { ReactComponent as IconFilter } from '../../assets/svg/icon-filtro.svg';
import { ReactComponent as IconArrowRight } from '../../assets/svg/icon-arrow-right.svg';
import { ReactComponent as IconGraph } from '../../assets/svg/icon-graph.svg';
import { ReactComponent as IconList } from '../../assets/svg/icon-list.svg';

import { ReactComponent as IconGas } from '../../assets/svg/icon-gas.svg';
import { ReactComponent as IconWater } from '../../assets/svg/icon-agua.svg';
import { ReactComponent as IconEnergy } from '../../assets/svg/icon-energia.svg';
import { ReactComponent as IconUtilities } from '../../assets/svg/icon-utilities.svg';

import { ReactComponent as IconClockBig } from '../../assets/svg/icon-clock.svg';
import { ReactComponent as IconClockSmall } from '../../assets/svg/icon-clock2.svg';
import { ReactComponent as IconPlus } from '../../assets/svg/icon-plus.svg';
import { ReactComponent as IconMore } from '../../assets/svg/icon-more.svg';
import { ReactComponent as IconDelete } from '../../assets/svg/icon-delete.svg';
import { ReactComponent as IconTrash } from '../../assets/svg/icon-trash.svg';

const iconList = {
  iconRotina: IconRotina,
  iconConsumo: IconConsumo,
  iconDocLegal: IconDocLegal,
  iconFinanceiro: IconFinanceiro,
  iconOrdemServico: IconOrdermServico,
  iconSempreNovo: IconSempreNovo,
  iconContatos: IconContatos,
  iconCorporativo: IconCorporativo,
  iconGrupoHoteis: IconGrupoHoteis,
  iconFilter: IconFilter,
  iconArrowRight: IconArrowRight,
  iconGas: IconGas,
  iconWater: IconWater,
  iconEnergy: IconEnergy,
  iconUtilities: IconUtilities,
  iconClockBig: IconClockBig,
  iconClockSmall: IconClockSmall,
  iconPlus: IconPlus,
  iconMore: IconMore,
  iconDelete: IconDelete,
  iconTrash: IconTrash,
  iconGraph: IconGraph,
  iconList: IconList
};

const IconComponent = ({ name, ...props }) => {
  const Icon = iconList[name];
  return <Icon {...props} />;
};

export default IconComponent;
