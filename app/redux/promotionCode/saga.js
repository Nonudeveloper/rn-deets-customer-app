import { take, put, call, fork } from 'redux-saga/effects';
import { fetchPromoCodeSuccess, fetchPromoCodeFailure, usePromoCodeByUserSuccess, usePromoCodeByUserFailure } from './actions';
import { FETCH_PROMO_CODE, USE_PROMO_CODE_BY_USER } from './constants';
import PromoCodeHelper from '../../helpers/promotionCode/promoCodeHelper';


function fetchPromoCodeCall() {
  return new Promise((resolve, reject) => {
    PromoCodeHelper.getPromoCode()
    .then((res) => {
      if (res.data) {
        resolve(res.data);
      } else {
         reject({ error: res.error });
      } 
    });
  });
}

function* watchFetchPromoCodeRequest() {
  while (true) {
    yield take(FETCH_PROMO_CODE);
    try {
      const response = yield call(fetchPromoCodeCall);
      yield put(fetchPromoCodeSuccess(response));
      console.log('Promo code SENT: ', response);
    } catch (err) {

      console.log('Promo code ERROR: ', err);
      yield put(fetchPromoCodeFailure(err));
    }
  }
}

function usePromoCodeCall(promotionCode) {
    return new Promise((resolve, reject) => {
      PromoCodeHelper.usePromoCode(promotionCode)
      .then((res) => {
          console.log(res);
        if (res.log) {
          resolve(res.log);
        } else {
            const error = JSON.parse(res._bodyText).error;
           reject({ error });
        } 
      });
    });
  }
  
  function* watchUsePromoCodeRequest() {
    while (true) {
      const { promotionCode } = yield take(USE_PROMO_CODE_BY_USER);
      try {
        const response = yield call(usePromoCodeCall, promotionCode);
        yield put(usePromoCodeByUserSuccess(response));
        console.log('Promo code SENT: ', response);
      } catch (err) {
        console.log('Promo code ERROR: ', err);
        yield put(usePromoCodeByUserFailure(err));
      }
    }
  }



export default function* root() {
  yield fork(watchFetchPromoCodeRequest);
  yield fork(watchUsePromoCodeRequest);
}
