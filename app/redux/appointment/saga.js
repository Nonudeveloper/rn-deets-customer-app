import { take, put, call, fork } from 'redux-saga/effects';
import { 
  postNewAppointmentSuccess, 
  postNewAppointmentFaliure, 
  scheduleNewAppointmentSuccess, 
  scheduleNewAppointmentFaliure,
  fetchCardDetailsSuccess,
  addNewCardDetailsSuccess,
  addNewCardDetailsFaliure 
} from './actions';
import { POST_NEW_APPOINTMENT, SCHEDULE_NEW_APPOINTMENT, USER_CARD_DETAILS, ADD_NEW_CARD_DETAILS } from './constants';
import AppointmentHelper from '../../helpers/appointment/appointmentHelper';
import { getCardDetails, setCardDetails } from '../../helpers/asyncStorage';
import { NavigationActions } from 'react-navigation';


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
          if (res.log) {
            resolve(res);
         } else {
           reject({ error: 'Unable to process' });
         }
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

  function addNewCardDetailsCall(payload) {
    return new Promise((resolve, reject) => {
        AppointmentHelper.addNewCardDetails(payload)
        .then(res => {
          if (res.status) {
             reject({ error: 'Unable to add Card' });
          } else {
            resolve(res);
          }
        })
        .catch(err => reject(err));
    });
}


//**Generator */
function* watchAddNewCardDetails() {
    while (true) {
      const payload = yield take(ADD_NEW_CARD_DETAILS);
      try {
        const existingCardsInfo = yield getCardDetails('authCardDetails');
        const existingCards = JSON.parse(existingCardsInfo);
        const response = yield call(addNewCardDetailsCall, payload);
        existingCards.push(response);
        yield setCardDetails(existingCards);
        yield put(NavigationActions.navigate({ routeName: payload.process === 'review' ? 'reviewScreen' : 'HomeComponent' }));
        yield put(addNewCardDetailsSuccess());
        console.log('SAGA FETCH SUCCESS: ', response);
      } catch (err) {
        yield put(addNewCardDetailsFaliure(err));
        console.log('SAGA FETCH ERR: ', err);
      }
    }
  }


export default function* root() {
  yield fork(watchPostNewAppointment);
  yield fork(watchScheduleNewAppointment);
  yield fork(watchCardDetailsFromAsyncStorage);
  yield fork(watchAddNewCardDetails);
}
