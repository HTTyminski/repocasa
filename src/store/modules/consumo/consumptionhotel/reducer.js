import moment from 'moment';

const INITAL_STATE = {
  start: moment().startOf('year'),
  end: moment().endOf('year'),
  select: null,
  consumption: ["UTILITIES"],
};

export default function receita(state = INITAL_STATE, action) {
  switch (action.type) {
    case '@consumo/consumptionhotel/CHANGE_DATE_FILTER':
      // console.log('oq ta no action', action);
      return {
        ...state,
        start: action.start,
        end: action.end,
      };
    case '@consumo/consumptionhotel/CHANGE_BOX_FILTER': {
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
    case '@consumo/consumptionhotel/SELECT_MULTI_FILTER':
      return {
        ...state,
        select: action.select,
      };
    default:
      return state;
  }
}
