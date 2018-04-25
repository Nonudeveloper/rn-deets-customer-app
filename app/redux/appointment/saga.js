import { take, put, call, fork } from 'redux-saga/effects';
import { 
  postNewAppointmentSuccess, 
  postNewAppointmentFaliure, 
  scheduleNewAppointmentSuccess, 
  scheduleNewAppointmentFaliure,
  fetchCardDetailsSuccess 
} from './actions';
import { POST_NEW_APPOINTMENT, SCHEDULE_NEW_APPOINTMENT, USER_CARD_DETAILS } from './constants';
import AppointmentHelper from '../../helpers/appointment/appointmentHelper';
import { getCardDetails } from '../../helpers/asyncStorage';


function postNewAppointmentCall(payload) {
    return new Promise((resolve, reject) => {
        AppointmentHelper.postNewAppointment(payload)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchPostNewAppointment() {
    while (true) {
      const { payload } = yield take(POST_NEW_APPOINTMENT);
      try {
        const response = yield call(postNewAppointmentCall, payload);
        yield put(postNewAppointmentSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(postNewAppointmentFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

function scheduleNewAppointmentCall(payload) {
    return new Promise((resolve, reject) => {
        AppointmentHelper.postNewAppointment(payload)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchScheduleNewAppointment() {
    while (true) {
      const { payload } = yield take(SCHEDULE_NEW_APPOINTMENT);
      try {
        const response = yield call(scheduleNewAppointmentCall, payload);
        yield put(scheduleNewAppointmentSuccess(response));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(scheduleNewAppointmentFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

  function* watchCardDetailsFromAsyncStorage() {
    while (true) {
      yield take(USER_CARD_DETAILS);
      try {
        const response = yield getCardDetails('authCardDetails');
        yield put(fetchCardDetailsSuccess(JSON.parse(response)));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchPostNewAppointment);
  yield fork(watchScheduleNewAppointment);
  yield fork(watchCardDetailsFromAsyncStorage);
}
