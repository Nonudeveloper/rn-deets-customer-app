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
    CHANGE_USER_PASSWORD_FAILURE,
    GET_AUTH_USER_VEHICLE_DETAILS,
    GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS,
    GET_AUTH_USER_VEHICLE_DETAILS_FAILURE,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_SUCCESS,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_FAILURE,
    ADD_NEW_VEHICLE_FAILURE,
    DELETE_VEHICLE,
    DELETE_VEHICLE_SUCCESS,
    DELETE_VEHICLE_FAILURE
} from './constants';

const initialState = {
      isFetching: false,
      authUser: [],
      errorMessage: '',
      passwordConfirmation: '',
      authVehiclesData: [],
      fetchMakeModel: false,
      errorMessageForVehicle: '',
      vehicleDeleteMessage: ''
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AUTH_USER_DETAILS:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case FETCH_AUTH_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                authUser: action.user
            });
        case FETCH_AUTH_USER_DETAILS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err
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
                passwordConfirmation: '',
                errorMessageForVehicle: '',
                vehicleDeleteMessage: ''
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
        case GET_AUTH_USER_VEHICLE_DETAILS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                authVehiclesData: action.userVehiclesData
            });
        case GET_AUTH_USER_VEHICLE_DETAILS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err
            });
        case FETCH_VEHICLE_MAKE_MODEL_BY_YEAR:
            return Object.assign({}, state, {
                fetchMakeModel: true,
            });
        case FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_SUCCESS:
            return Object.assign({}, state, {
                fetchMakeModel: false,
                authVehiclesData: action.data,
            });
        case FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_FAILURE:
            return Object.assign({}, state, {
                fetchMakeModel: false,
                errorMessage: action.err
            });
        case ADD_NEW_VEHICLE_FAILURE:
            return Object.assign({}, state, {
                errorMessageForVehicle: action.err
            });
        case DELETE_VEHICLE:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case DELETE_VEHICLE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vehicleDeleteMessage: action.log
            });
        case DELETE_VEHICLE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                vehicleDeleteMessage: action.err
            });
        default:
            return state;
    }
  }
