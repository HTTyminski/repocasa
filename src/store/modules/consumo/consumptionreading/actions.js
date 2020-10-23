export const changeDateAction = date => ({
  type: '@consumo/consumptionreading/CHANGE_DATE_FILTER',
  date,
});

export const changeConsumptionReadingboxAction = consumption => ({
  type: '@consumo/consumptionreading/CHANGE_BOX_FILTER',
  consumption,
});
