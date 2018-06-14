import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
    LOGOUT,
    FORGOT_PASSWORD_REQUEST,
    RESET_PASSWORD_MAIL_SENT,
    RESET_PASSWORD_MAIL_ERROR,
    HIDE_ALERT,
    HIDE_RESET_ALERT,
    SAVE_DEVICE_TOKEN,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    LOGIN_THROUGH_ACCESS_TOKEN,
    LOGIN_THROUGH_ACCESS_TOKEN_SUCCESS,
    LOGIN_THROUGH_ACCESS_TOKEN_FAILURE
} from './constants';
import { LOAD } from 'redux-storage';


const initialState = {
    isAuthenticated: false,
    isFetching: false,
    token: '',
    user: {},
    errorMessage: '',
    successLog: '',
    showAlert: false,
    isLoading: false,
    resetSuccessLog: false,
    showResetAlert: false,
    resetErrorLog: false,
    deviceToken: {},
    authUserWholeData: [],
    userVehicledata: [],
};

export default function user(state = initialState, action) {
    switch (action.type) {
      case LOAD:
        return {
          ...state,
          errorMessage: '',
          showAlert: false,
          isLoading: false
        };
      case LOGIN_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
          isLoading: true
        });
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          token: action.user.access_token,
          failure: false,
          user: action.user,
          isLoading: false,
          authUserWholeData: action.authUserData,
          userVehicledata: action.vehicle,
        });
      case LOGIN_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          failure: true,
          errorMessage: action.err,
          showAlert: true,
          isLoading: false
        });
      case HIDE_ALERT:
        return Object.assign({}, state, {
          showAlert: false,
          errorMessage: ''
        });
      case FORGOT_PASSWORD_REQUEST:
        return Object.assign({}, state, {
          isFetching: false,
          failure: true,
          isLoading: true,
          errorMessage: action.err,
        });
      case RESET_PASSWORD_MAIL_SENT:
        return Object.assign({}, state, {
          isFetching: true,
          failure: false,
          resetSuccessLog: action.log,
          showResetAlert: true,
          isLoading: false,
          resetErrorLog: false
        });
      case RESET_PASSWORD_MAIL_ERROR:
        return Object.assign({}, state, {
          isFetching: false,
          failure: true,
          resetErrorLog: action.error,
          showResetAlert: true,
          isLoading: false,
          resetSuccessLog: false
        });
      case HIDE_RESET_ALERT:
        return Object.assign({}, state, {
          showResetAlert: false,
          isLoading: false,
          resetSuccessLog: false,
          resetErrorLog: false
        });
      case SAVE_DEVICE_TOKEN:
        return Object.assign({}, state, {
          deviceToken: action.token
        });
      case LOGOUT_SUCCESS:
        return initialState;
      case LOGOUT_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        });
      case LOGIN_THROUGH_ACCESS_TOKEN:
        return Object.assign({}, state, {
        });
      case LOGIN_THROUGH_ACCESS_TOKEN_SUCCESS:
        return Object.assign({}, state, {
          token: action.user.access_token,
          user: action.user,
          authUserWholeData: action.authUserData,
          userVehicledata: action.vehicle,
        });
      case LOGIN_THROUGH_ACCESS_TOKEN_FAILURE:
        return Object.assign({}, state, {
          errorMessage: action.err
        });
      default:
        return state;
    }
  }
