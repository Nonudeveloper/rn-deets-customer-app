import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import registerSagas from './register/saga';
import homeSaga from './home/saga';
import geoSaga from './geoCoding/saga';

export default function* rootSaga() {
  yield all([
    authSagas(),
    registerSagas(),
    homeSaga(),
    geoSaga()
  ]);
}
