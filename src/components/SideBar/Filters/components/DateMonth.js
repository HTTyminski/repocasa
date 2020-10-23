import React from 'react';

// import { useSelector, useDispatch } from 'react-redux';
// import * as ReceitaActions from '../../../../store/modules/consumo/receita/actions';

import DatePickerMonth from '../../../DatePickerMonth';

export const DateMonth = props => {
  return (
    <DatePickerMonth {...props} className="" name="date" label="Período:" />
  );
};

// export const DateMonthRedux = props => {
//   const dispatch = useDispatch();
//   const receita = useSelector(state => state.receita);

//   const handleChangeDate = newDate => {
//     dispatch(ReceitaActions.changeDateAction(newDate));
//   };

//   return (
//     <DatePickerMonth
//       {...props}
//       className=""
//       onChange={handleChangeDate}
//       value={receita.date}
//       name="date"
//       label="Período:"
//     />
//   );
// };
