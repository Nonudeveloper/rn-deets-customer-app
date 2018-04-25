import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchNearByPlacesSuccess, fetchNearByPlacesFaliure } from './homeActions';
import { FETCH_NEARBY_PLACES } from './constants';
import HomeHelper from '../../helpers/home/homeHelper';


function fetchNearByPlacesCall(payload) {
    return new Promise((resolve, reject) => {
      RegisterHelper.fetchNearByPlaces({ payload })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchNearByPlaces() {
    while (true) {
      const { payload } = yield take(FETCH_NEARBY_PLACES);
      try {
        const response = yield call(fetchNearByPlacesCall, payload);
        yield put(fetchNearByPlacesSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchNearByPlacesFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  // yield fork(watchFetchNearByPlaces);
}
