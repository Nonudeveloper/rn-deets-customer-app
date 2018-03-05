import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { loginSuccess, loginFailure } from './actions';
import { LOGIN_REQUEST } from './constants';
import AuthHelper from '../../helpers/auth/authHelper';
import { setToken, clearToken, getToken } from '../../helpers/utility';

// const loginData = {
//   token: 'my secret token',
//   user: {
//     name: 'feitico',
//     email: 'user@gmail.com',
//   },
// };


function loginCall({ state }) {

  return new Promise((resolve, reject) => {
    const result = AuthHelper.login(state);
    if (result.token) {
      resolve(result);
    } else {
       reject({ status: 'wrong email or password' });
    }
  });

  //  return new Promise((resolve, reject) => {
  //   AuthHelper.login(state)
  //     .then(res => {
  //       console.log(res);
  //       if (res.token) {
  //         resolve(res);
  //       } 
  //     });
  // });
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
      yield setToken(response.token);
      console.log('SAGA LOGIN SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA LOGIN ERR: ', err);
      yield put(loginFailure(err.status));
    }
  }
}


export default function* root() {
  yield fork(watchLoginRequest);
}
