import React from 'react';
import { AsyncStorage } from 'react-native';
import { take, put, call, fork } from 'redux-saga/effects';
import { 
  fetchVehiclesSuccess, 
  fetchDefaultAvailabilitySuccess, 
  recieveVehiclesData,
  recieveDefaultAvailabilitysData
} from './startActions';
import { 
  FETCH_VEHICLES, 
  FETCH_DEFAULT_AVAILABILITY,
  VERIFY_EMAIL_REQUEST,
  FETCH_VEHICLES_FROM_ASYNC_STORAGE, 
  FETCH_MAKE_MODEL,
  FETCH_DEFAULT_AVAILABILITY_FROM_ASYNC_STORAGE,
  FETCH_NEARBY_PLACES
} from './constants';
import { verifyEmailSuccess } from './actions';
import RegisterHelper from '../../helpers/register/registerHelper';
import { fetchMakeModelSuccess } from './vehicleInformation/vehicleActions';
import { fetchNearByPlacesSuccess, fetchNearByPlacesFaliure } from './serviceAddress/serviceAddressActions';

function fetchVehiclesCall() {
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchAllVehicles()
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
  });
}

function fetchDefaultAvailabilityCall() {
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchDefaultAvailability()
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
function* fetchDefaultAvailability() {
  while (true) {
    yield take(FETCH_DEFAULT_AVAILABILITY);
    try {
      const response = yield call(fetchDefaultAvailabilityCall);
      yield put(fetchDefaultAvailabilitySuccess(response));
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
      console.log(email);
      const response = yield call(verifyEmailCall, payload);
      console.log(response);
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
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchMakeModel({ year })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
  });
}

//**Generator */
function* watchDefaultAvailabilityFromAsyncStorage() {
  while (true) {
    yield take(FETCH_DEFAULT_AVAILABILITY_FROM_ASYNC_STORAGE);
    try {
      const response = yield AsyncStorage.getItem('defaultAvailability');
      yield put(recieveDefaultAvailabilitysData(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

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
  yield fork(fetchVehiclesRequest);
  yield fork(fetchDefaultAvailability);
  yield fork(watchFetchVehiclesFromAsyncStorage);
  yield fork(watchVeriftEmailRequest);
  yield fork(watchFetchMakeModel);
  yield fork(watchDefaultAvailabilityFromAsyncStorage);
  yield fork(watchFetchNearByPlaces);
}

