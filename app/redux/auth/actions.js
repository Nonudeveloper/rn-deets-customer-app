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
  SAVE_DEVICE_TOKEN
} from './constants';

export function loginRequest(state) {
  return {
    type: LOGIN_REQUEST,
    state,
  };
}

export function loginSuccess({ token, user }) {
  return {
    type: LOGIN_SUCCESS,
    token,
    user,
  };
}

export function loginFailure(err) {
  return {
    type: LOGIN_FAILURE,
    err,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}

export function forgotPasswordRequest(state) {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    state,
  };
}

export function sendMailSuccess({ log }) {
  console.log(log);
  return {
    type: RESET_PASSWORD_MAIL_SENT,
    log
  };
}

export function sendMailFailure({ error }) {
  return {
    type: RESET_PASSWORD_MAIL_ERROR,
    error
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  };
}

export function hideResetAlert() {
  return {
    type: HIDE_RESET_ALERT
  };
}

export function saveDeviceToken(token) {
  return {
    type: SAVE_DEVICE_TOKEN,
    token,
  };
}

