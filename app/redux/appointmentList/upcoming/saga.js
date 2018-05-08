import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { 
    fetchUpcomingAndPastAppointmentsSuccess, 
    fetchUpcomingAndPastAppointmentsFaliure 
} from './actions';
import { FETCH_UPCOMING_AND_PAST_APPOINTMENTS } from './constants';
import appointmentHelper from '../../../helpers/appointment/appointmentHelper';


function fetchUpcomingAndPastAppointmentsCall() {
    console.log('in call');
    return new Promise((resolve, reject) => {
        appointmentHelper.fetchUpcomingAndPastAppointments()
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchUpcomingAndPastAppointments() {
    while (true) {
      yield take(FETCH_UPCOMING_AND_PAST_APPOINTMENTS);
      try {
        const response = yield call(fetchUpcomingAndPastAppointmentsCall);
        yield put(fetchUpcomingAndPastAppointmentsSuccess(response.data[0]));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchUpcomingAndPastAppointmentsFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchFetchUpcomingAndPastAppointments);
}
