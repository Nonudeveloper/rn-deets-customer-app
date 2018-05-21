import { 
    FETCH_PROMO_CODE, 
    FETCH_PROMO_CODE_SUCCESS, 
    FETCH_PROMO_CODE_FAILURE,
    HIDE_ALERT,
    USE_PROMO_CODE_BY_USER,
    USE_PROMO_CODE_BY_USER_SUCCESS,
    USE_PROMO_CODE_BY_USER_FAILURE
} from './constants';


const initialState = {
    isFetching: false,
    errorMessage: '',
    successMessage: '',
    promotionCode: ''
};

export default function promoCodeReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_PROMO_CODE:
        return Object.assign({}, state, {
        //   isFetching: true,
        });
      case FETCH_PROMO_CODE_SUCCESS:
        return Object.assign({}, state, {
        //   isFetching: false,
          promotionCode: action.promoCode,
        });
      case FETCH_PROMO_CODE_FAILURE:
        return Object.assign({}, state, {
        //   isFetching: false,
          errorMessage: action.err,
        });
      case HIDE_ALERT:
        return Object.assign({}, state, {
          errorMessage: '',
          successMessage: ''
        });
    case USE_PROMO_CODE_BY_USER:
        return Object.assign({}, state, {
          isFetching: true,
        });
    case USE_PROMO_CODE_BY_USER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          successMessage: action.log,
        });
    case USE_PROMO_CODE_BY_USER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.err,
        });
      default:
        return state;
    }
  }
