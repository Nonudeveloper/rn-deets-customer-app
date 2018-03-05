import { 
    LOGIN_REQUEST, 
    LOGIN_SUCCESS, 
    LOGIN_FAILURE,
    LOGOUT
} from './constants';

const initialState = {
    isAuthenticated: false,
    isFetching: false,
    token: '',
    user: {},
    errorMessage: '',
};

export default function user(state = initialState, action) {
    switch (action.type) {
      case LOGIN_REQUEST:
        return Object.assign({}, state, {
          isFetching: true,
          isAuthenticated: false,
        });
      case LOGIN_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: true,
          token: action.token,
          failure: false,
          user: action.user,
        });
      case LOGIN_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          isAuthenticated: false,
          failure: true,
          errorMessage: action.err,
        });
      case LOGOUT:
        return initialState;
      default:
        return state;
    }
  }
