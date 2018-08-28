import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { loginSuccess, loginFailure, sendMailSuccess, sendMailFailure, logoutSuccess, logoutFailure, loginThroughAccessTokenSuccess, loginThroughAccessTokenFailure } from './actions';
import { LOGIN_REQUEST, FORGOT_PASSWORD_REQUEST, LOGOUT, LOGIN_THROUGH_ACCESS_TOKEN } from './constants';
import AuthHelper from '../../helpers/auth/authHelper';
import { setUser, saveAuthVehiclesData, setToken } from '../../helpers/utility';
import { NavigationActions } from 'react-navigation';
import { setCardDetails, removeItem } from '../../helpers/asyncStorage';
import { fetchRecentLocationsSuccess } from '../home/recentLocations/actions';
import { fetchAuthUserDetailsSuccess, getAuthUserVehicleDetailsSuccess } from '../profile/actions';
import { fetchAuthVehiclesSuccess } from '../appointment/vehicle/vehicleActions';

function loginCall({ state }) {
  return new Promise((resolve, reject) => {
    AuthHelper.login(state)
    .then((data) => {
      console.log('in AuthHelper.login');
      console.log(data);
      if (data.user) {
        resolve(data);
      } else if (data.status === 401) {
        reject({ status: data.error });
      } else {
         const error = JSON.parse(data._bodyText).error;
         reject({ status: error });
      } 
    })
    .catch(err => { throw err; });
  });
}

function forgotPasswordCall({ state }) {
  return new Promise((resolve, reject) => {
    AuthHelper.sendMail(state)
    .then((data) => {
      if (data.flag === 22) {
        resolve(data);
      } else {
         const error = JSON.parse(data._bodyText).error;
         reject({ error: error });
      } 
    });
  });
}

function* watchLoginRequest() {
  while (true) {
    const { state } = yield take(LOGIN_REQUEST);

    try {
      const payload = {
        state
      };
      const response = yield call(loginCall, payload);
      yield put(loginSuccess(response));
      yield put(fetchRecentLocationsSuccess(response.user_recent_locations));
      yield put(fetchAuthUserDetailsSuccess(response.user));
      yield put(getAuthUserVehicleDetailsSuccess(response.vehicle));
      yield put(fetchAuthVehiclesSuccess(response.vehicle));
      yield saveAuthVehiclesData(response.vehicle);
      yield setUser(response.user);
      yield setToken(response.user.access_token);
      yield setCardDetails(response.card);
      yield put(NavigationActions.navigate({ routeName: 'drawerStack' }));
      //console.log('SAGA LOGIN SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA LOGIN ERR: ', err);
      yield put(loginFailure(err.status));
    }
  }
}

function* watchForgotPasswordRequest() {
  while (true) {
    const { state } = yield take(FORGOT_PASSWORD_REQUEST);
    try {
      const payload = {
        state
      };
      const response = yield call(forgotPasswordCall, payload);
      yield put(sendMailSuccess(response));
      console.log('SAGA RESET PASSWORD Mail SENT: ', response);
    } catch (err) {

      console.log('SAGA RESET PASSWORD Mail ERROR: ', err);
      yield put(sendMailFailure(err));
    }
  }
}

function logOutCall() {
  return new Promise((resolve, reject) => {
    AuthHelper.logout()
    .then((data) => {
      console.log(data);
      if (typeof data.status === 'undefined') {
        resolve(data);
      } else {
        const error = JSON.parse(data).error;
        reject({ error });
      }
    })
    .catch((error) => console.warn(error));
  });
}

function* watchLogOutRequest() {
  while (true) {
     yield take(LOGOUT);
    try {
      const response = yield call(logOutCall);
      yield removeItem('user');
      yield put(logoutSuccess());
      yield put(NavigationActions.navigate({ routeName: 'loginStack' }));
      console.log('SAGA RESET PASSWORD Mail SENT: ', response);
    } catch (err) {
      console.log('SAGA RESET PASSWORD Mail ERROR: ', err);
      yield put(logoutFailure(err));
    }
  }
}

function loginThroughAccessTokenCall(deviceToken) {
  return new Promise((resolve, reject) => {
    AuthHelper.loginThroughAccessToken(deviceToken)
    .then((data) => {
      if (data.user) {
        resolve(data);
      } else if (data.status === 401) {
        reject({ status: data.error });
      } else {
         const error = JSON.parse(data._bodyText).error;
         reject({ status: error });
      } 
    })
    .catch(err => console.log(err));
  });
}

function* watchloginThroughAccessTokenRequest() {
  while (true) {
   const { deviceToken } = yield take(LOGIN_THROUGH_ACCESS_TOKEN);

    try {
      const response = yield call(loginThroughAccessTokenCall, deviceToken);
      yield put(loginThroughAccessTokenSuccess(response));
      yield put(fetchRecentLocationsSuccess(response.user_recent_locations));
      yield put(fetchAuthUserDetailsSuccess(response.user));
      yield put(getAuthUserVehicleDetailsSuccess(response.vehicle));
      yield put(fetchAuthVehiclesSuccess(response.vehicle));
      yield saveAuthVehiclesData(response.vehicle);
      yield setUser(response.user);
      yield setToken(response.user.access_token);
      yield setCardDetails(response.card);
      if (response.user_pending_tip_notifications.length) {
        yield put(NavigationActions.navigate({ routeName: 'SummaryScreen' }));
      }
      //console.log('SAGA LOGIN SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA LOGIN ERR: ', err);
      yield put(loginThroughAccessTokenFailure(err.status));
    }
  }
}


export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchForgotPasswordRequest);
  yield fork(watchLogOutRequest);
  yield fork(watchloginThroughAccessTokenRequest);
}
