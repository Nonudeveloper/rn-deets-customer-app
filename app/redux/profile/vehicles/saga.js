import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { FETCH_ALL_USER_VEHICLES } from './constants';
import ProfileHelper from '../../helpers/profile/profileHelper';
import { fetchAllUserVehiclesSuccess, fetchAllUserVehiclesFaliure } from './vehiclesActions';


function fetchAllUserVehiclesCall(payload) {
    return new Promise((resolve, reject) => {
        ProfileHelper.fetchNearByPlaces({ payload })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchAllUserVehicles() {
    while (true) {
      const { payload } = yield take(FETCH_ALL_USER_VEHICLES);
      try {
        const response = yield call(fetchAllUserVehiclesCall, payload);
        yield put(fetchAllUserVehiclesSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchAllUserVehiclesFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchFetchAllUserVehicles);
}
