import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { loginSuccess, loginFailure, sendMailSuccess, sendMailFailure } from './actions';
import { LOGIN_REQUEST, FORGOT_PASSWORD_REQUEST } from './constants';
import AuthHelper from '../../helpers/auth/authHelper';
import { setUser, saveAuthVehiclesData, setToken } from '../../helpers/utility';
import { NavigationActions } from 'react-navigation';
import { setCardDetails } from '../../helpers/asyncStorage';

function loginCall({ state }) {
  return new Promise((resolve, reject) => {
    AuthHelper.login(state)
    .then((data) => {
      if (data.status === 200) {
        resolve(data);
      } else if (data.status === 401) {
        reject({ status: data.error });
      } else {
         const error = JSON.parse(data._bodyText).error;
         reject({ status: error });
      } 
    })
    // .catch(err => console.log(err));
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
      yield saveAuthVehiclesData(response.vehicle);
      yield setUser(response.user);
      yield setToken(response.access_token);
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


export default function* root() {
  yield fork(watchLoginRequest);
  yield fork(watchForgotPasswordRequest);
}
