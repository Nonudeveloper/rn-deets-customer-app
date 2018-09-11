import React from 'react';
import { AsyncStorage } from 'react-native';
import { take, put, call, fork, select } from 'redux-saga/effects';
import { 
  fetchVehiclesSuccess, 
  recieveVehiclesData,
  getBrainTreeClientTokenSuccess,
  getBrainTreeClientTokenFailure,
  createBrainTreeClientTokenSuccess,
  createBrainTreeClientTokenFailure
} from './startActions';
import { 
  FETCH_VEHICLES, 
  VERIFY_EMAIL_REQUEST,
  FETCH_VEHICLES_FROM_ASYNC_STORAGE, 
  FETCH_MAKE_MODEL,
  REGISTER_REQUEST,
  GET_BRAINTREE_CLIENT_TOKEN,
  CREATE_BRAINTREE_CLIENT_TOKEN
} from './constants';
import { verifyEmailSuccess, registerSuccess, registerFailure } from './actions';
import RegisterHelper from '../../helpers/register/registerHelper';
import { fetchMakeModelSuccess } from './vehicleInformation/vehicleActions';
import { setUser } from '../../helpers/utility';
import { setItem } from '../../helpers/asyncStorage';
import { NavigationActions } from 'react-navigation';
import { loginThroughAccessToken } from '../auth/actions';
import withToast from '../../hoc/withToast';

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
  return new Promise((resolve, reject) => {
      RegisterHelper.fetchMakeModel({ year })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
  });
}

function registerCall(payload) {
  return new Promise((resolve, reject) => {
    RegisterHelper.register(payload)
      .then(response => {
          if (response.flag && response.flag === 5) {
            reject(response.error);
          } else {
            resolve(response);
          }
      })
      .catch(err => reject(err));
  });
}

export const getDeviceToken = (state) => state.Auth.deviceToken;

function* watchRegisterRequest() {
  while (true) {
    const payload = yield take(REGISTER_REQUEST);
    try {
      const response = yield call(registerCall, payload);
        yield put(registerSuccess(response.user.access_token, response));
        yield setUser(response.user);
        const deviceToken = yield select(getDeviceToken);
        yield put(loginThroughAccessToken(deviceToken));
        // yield setItem('authVehicles', response.vehicle);
        // yield setItem('authCardDetails', response.card ? response.card : []);
        yield put(NavigationActions.navigate({ routeName: 'drawerStack' }));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      withToast(err);
      yield put(registerFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}


function getBrainTreeClientToken() {
  return new Promise((resolve, reject) => {
    RegisterHelper.getBrainTreeClientToken()
      .then(response => {
        console.log(response);
          resolve(response);
      })
      .catch(err => reject(err));
  });
}


function* watchGetBrainTreeClientTokenRequest() {
  while (true) {
    yield take(GET_BRAINTREE_CLIENT_TOKEN);
    try {
      const response = yield call(getBrainTreeClientToken);
        yield put(getBrainTreeClientTokenSuccess(response.data));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(getBrainTreeClientTokenFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function createBrainTreeClientToken(customerId) {
  return new Promise((resolve, reject) => {
    RegisterHelper.createBrainTreeClientToken(customerId)
      .then(response => {
        console.log(response);
          resolve(response);
      })
      .catch(err => reject(err));
  });
}


function* watchCreateBrainTreeClientTokenRequest() {
  while (true) {
    const { customerId } = yield take(CREATE_BRAINTREE_CLIENT_TOKEN);
    try {
      const response = yield call(createBrainTreeClientToken, customerId);
        yield put(createBrainTreeClientTokenSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(createBrainTreeClientTokenFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}


export default function* root() {
  yield fork(fetchVehiclesRequest);
  yield fork(watchFetchVehiclesFromAsyncStorage);
  yield fork(watchVeriftEmailRequest);
  yield fork(watchFetchMakeModel);
  yield fork(watchRegisterRequest);
  yield fork(watchGetBrainTreeClientTokenRequest);
  yield fork(watchCreateBrainTreeClientTokenRequest);
}

