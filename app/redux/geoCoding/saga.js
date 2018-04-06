import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { searchAddressSuccess, searchAddressFaliure } from './geoActions';
import { SEARCH_ADDRESS } from './constants';
import HomeHelper from '../../helpers/home/homeHelper';


function searchAddressCall(payload) {
    console.log(payload);
    return new Promise((resolve, reject) => {
        HomeHelper.hitMapboxPlacesApi(payload)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchSearchAddress() {
    while (true) {
      const { payload } = yield take(SEARCH_ADDRESS);
      try {
        const response = yield call(searchAddressCall, payload);
        yield put(searchAddressSuccess(response.json()));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(searchAddressFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchSearchAddress);
}
