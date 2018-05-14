import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { 
    fetchUpcomingAndPastAppointmentsSuccess, 
    fetchUpcomingAndPastAppointmentsFaliure, 
    deleteAppointmentSuccess,
    deleteAppointmentFaliure,
    makeCallToTechnicianSuccess,
    makeCallToTechnicianFaliure,
    messageToTechnicianSuccess,
    messageToTechnicianFaliure
} from './actions';
import { 
  FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
  DELETE_APPOINTMENT, 
  MAKE_CALL_TO_TECHNICIAN, 
  MESSAGE_TO_TECHNICIAN
} from './constants';
import appointmentHelper from '../../../helpers/appointment/appointmentHelper';


function fetchUpcomingAndPastAppointmentsCall() {
    return new Promise((resolve, reject) => {
        appointmentHelper.fetchUpcomingAndPastAppointments()
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}

function deleteAppointmentCall(data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    appointmentHelper.deleteAppointment(data)
    .then(res => {
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

function makeCallToTechnicianCall(data) {
  return new Promise((resolve, reject) => {
    appointmentHelper.callToTechnician(data)
    .then(res => {
      resolve(res);
    })
    .catch(err => reject(err));
  });
}

function messageToTechnicianCall(data) {
  return new Promise((resolve, reject) => {
    appointmentHelper.textMessageToTechnician(data)
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

//**Generator */
function* watchDeleteAppointment() {
  while (true) {
    const payload = yield take(DELETE_APPOINTMENT);
    try {
      const response = yield call(deleteAppointmentCall, payload);
      yield put(deleteAppointmentSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(deleteAppointmentFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

//**Generator */
function* watchMakeCallToTechnician() {
  while (true) {
    const payload = yield take(MAKE_CALL_TO_TECHNICIAN);
    try {
      const response = yield call(makeCallToTechnicianCall, payload);
      yield put(makeCallToTechnicianSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(makeCallToTechnicianFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

//**Generator */
function* watchMessageToTechnician() {
  while (true) {
    const payload = yield take(MESSAGE_TO_TECHNICIAN);
    try {
      const response = yield call(messageToTechnicianCall, payload);
      yield put(messageToTechnicianSuccess(response));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(messageToTechnicianFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}


export default function* root() {
  yield fork(watchFetchUpcomingAndPastAppointments);
  yield fork(watchDeleteAppointment);
  yield fork(watchMakeCallToTechnician);
  yield fork(watchMessageToTechnician);
}
