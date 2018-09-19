import { AsyncStorage } from 'react-native';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchAuthVehiclesSuccess, addUpdateVehicleFailure, addUpdateVehicleSuccess } from './vehicleActions';
import { FETCH_MY_VEHICLES, ADD_UPDATE_AUTH_VEHICLE } from './constants';
import AppointmetHelper from '../../../helpers/appointment/appointmentHelper';
import { saveAuthVehiclesData } from '../../../helpers/utility';
import { NavigationActions } from 'react-navigation';
import { getAuthUserVehicleDetailsSuccess } from '../../profile/actions';
import withToast from '../../../hoc/withToast';

function* watchAuthVehicleFromAsyncStorage() {
    while (true) {
      yield take(FETCH_MY_VEHICLES);
      try {
        const response = yield AsyncStorage.getItem('authVehicles');
        console.log(response);
        yield put(fetchAuthVehiclesSuccess(JSON.parse(response)));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

  function* watchAddUpdateVehicleRequest() {
    while (true) {
        const payload = yield take(ADD_UPDATE_AUTH_VEHICLE);
        try {
          const response = yield call(addUpdateVehicleCall, payload);
          console.log('Vehicle addupdate response:', response);
          yield saveAuthVehiclesData(response);
          yield put(addUpdateVehicleSuccess(response));
          yield put(getAuthUserVehicleDetailsSuccess(response));
          yield put(NavigationActions.back());
          withToast('Vehicle Added successfully!');
          console.log('SAGA ADD EDIT VEHICLE SENT: ', response);
        } catch (err) {
          console.log('SAGA ADD EDIT VEHICLE ERROR: ', err);
          yield put(addUpdateVehicleFailure(err));
        }
      }
  }

  function addUpdateVehicleCall(payload) {
    return new Promise((resolve, reject) => {
        AppointmetHelper.addUpdateVehicle(payload)
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
  
 
  

export default function* root() {
  yield fork(watchAuthVehicleFromAsyncStorage);
  yield fork(watchAddUpdateVehicleRequest);
}

