import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import Auth from './auth/reducer';
import Register from './register/reducer';
import Start from './register/startReducer';
import Vehicle from '../redux/register/vehicleInformation/vehicleReducer';
import ServiceAddress from '../redux/register/serviceAddress/serviceAddressReducer';

import AppNavigation from '../navigation/AppNavigation';

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state);
  return newState || state;
};

const rootReducer = combineReducers({
  Auth,
  nav: navReducer,
  Register,
  Start,
  Vehicle,
  form,
  ServiceAddress
});

export default rootReducer;
