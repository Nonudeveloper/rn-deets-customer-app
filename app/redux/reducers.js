import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { Keyboard } from 'react-native';
import Auth from './auth/reducer';
import Register from './register/reducer';
import Start from './register/startReducer';
import Vehicle from '../redux/register/vehicleInformation/vehicleReducer';
import HomeReducer from '../redux/home/homeReducer';
import GeoReducer from '../redux/geoCoding/geoReducer';
import AuthVehicle from '../redux/appointment/vehicle/vehicleReducer';
import ServiceReducer from '../redux/appointment/services/serviceReducer';
import appointmentReducer from '../redux/appointment/reducer';
import profileReducer from '../redux/profile/reducer';
import appointmentLists from '../redux/appointmentList/reducer';
import promoCodeReducer from '../redux/promotionCode/reducer';
import recentLocationsReducer from '../redux/home/recentLocations/reducer';
import messages from '../redux/chat/messages';
import user from '../redux/chat/user';
import users from '../redux/chat/users';

import AppNavigation from '../navigation/AppNavigation';

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state);
  if (action.routeName && action.routeName === 'DrawerOpen') { Keyboard.dismiss(); }
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
  Profile: profileReducer,
  appointmentLists,
  PromotionCode: promoCodeReducer,
  RecentLocations: recentLocationsReducer,
  messages,
  user,
  users
});

export default rootReducer;
export * from '../redux/chat/users';
export * from '../redux/chat/messages';
