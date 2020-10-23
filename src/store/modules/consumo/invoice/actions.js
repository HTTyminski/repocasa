export const changeDateAction = date => ({
  type: '@consumo/invoice/CHANGE_DATE_FILTER',
  date,
});

export const changeInvoiceCheckboxAction = consumption => ({
  type: '@consumo/invoice/CHANGE_BOX_FILTER',
  consumption,
});
