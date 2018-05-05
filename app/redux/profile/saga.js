import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchAuthUserDetailsSuccess, 
  fetchAuthUserDetailsFailure, 
  editUserProfileSuccess, 
  editUserProfileFailure, 
  changeUserPasswordSuccess, 
  changeUserPasswordFailure,
  getAuthUserVehicleDetailsSuccess,
  getAuthUserVehicleDetailsFailure } from './actions';
import { FETCH_AUTH_USER_DETAILS, EDIT_USER_PROFILE, CHANGE_USER_PASSWORD, GET_AUTH_USER_VEHICLE_DETAILS } from './constants';
import { getItem, setItem } from '../../helpers/asyncStorage';
import ProfileHelper from '../../helpers/profile/profileHelper';
import { NavigationActions } from 'react-navigation';



  //**Generator */
  function* watchAuthUserDetails() {
    while (true) {
      yield take(FETCH_AUTH_USER_DETAILS);
      console.log('dff')
      try {
        const response = yield getItem('user');
        yield put(fetchAuthUserDetailsSuccess(JSON.parse(response)));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchAuthUserDetailsFailure());
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

  function editUserProfilrCall(payload) {
    return new Promise((resolve, reject) => {
      ProfileHelper.editUserProfile(payload)
        .then(res => {
          console.log(res);
          if (res.data) {
            resolve(res.data);
          } else {
             const error = res.error;
             reject({ error });
          }
        })
        .catch(err => reject(err));
    });
  }
  //**Generator */
function* watchEditUserProfile() {
  while (true) {
    const { userProfileDetails, newImage } = yield take(EDIT_USER_PROFILE);
    const payload = { userProfileDetails, newImage };
    try {
      const userInfo = yield getItem('user');
      const userDetails = JSON.parse(userInfo);
      const response = yield call(editUserProfilrCall, payload);
      userDetails['first_name'] = response.first_name;
      userDetails['last_name'] = response.last_name;
      userDetails['mobile'] = response.mobile;
      userDetails['image'] = response.image;
      yield setItem('user', userDetails);
      yield put(NavigationActions.navigate({ routeName: 'detailsScreen' }));
      yield put(editUserProfileSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(editUserProfileFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function changePasswordCall(payload) {
  return new Promise((resolve, reject) => {
    ProfileHelper.changeUserPassword(payload)
      .then(res => {
        console.log(res);
        if (res.log) {
          resolve(res);
        } else {
           const log = res.error;
           reject({ log });
        }
      })
      .catch(err => reject(err));
  });
}
//**Generator */
function* watchChangeUserPassword() {
  while (true) {
    const { passwordData } = yield take(CHANGE_USER_PASSWORD);
    try {
      const response = yield call(changePasswordCall, passwordData);
      yield put(changeUserPasswordSuccess(response));
      yield put(NavigationActions.navigate({ routeName: 'detailsScreen' }));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(changeUserPasswordFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function* watchGetAuthUserVehiclesFromAsyncStorage() {
  while (true) {
    yield take(GET_AUTH_USER_VEHICLE_DETAILS);
    try {
      const response = yield getItem('authVehicles');
      const vehicleData = JSON.parse(response);
      const datavehicle = [];
      yield* vehicleData.map(function* (data) {
       const makeModel = yield call(vehiclesMakeModelCall, data.vehicle_year);
       datavehicle.push({ data, makeModel });
      });
      yield put(getAuthUserVehicleDetailsSuccess(datavehicle));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(getAuthUserVehicleDetailsFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}


function vehiclesMakeModelCall(payload) {
  return new Promise((resolve, reject) => {
    ProfileHelper.fetchVehiclesMakeModel(payload)
      .then(res => {
        console.log(res);
        if (res.data) {
          resolve(res);
        } else {
           const log = res.error;
           reject({ log });
        }
      })
      .catch(err => reject(err));
  });
}

export default function* root() {
  yield fork(watchAuthUserDetails);
  yield fork(watchEditUserProfile);
  yield fork(watchChangeUserPassword);
  yield fork(watchGetAuthUserVehiclesFromAsyncStorage);
}
