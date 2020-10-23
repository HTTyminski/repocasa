const INITAL_STATE = {
  date: null,
  select: [],
};

export default function generalconsumption(state = INITAL_STATE, action) {
  switch (action.type) {
    case '@consumo/generalconsumption/CHANGE_DATE_FILTER':
      return {
        ...state,
        date: action.date,
      };
    case '@consumo/generalconsumption/SELECT_MULTI_FILTER':
      return {
        ...state,
        select: action.select,
      };
    default:
      return state;
  }
}
