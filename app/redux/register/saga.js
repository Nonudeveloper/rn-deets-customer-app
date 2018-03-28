import React from 'react';
import { AsyncStorage } from 'react-native';
import { take, put, call, fork } from 'redux-saga/effects';
import { 
  fetchVehiclesSuccess, 
  recieveVehiclesData,
} from './startActions';
import { 
  FETCH_VEHICLES, 
  VERIFY_EMAIL_REQUEST,
  FETCH_VEHICLES_FROM_ASYNC_STORAGE, 
  FETCH_MAKE_MODEL,
} from './constants';
import { verifyEmailSuccess } from './actions';
import RegisterHelper from '../../helpers/register/registerHelper';
import { fetchMakeModelSuccess } from './vehicleInformation/vehicleActions';

function fetchVehiclesCall() {
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchAllVehicles()
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
  });
}

//**Generator */
function* fetchVehiclesRequest() {
  while (true) {
    yield take(FETCH_VEHICLES);
    try {
      const response = yield call(fetchVehiclesCall);
      yield put(fetchVehiclesSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}
//**Generator */
function* watchFetchVehiclesFromAsyncStorage() {
  while (true) {
    yield take(FETCH_VEHICLES_FROM_ASYNC_STORAGE);
    try {
      const response = yield AsyncStorage.getItem('vehicles');
      console.log(response);
      yield put(recieveVehiclesData(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}
//**Generator */
function* watchFetchMakeModel() {
  while (true) {
    const { year } = yield take(FETCH_MAKE_MODEL);
    try {
      const payload = {
        year
      };
      const response = yield call(fetchMakeModelCall, payload);
      yield put(fetchMakeModelSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}
//**Generator */
function* watchVeriftEmailRequest() {
  while (true) {
   const { email } = yield take(VERIFY_EMAIL_REQUEST);

    try {
      const payload = {
        email
      };
      const response = yield call(verifyEmailCall, payload);
      yield put(verifyEmailSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function verifyEmailCall({ email }) {
  return new Promise((resolve, reject) => {
      RegisterHelper.verifyEmail(email)
        .then(res => {
          resolve(res);
        })
        .catch(err => reject(err));
  });
}

function fetchMakeModelCall(year) {
  console.log(year);
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchMakeModel({ year })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
  });
}


export default function* root() {
  yield fork(fetchVehiclesRequest);
  yield fork(watchFetchVehiclesFromAsyncStorage);
  yield fork(watchVeriftEmailRequest);
  yield fork(watchFetchMakeModel);
}

