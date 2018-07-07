import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchPolygonDataSuccess, fetchPolygonDataFaliure, payTipToTechnicianSuccess, payTipToTechnicianFaliure } from './homeActions';
import { FETCH_POLYGON_DATA, PAY_TIP_TO_TECHNICIAN } from './constants';
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


function payTipToTechnicianCall(payload) {
  return new Promise((resolve, reject) => {
    HomeHelper.payTipToTechnician(payload)
    .then((res) => {
      if (res.flag === 39) {
        resolve(res);
      } else {
        const error = JSON.parse(res._bodyText).error;
        reject({ error });
      } 
    });
  });
}

function* watchPayTipToTechnicianRequest() {
  while (true) {
     const { payload } = yield take(PAY_TIP_TO_TECHNICIAN);
    try {
      const response = yield call(payTipToTechnicianCall, payload);
      yield put(payTipToTechnicianSuccess(response));
      console.log('Recent Location Success: ', response);
    } catch (err) {
      console.log('Recent Location ERROR: ', err);
      yield put(payTipToTechnicianFaliure(err));
    }
  }
}


export default function* root() {
  yield fork(watchFetchPolygonData);
  yield fork(watchPayTipToTechnicianRequest);
}
