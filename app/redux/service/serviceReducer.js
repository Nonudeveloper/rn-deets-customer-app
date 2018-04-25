import { 
    FETCH_SERVICES, 
    FETCH_SERVICES_SUCCESS, 
    FETCH_SERVICES_FALIURE,
    CREATE_NEW_USER_SERVIVE_APPOINTMENT,
    SERVICES_APPOINTMENT_SUCCESS,
    SERVICES_APPOINTMENT_FALIURE,
    HIDE_ALERT,
    GET_SELECTED_SERVICES
} from './constants';

const initialState = {
      isFetching: false,
      services: [],
      technician: [],
      technicianFetching: false,
      errorMessage: '',
      selectedServices: []
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_SERVICES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                services: action.services
            });
        case FETCH_SERVICES_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        case CREATE_NEW_USER_SERVIVE_APPOINTMENT:
            return Object.assign({}, state, {
                technicianFetching: true
            });
        case SERVICES_APPOINTMENT_SUCCESS:
            return Object.assign({}, state, {
                technicianFetching: false,
                technician: action.payload
            });
        case SERVICES_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                technicianFetching: false,
                errorMessage: action.err
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                errorMessage: ''
            });
        case GET_SELECTED_SERVICES:
            return Object.assign({}, state, {
                selectedServices: action.selectedServices
            });
        default:
            return state;
    }
  }
