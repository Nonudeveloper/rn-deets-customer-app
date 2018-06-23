import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchNearByPlacesSuccess, fetchNearByPlacesFaliure, fetchPolygonDataSuccess, fetchPolygonDataFaliure } from './homeActions';
import { FETCH_NEARBY_PLACES, FETCH_POLYGON_DATA } from './constants';
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

//**Generator**//
function* watchFetchPolygonData() {
  while (true) {
    const { addressString } = yield take(FETCH_POLYGON_DATA);
    try {
      const response = yield call(fetchPolygonDataCall, addressString);
      yield put(fetchPolygonDataSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(fetchPolygonDataFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function fetchPolygonDataCall(addressString) {
  return new Promise((resolve, reject) => {
    HomeHelper.fetchPolygonData(addressString)
      .then(res => {
          resolve(res);
      })
      .catch(err => reject(err));
  });
}


export default function* root() {
  yield fork(watchFetchPolygonData);
}
