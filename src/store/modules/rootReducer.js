import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import receita from './consumo/receita/reducer';
import annualplanning from './consumo/annualplanning/reducer';
import consumptionhotel from './consumo/consumptionhotel/reducer';
import invoice from './consumo/invoice/reducer';
import consumptionreading from './consumo/consumptionreading/reducer';
import generalconsumption from './consumo/generalconsumption/reducer';
import clock from './consumo/clock/reducer';

export default combineReducers({
  auth,
  user,
  receita,
  annualplanning,
  consumptionhotel,
  invoice,
  consumptionreading,
  generalconsumption,
  clock,
});
