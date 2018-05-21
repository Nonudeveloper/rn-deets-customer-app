import { 
    FETCH_PROMO_CODE,
    FETCH_PROMO_CODE_SUCCESS,
    FETCH_PROMO_CODE_FAILURE,
    HIDE_ALERT,
    USE_PROMO_CODE_BY_USER,
    USE_PROMO_CODE_BY_USER_SUCCESS,
    USE_PROMO_CODE_BY_USER_FAILURE
} from './constants';
    
export function fetchPromoCode() {
    return {
        type: FETCH_PROMO_CODE,
    };
}

export function fetchPromoCodeSuccess(promoCode) {
    return {
        type: FETCH_PROMO_CODE_SUCCESS,
        promoCode
    };
}

export function fetchPromoCodeFailure(err) {
    return {
        type: FETCH_PROMO_CODE_FAILURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function usePromoCodeByUser(promotionCode) {
    return {
        type: USE_PROMO_CODE_BY_USER,
        promotionCode
    };
}

export function usePromoCodeByUserSuccess(log) {
    return {
        type: USE_PROMO_CODE_BY_USER_SUCCESS,
        log
    };
}

export function usePromoCodeByUserFailure(err) {
    return {
        type: USE_PROMO_CODE_BY_USER_FAILURE,
        err
    };
}
