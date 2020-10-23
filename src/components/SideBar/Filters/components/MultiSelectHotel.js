import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

import MultiSelectInput from '../../../MultiSelectInput';

import api from '../../../../services/api';

export const MultiSelectHotel = props => {
  const [hotels, setHotels] = useState([]);

  const token = useSelector(state => state.auth.token);

  const loadHotels = useCallback(async () => {
    const response = await api.get('/hotels', {
      headers: {
        Authorization: `${token}`,
      },
    });

    const { data = [] } = response;

    const separate = data.map(x => x.name.split(' '));

    const sigla = separate.map(el =>
      el
        .map(elem => elem.substr(0, 1))
        .join()
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '')
        .toUpperCase()
    );

    const newData = data.map((x, i) => ({
      value: x.id,
      label: x.name,
      sigla: sigla[i],
    }));

    setHotels(newData);
  }, [token]);

  useEffect(() => {
    loadHotels();
  }, [loadHotels]);

  return (
    <MultiSelectInput
      name="multi-select"
      label="Hotéis:"
      options={hotels}
      isMulti
      on
      placeholder="Buscar hotéis"
      noOptionsMessage={() => 'Não há hotéis.'}
      {...props}
    />
  );
};
