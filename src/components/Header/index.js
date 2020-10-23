import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ReactComponent as LogoSim } from '../../assets/svg/logo-sim.svg';
import { HeaderContent } from './styles';

import UserDropDown from '../UserDropDown';

export default function Header() {
  const hotelName = useSelector(state => state.user.profile.activeHotelName);

  return (
    <HeaderContent>
      <div className="header__logo">
        <Link
          to="/dashboard/consumo/consumo-geral"
          title="SIM - Sistema Integrado de Manutenção"
        >
          <LogoSim />
        </Link>
        {/* <a href="/" title="SIM - Sistema Integrado de Manutenção">
          <LogoSim />
        </a> */}
      </div>
      <div className="header__hotel-name">{hotelName}</div>
      <UserDropDown />
    </HeaderContent>
  );
}
