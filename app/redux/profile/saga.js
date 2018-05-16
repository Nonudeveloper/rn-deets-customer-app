import { take, put, call, fork, select } from 'redux-saga/effects';
import { NavigationActions } from 'react-navigation';
import ProfileHelper from '../../helpers/profile/profileHelper';
import { saveAuthVehiclesData } from '../../helpers/utility';
import { getItem, setItem } from '../../helpers/asyncStorage';
import { 
    fetchAuthUserDetailsSuccess, 
    fetchAuthUserDetailsFailure, 
    editUserProfileSuccess, 
    editUserProfileFailure, 
    changeUserPasswordSuccess, 
    changeUserPasswordFailure,
    getAuthUserVehicleDetailsSuccess, 
    getAuthUserVehicleDetailsFailure,
    fetchVehiclesMakeModelByYearSuccess, 
    fetchVehiclesMakeModelByYearFailure,
    fetchAddNewVehicleFailure, 
    deleteVehicleSuccess, 
    deleteVehicleFailure
} from './actions';
import { 
    FETCH_AUTH_USER_DETAILS,
    EDIT_USER_PROFILE, 
    CHANGE_USER_PASSWORD, 
    GET_AUTH_USER_VEHICLE_DETAILS, 
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR, 
    ADD_NEW_VEHICLE, 
    DELETE_VEHICLE
} from './constants';


//**Generator */
function* watchAuthUserDetails() {
  while (true) {
    yield take(FETCH_AUTH_USER_DETAILS);
    try {
      const response = yield getItem('user');
      yield put(fetchAuthUserDetailsSuccess(JSON.parse(response)));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(fetchAuthUserDetailsFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function editUserProfilrCall(payload) {
  return new Promise((resolve, reject) => {
    ProfileHelper.editUserProfile(payload)
      .then(res => {
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

export const authVehiclesData = (state) => state.Profile.authVehiclesData;

function* watchFetchVehicleMakeModelByYear() {
  while (true) {
   const { year, vehicle } = yield take(FETCH_VEHICLE_MAKE_MODEL_BY_YEAR);
    try {
      const changedVehicle = yield select(authVehiclesData);
      const response = yield call(vehiclesMakeModelByYearCall, year);
      changedVehicle.map((previousdata) => {
        if (previousdata.data.vehicle_id === vehicle.vehicle_id) {
            previousdata.makeModel = response;
        }
      });
      yield put(fetchVehiclesMakeModelByYearSuccess(changedVehicle));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(fetchVehiclesMakeModelByYearFailure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}


function vehiclesMakeModelByYearCall(payload) {
  return new Promise((resolve, reject) => {
    ProfileHelper.fetchVehiclesMakeModel(payload)
      .then(res => {
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

function* watchAddNewVehicleRequest() {
  while (true) {
      const payload = yield take(ADD_NEW_VEHICLE);
      try {
        const response = yield call(addNewVehicleCall, payload);
        yield saveAuthVehiclesData(response);
        yield put(NavigationActions.navigate({ routeName: 'detailsScreen' }));
        console.log('SAGA RESET PASSWORD Mail SENT: ', response);
      } catch (err) {
        console.log('SAGA RESET PASSWORD Mail ERROR: ', err);
        yield put(fetchAddNewVehicleFailure(err));
      }
    }
}

function addNewVehicleCall(payload) {
  return new Promise((resolve, reject) => {
    ProfileHelper.addNewVehicle(payload)
    .then((data) => {
      if (data.vehicle) {
        resolve(data.vehicle);
      } else {
         const error = data.error;
         reject({ error: error });
      } 
    });
  });
}

function deleteVehicleCall(vehicleId) {
  return new Promise((resolve, reject) => {
    ProfileHelper.deleteVehicle(vehicleId)
    .then((data) => {
      console.log(data);
      if (data.flag === 35) {
        resolve(data);
      } else {
         const log = data.error;
         reject({ error: log });
      } 
    });
  });
}

function* watchDeleteVehicleRequest() {
  while (true) {
    const { vehicleId } = yield take(DELETE_VEHICLE);
    try {
      const response = yield call(deleteVehicleCall, vehicleId);
      const allVehicles = yield getItem('authVehicles');
      const vehicleData = JSON.parse(allVehicles);
      vehicleData.map((data, i) => {
        if (data.vehicle_id === vehicleId) {
          vehicleData.splice(i, 1);
        }
      });
      yield setItem('authVehicles', vehicleData);
      yield put(deleteVehicleSuccess(response));
      // yield put(NavigationActions.navigate({ routeName: 'detailsScreen' }));
      console.log('SAGA RESET PASSWORD Mail SENT: ', response);
    } catch (err) {
      console.log('SAGA RESET PASSWORD Mail ERROR: ', err);
      yield put(deleteVehicleFailure(err));
    }
  }
}

export default function* root() {
  yield fork(watchAuthUserDetails);
  yield fork(watchEditUserProfile);
  yield fork(watchChangeUserPassword);
  yield fork(watchGetAuthUserVehiclesFromAsyncStorage);
  yield fork(watchFetchVehicleMakeModelByYear);
  yield fork(watchAddNewVehicleRequest);
  yield fork(watchDeleteVehicleRequest);
}
