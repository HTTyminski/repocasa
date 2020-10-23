import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// import ReactTooltip from 'react-tooltip';

import Header from '../../../components/Header';
import Burger from '../../../components/Burger';
import SideBar from '../../../components/SideBar';
import MenuContent from '../../../components/Menu';
import Breadcrumb from '../../../components/Breadcrumb';
import SearchHotel from '../../../components/SearchHotel';

import { ReactComponent as LogoVega } from '../../../assets/svg/logo-vega.svg';
import { Wrapper, App, StyledMain, Title } from './styles';

export default function DefaultLayout({ children, titlePage }) {
  // const searchHotelHideAt = ['/dashboard/consumo/consumo-geral'];

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  console.log('ACTIVE HOTEL ID:', hotelID || 'Não selecionado ainda.');

  useEffect(() => {}, [hotelID]);
  return (
    <Wrapper>
      <Header />
      <App>
        <Burger />
        <nav className="app__sidebar">
          <MenuContent />
          <div className="sidebar__logo">
            <a
              href="https://www.vegait.com.br"
              rel="noopener noreferrer"
              title="VEGA I.T."
              target="_blank"
            >
              <LogoVega />
            </a>
          </div>
        </nav>
        <main className="app__content">
          <StyledMain>
            <div className="main-left main-left--75">
              <Breadcrumb {...children} />
              <Title>{titlePage}</Title>
            </div>
            <div className="main-right">
              <SearchHotel />
              {/* <SearchHotel hideAt={searchHotelHideAt} /> */}
            </div>
          </StyledMain>
          {children}
        </main>
        <SideBar />
      </App>
      {/* <ReactTooltip /> */}
    </Wrapper>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
  titlePage: PropTypes.string.isRequired,
};
