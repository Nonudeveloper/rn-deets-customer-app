import { 
  LOGIN_REQUEST, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE,
  LOGOUT
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
