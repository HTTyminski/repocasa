const INITAL_STATE = {
  date: null,
  consumption: ['GAS'],
};

export default function invoice(state = INITAL_STATE, action) {
  switch (action.type) {
    case '@consumo/invoice/CHANGE_DATE_FILTER':
      return {
        ...state,
        date: action.date,
      };
    case '@consumo/invoice/CHANGE_BOX_FILTER': {
      // console.log('oq ta no action', action);
      const checks = [...state.consumption];

      const index = checks.findIndex(value => value === action.consumption);

      checks.splice(index, 1);
      checks.push(action.consumption);

      return {
        ...state,
        consumption: checks,
      };
    }
    default:
      return state;
  }
}
