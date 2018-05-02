import { 
    FETCH_AUTH_USER_DETAILS,
    FETCH_AUTH_USER_DETAILS_SUCCESS,
    FETCH_AUTH_USER_DETAILS_FAILURE,
    EDIT_USER_PROFILE,
    EDIT_USER_PROFILE_SUCCESS,
    EDIT_USER_PROFILE_FAILURE,
    HIDE_ALERT,
    CHANGE_USER_PASSWORD,
    CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_PASSWORD_FAILURE
} from './constants';

const initialState = {
      isFetching: false,
      authUser: [],
      errorMessage: '',
      passwordConfirmation: ''
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AUTH_USER_DETAILS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case FETCH_AUTH_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authUser: action.user
            });
        case FETCH_AUTH_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case EDIT_USER_PROFILE:
            return Object.assign({}, state, {
                isFetching: true
            });
        case EDIT_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                // authUser: action.user
            });
        case EDIT_USER_PROFILE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                errorMessage: '',
                passwordConfirmation: ''
            });
        case CHANGE_USER_PASSWORD:
            return Object.assign({}, state, {
                isFetching: true
            });
        case CHANGE_USER_PASSWORD_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                passwordConfirmation: action.res
            });
        case CHANGE_USER_PASSWORD_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                passwordConfirmation: action.err
            });
        default:
            return state;
    }
  }
