const INITIAL_STATE = {
  date: null,
};

export default function annualplanning(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@consumo/annualplanning/CHANGE_DATE_FILTER':
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
}
