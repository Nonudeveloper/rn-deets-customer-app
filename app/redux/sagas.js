import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import registerSagas from './register/saga';
import homeSaga from './home/saga';
import geoSaga from './geoCoding/saga';
import authVehicleSagas from './appointment/vehicle/saga';
import serviceSaga from './service/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    registerSagas(),
    homeSaga(),
    geoSaga(),
    authVehicleSagas(),
    serviceSaga()
  ]);
}
