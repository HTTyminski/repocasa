import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import api from '../../../../services/api'

import MultiSelectInput from '../../../MultiSelectInput';

export const MultiSelect = props => {
  const [clocks, setClocks] = useState([{ value: 'relogio1', label: 'Relógio 1' }])
  const hotelID = useSelector(state => state.user.profile.activeHotel);
  
  const loadClocks = useCallback(async () => {
    try {
      setClocks([]);
      const selectedHotelParams = new URLSearchParams()
      selectedHotelParams.append('hotel_id', hotelID)
      if (props.clockConfig && props.clockConfig.type !== 0) {
        selectedHotelParams.append('clock_type', props.clockConfig.type)
      }
      const request = { params: selectedHotelParams }
      const response = await api.get(`/clocks`, request);
      const dataClocks = [];
      for (let key in response.data) {
        dataClocks.push({ value: response.data[key].id, label: response.data[key].name });
      }
      setClocks(dataClocks);
    } catch (error) {
      toast.error('Não foi possível carregar os relógios.')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setClocks, props.clockConfig]);

  useEffect(() => {
    loadClocks();
  }, [loadClocks]);

  return (
    <MultiSelectInput
      name="multi-select"
      label="Relógios:"
      options={clocks}
      isMulti
      // isDisabled={loading}
      placeholder="Buscar relógios"
      noOptionsMessage={() => 'Não há relógios.'}
      cacheOptions
      {...props}
    />
  );
};
