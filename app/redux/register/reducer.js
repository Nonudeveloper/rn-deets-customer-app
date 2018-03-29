import { 
    REGISTER_REQUEST, 
    REGISTER_SUCCESS, 
    REGISTER_FAILURE,
    VERIFY_EMAIL_REQUEST,
    VERIFY_EMAIL_SUCCESS
} from './constants';

const initialState = {
      isAuthenticated: false,
      isFetching: false,
      token: '',
      user: {},
      errorMessage: '',
      vehicles: {},
      emailAvailability: {}
};

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
      case REGISTER_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
        });
      case REGISTER_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          token: action.token,
          failure: false,
          user: action.user,
        });
      case REGISTER_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          failure: true,
          errorMessage: action.err,
        });
      case VERIFY_EMAIL_REQUEST:
         return Object.assign({}, state, {
            isFetching: true,
          });
      case VERIFY_EMAIL_SUCCESS:
         return Object.assign({}, state, {
            isFetching: false,
            emailAvailability: action.payload
          });
      default:
        return state;
    }
  }
