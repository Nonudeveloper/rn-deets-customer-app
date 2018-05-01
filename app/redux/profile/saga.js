import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchAuthUserDetailsSuccess } from './actions';
import { FETCH_AUTH_USER_DETAILS } from './constants';
import { getItem } from '../../helpers/asyncStorage'



  //**Generator */
  function* watchAuthUserDetails() {
    while (true) {
      yield take(FETCH_AUTH_USER_DETAILS);
      try {
        const response = yield getItem('user');
        yield put(fetchAuthUserDetailsSuccess(JSON.parse(response)));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchAuthUserDetails);
}
