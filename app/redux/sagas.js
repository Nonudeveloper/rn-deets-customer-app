import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import registerSagas from './register/saga';
import homeSaga from './home/saga';
import geoSaga from './geoCoding/saga';
import authVehicleSagas from './appointment/vehicle/saga';
import serviceSaga from './service/saga';
import appointmentSaga from './appointment/saga';
import profileSaga from './profile/saga';
import upcomingAppointmentSaga from './appointmentList/upcoming/saga';
import promotionCodeSaga from './promotionCode/saga';
import recentLocationsSaga from './home/recentLocations/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    registerSagas(),
    homeSaga(),
    geoSaga(),
    authVehicleSagas(),
    serviceSaga(),
    appointmentSaga(),
    profileSaga(),
    upcomingAppointmentSaga(),
    promotionCodeSaga(),
    recentLocationsSaga()
  ]);
}
