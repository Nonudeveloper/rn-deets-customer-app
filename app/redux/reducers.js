import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import Auth from './auth/reducer';

import AppNavigation from '../navigation/AppNavigation';

const navReducer = (state, action) => {
  const newState = AppNavigation.router.getStateForAction(action, state)
  return newState || state;
};

const rootReducer = combineReducers({
  Auth,
  form,
  nav: navReducer
});

export default rootReducer;
