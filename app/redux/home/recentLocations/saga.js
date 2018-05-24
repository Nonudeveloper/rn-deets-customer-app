import { take, put, call, fork } from 'redux-saga/effects';
import { fetchRecentLocationsSuccess, fetchRecentLocationsFailure, deleteRecentLocationSuccess, deleteRecentLocationFailure, fetchRecentLocations } from './actions';
import { FETCH_RECENT_LOCATIONS, DELETE_RECENT_LOCATION } from './constants';
import HomeHelper from '../../../helpers/home/homeHelper';


function fetchRecentLocationsCall() {
  return new Promise((resolve, reject) => {
    HomeHelper.getRecentLocations()
    .then((res) => {
      if (res.data) {
        resolve(res.data);
      } else {
         reject({ error: res.error });
      } 
    });
  });
}

function* watchFetchRecentLocationsRequest() {
  while (true) {
    yield take(FETCH_RECENT_LOCATIONS);
    try {
      const response = yield call(fetchRecentLocationsCall);
      yield put(fetchRecentLocationsSuccess(response));
      console.log('Recent Location Success: ', response);
    } catch (err) {
      console.log('Recent Location ERROR: ', err);
      yield put(fetchRecentLocationsFailure(err));
    }
  }
}

function deleteRecentLocationCall(locationId) {
    return new Promise((resolve, reject) => {
        HomeHelper.deleteRecentLocation(locationId)
      .then((res) => {
          console.log(res);
        if (res.log) {
          resolve(res.log);
        } else if (res.message) {
            reject({ error: res.message });
        } else {
            const error = JSON.parse(res._bodyText).error;
           reject({ error });
        } 
      });
    });
  }
  
  function* watchDeleteRecentLocationRequest() {
    while (true) {
      const { locationId } = yield take(DELETE_RECENT_LOCATION);
      try {
        const response = yield call(deleteRecentLocationCall, locationId);
        yield put(fetchRecentLocations());
        yield put(deleteRecentLocationSuccess(response));
        console.log('Recent Location deleted: ', response);
      } catch (err) {
        console.log('Recent Location deletion ERROR: ', err);
        yield put(deleteRecentLocationFailure(err));
      }
    }
  }



export default function* root() {
  yield fork(watchFetchRecentLocationsRequest);
  yield fork(watchDeleteRecentLocationRequest);
}
