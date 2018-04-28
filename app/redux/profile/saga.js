import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchProfileDataSuccess, fetchProfileDataFaliure } from './profileActions';
import { FETCH_PROFILE_DATA } from './constants';
import ProfileHelper from '../../helpers/profile/profileHelper';


function fetchProfileDataCall(payload) {
    return new Promise((resolve, reject) => {
        ProfileHelper.fetchNearByPlaces({ payload })
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchProfileData() {
    while (true) {
      const { payload } = yield take(FETCH_PROFILE_DATA);
      try {
        const response = yield call(fetchProfileDataCall, payload);
        yield put(fetchProfileDataSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchProfileDataFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchFetchProfileData);
}
