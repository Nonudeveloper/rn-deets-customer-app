import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchPolygonDataSuccess, fetchPolygonDataFaliure } from './homeActions';
import { FETCH_POLYGON_DATA } from './constants';
import HomeHelper from '../../helpers/home/homeHelper';


//**Generator**//
function* watchFetchPolygonData() {
  while (true) {
    const { center } = yield take(FETCH_POLYGON_DATA);
    try {
      const response = yield call(fetchPolygonDataCall, center);
      yield put(fetchPolygonDataSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(fetchPolygonDataFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function fetchPolygonDataCall(center) {
  return new Promise((resolve, reject) => {
    HomeHelper.fetchPolygonData(center)
      .then(res => {
          resolve(res);
      })
      .catch(err => reject(err));
  });
}


export default function* root() {
  yield fork(watchFetchPolygonData);
}
