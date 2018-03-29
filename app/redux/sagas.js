import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import registerSagas from './register/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    registerSagas(),
  ]);
}
