export const changeDateAction = (start, end) => ({
  type: '@consumo/consumptionhotel/CHANGE_DATE_FILTER',
  start,
  end,
});

export const changeConsumptionHotelCheckboxAction = consumption => ({
  type: '@consumo/consumptionhotel/CHANGE_BOX_FILTER',
  consumption,
});

export const selectMultiAction = select => ({
  type: '@consumo/consumptionhotel/SELECT_MULTI_FILTER',
  select,
});
