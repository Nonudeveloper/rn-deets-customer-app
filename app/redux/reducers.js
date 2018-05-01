import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import Auth from './auth/reducer';
import Register from './register/reducer';
import Start from './register/startReducer';
import Vehicle from '../redux/register/vehicleInformation/vehicleReducer';
import HomeReducer from '../redux/home/homeReducer';
import GeoReducer from '../redux/geoCoding/geoReducer';
import AuthVehicle from '../redux/appointment/vehicle/vehicleReducer';
import ServiceReducer from '../redux/service/serviceReducer';
import appointmentReducer from '../redux/appointment/reducer';
import profileReducer from '../redux/profile/reducer';

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
  home: HomeReducer,
  Geo: GeoReducer,
  AuthVehicle,
  Service: ServiceReducer,
  Appointment: appointmentReducer,
  profile: profileReducer
});

export default rootReducer;
