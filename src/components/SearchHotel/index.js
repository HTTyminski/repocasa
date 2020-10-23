import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Search from '../Search';

import {
  setActiveHotel,
  setActiveHotelName,
} from '../../store/modules/user/actions';

import { StyledSearchHotel } from './styles';
import { ReactComponent as IconSearch } from '../../assets/svg/icon-search.svg';

import api from '../../services/api';

// eslint-disable-next-line react/prop-types
export default function SearchHotel({ hideAt = [] }) {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [hotels, setHotels] = useState([]);
  const token = useSelector(state => state.auth.token);
  const [hotelSelected, setHotelSelected] = useState('');

  // eslint-disable-next-line react/prop-types
  const canShow = !hideAt.includes(window.location.pathname);

  const hotelID = useSelector(state => state.user.profile.activeHotel);
  console.log('ACTIVE HOTEL ID:', hotelID || 'Não selecionado ainda.');

  const hotelActiveName = useSelector(
    state => state.user.profile.activeHotelName
  );

  console.log(
    'ACTIVE HOTEL NAME:',
    hotelActiveName || 'Não selecionado ainda.'
  );

  const loadHotels = useCallback(async () => {
    const response = await api.get('/hotels', {
      headers: {
        Authorization: `${token}`,
      },
    });

    const { data = [] } = response;

    const newData = data.map(r => ({ ...r, title: r.name }));

    setHotels(newData);
  }, [token]);

  function handleSubmit(data) {
    dispatch(setActiveHotel(data.value));
    dispatch(setActiveHotelName(data.label));
  }

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  useEffect(() => {
    if (ref.current && ref.current.selectedOptions.length > 0) {
      const { id, value } = ref.current.selectedOptions[0];
      dispatch(setActiveHotel(id));
      dispatch(setActiveHotelName(value));
    }
  }); // eslint-disable-line

  const hideTemporarily = '/dashboard/consumo/consumo-geral';

  return (
    canShow && (
      <StyledSearchHotel
        className={
          window.location.pathname === hideTemporarily ? 'hide-temporarily' : ''
        }
      >
        <span>Você está vendo</span>
        <div className="search-hotel">
          <Search
            name="hotels"
            label=""
            ref={ref}
            options={hotels.map(el => ({
              value: el.id,
              label: el.name,
            }))}
            value={hotelSelected || hotelActiveName}
            onChange={e => handleSubmit(e)}
            defaultValue={{ label: hotelActiveName }}
          />
          <button type="submit">
            <IconSearch />
          </button>
        </div>
      </StyledSearchHotel>
    )
  );
}
