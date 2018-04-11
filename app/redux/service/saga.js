import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchServicesSuccess, fetchServicesFaliure } from './serviceActions';
import { FETCH_SERVICES } from './constants';
import ServicesHelper from '../../helpers/services/servicesHelper';


function fetchServicesCall(accessToken) {
    return new Promise((resolve, reject) => {
        ServicesHelper.fetchAllServices(accessToken)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchServices() {
    while (true) {
      const { payload } = yield take(FETCH_SERVICES);
      try {
        const response = yield call(fetchServicesCall, payload);
        yield put(fetchServicesSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchServicesFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchFetchServices);
}
