import React from 'react';
import { take, put, call, fork } from 'redux-saga/effects';
import { fetchServicesSuccess, fetchServicesFaliure, serviceAppointmentSuccess, serviceAppointmentFaliure, storeUserServiceAppointmentId } from './serviceActions';
import { FETCH_SERVICES, CREATE_NEW_USER_SERVICE_APPOINTMENT, RESCHEDULE_SERVICE_APPOINTMENT } from './constants';
import ServicesHelper from '../../helpers/services/servicesHelper';


function fetchServicesCall(accessToken) {
    return new Promise((resolve, reject) => {
        ServicesHelper.fetchAllServices(accessToken)
        .then(res => {
            resolve(res);
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchFetchServices() {
    while (true) {
      const { payload } = yield take(FETCH_SERVICES);
      try {
        const response = yield call(fetchServicesCall, payload);
        yield put(fetchServicesSuccess(response.data));
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(fetchServicesFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }

  function createAppointmentCall(payload) {
    return new Promise((resolve, reject) => {
        ServicesHelper.createNewAppointment(payload)
        .then(res => {
          console.log(res);
          if (res.technician) {
            resolve(res);
          } else {
             const error = res.error;
             reject({ error });
          }
        })
        .catch(err => reject(err));
    });
  }
  //**Generator */
function* watchcreateNewServiceAppointment() {
  while (true) {
    const payload = yield take(CREATE_NEW_USER_SERVICE_APPOINTMENT);
    try {
      const response = yield call(createAppointmentCall, payload);
      yield put(serviceAppointmentSuccess(response));
      yield put(storeUserServiceAppointmentId(response.user_service_appointment_id));
      console.log('SAGA FETCH SUCCESS: ', response);
    } catch (err) {
      yield put(serviceAppointmentFaliure(err));
      console.log('SAGA FETCH ERR: ', err);
    }
  }
}

function reschudleAppointmentCall(payload) {
  return new Promise((resolve, reject) => {
      ServicesHelper.reschudleAppointment(payload)
      .then(res => {
        console.log(res);
        if (res.technician) {
          resolve(res);
        } else {
           const error = res.error;
           reject({ error });
        }
      })
      .catch(err => reject(err));
  });
}
//**Generator */
function* watchReschudleServiceAppointment() {
while (true) {
  const payload = yield take(RESCHEDULE_SERVICE_APPOINTMENT);
  try {
    const response = yield call(reschudleAppointmentCall, payload);
    yield put(serviceAppointmentSuccess(response));
    yield put(storeUserServiceAppointmentId(response.user_service_appointment_id));
    console.log('SAGA FETCH SUCCESS: ', response);
  } catch (err) {
    yield put(serviceAppointmentFaliure(err));
    console.log('SAGA FETCH ERR: ', err);
  }
}
}


export default function* root() {
  yield fork(watchFetchServices);
  yield fork(watchcreateNewServiceAppointment);
  yield fork(watchReschudleServiceAppointment);
}
