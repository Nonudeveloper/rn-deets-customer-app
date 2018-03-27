import { AsyncStorage } from 'react-native';
import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE,
  GET_VEHICLE_REQUEST,
  FETCH_VEHICLE_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
} from './constants';

export function registerRequest(state) {
  return {
    type: REGISTER_REQUEST,
    state,
  };
}

export function registerSuccess({ token, user }) {
  return {
    type: REGISTER_SUCCESS,
    token,
    user,
  };
}

export function registerFailure(err) {
  return {
    type: REGISTER_FAILURE,
    err,
  };
}

export function getVehicleRequest() {
  return {
    type: GET_VEHICLE_REQUEST,
  };
}

export function fetchVehicleSuccess(vehicles) {
  return {
    type: FETCH_VEHICLE_SUCCESS,
    vehicles,
  };
}

export function verifyEmailRequest({email}) {
  return {
    type: VERIFY_EMAIL_REQUEST,
    email,
  };
}

export function verifyEmailSuccess(payload) {
  saveEmailSuccess(payload);
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload,
  };
}

const saveEmailSuccess = async (payload) => {
   try {
        await AsyncStorage.setItem('emailAvailability', JSON.stringify(payload));
            console.log('data stored');
      } catch (error) {
            // Error saving data
            console.log('AsyncStorage save error: ' + error.message);
      }
}