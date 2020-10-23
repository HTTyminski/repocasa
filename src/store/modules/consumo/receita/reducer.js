const INITAL_STATE = {
  date: null,
};

export default function receita(state = INITAL_STATE, action) {
  switch (action.type) {
    case '@consumo/receita/CHANGE_DATE_FILTER':
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
