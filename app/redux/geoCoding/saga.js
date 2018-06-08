import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { 
  searchAddressSuccess, 
  searchAddressFaliure, 
  getFullAddressReverseGeoSuccess, 
  getFullAddressReverseGeoFaliure 
} from './geoActions';
import { SEARCH_ADDRESS, GET_FULL_ADDRESS_REVERSE_GEO } from './constants';
import HomeHelper from '../../helpers/home/homeHelper';


function searchAddressCall(payload) {
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
        yield put(searchAddressSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(searchAddressFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

function getFullAddressReverseGeoCall(payload) {
    return new Promise((resolve, reject) => {
        HomeHelper.hitMapboxReverseGeo(payload)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}

  //**Generator */
function* watchGetFullAddressReverseGeo() {
  while (true) {
    const { payload } = yield take(GET_FULL_ADDRESS_REVERSE_GEO);
    try {
      const response = yield call(getFullAddressReverseGeoCall, payload);
      yield put(getFullAddressReverseGeoSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(getFullAddressReverseGeoFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

export default function* root() {
  yield fork(watchSearchAddress);
  yield fork(watchGetFullAddressReverseGeo);
}
