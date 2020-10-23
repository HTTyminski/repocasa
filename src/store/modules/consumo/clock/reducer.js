const INITAL_STATE = {
  consumption: ['GAS'],
};

export default function clock(state = INITAL_STATE, action) {
  switch (action.type) {
    case '@consumo/clock/CHANGE_BOX_FILTER': {
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
