import { AsyncStorage } from 'react-native';
import { 
  REGISTER_REQUEST, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE,
  GET_VEHICLE_REQUEST,
  FETCH_VEHICLE_SUCCESS,
  VERIFY_EMAIL_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  STORE_IMAGE,
  HIDE_ALERT
} from './constants';

export function registerRequest(userImage, vehicleImage, form1, form2, nonce) {
  return {
    type: REGISTER_REQUEST,
    userImage,
    vehicleImage,
    form1,
    form2,
    nonce
  };
}

export function registerSuccess(token, user) {
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
  return {
    type: VERIFY_EMAIL_SUCCESS,
    payload,
  };
}

export function storeImage(image) {
  return {
    type: STORE_IMAGE,
    image,
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  };
}