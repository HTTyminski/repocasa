export const changeDateAction = date => ({
  type: '@consumo/generalconsumption/CHANGE_DATE_FILTER',
  date,
});

export const selectMultiAction = select => ({
  type: '@consumo/generalconsumption/SELECT_MULTI_FILTER',
  select,
});
