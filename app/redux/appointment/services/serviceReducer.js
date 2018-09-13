import { 
    FETCH_SERVICES, 
    FETCH_SERVICES_SUCCESS, 
    FETCH_SERVICES_FALIURE,
    CREATE_NEW_USER_SERVICE_APPOINTMENT,
    SERVICES_APPOINTMENT_SUCCESS,
    SERVICES_APPOINTMENT_FALIURE,
    HIDE_ALERT,
    GET_SELECTED_SERVICES,
    STORE_SERVICE_APPOINTMENT_ID,
    RESCHEDULE_SERVICE_APPOINTMENT
} from './constants';

const initialState = {
      isFetching: false,
      services: [],
      technician: [],
      technicianFetching: false,
      errorMessage: '',
      selectedServices: [],
      serviceAppointmentId: ''
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
        case CREATE_NEW_USER_SERVICE_APPOINTMENT:
            return Object.assign({}, state, {
                technicianFetching: true
            });
        case SERVICES_APPOINTMENT_SUCCESS:
            return Object.assign({}, state, {
                technicianFetching: false,
                technician: action.technicians
            });
        case SERVICES_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                technicianFetching: false,
                technician: [],
                // errorMessage: action.err
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                errorMessage: ''
            });
        case GET_SELECTED_SERVICES:
            return Object.assign({}, state, {
                selectedServices: action.selectedServices
            });
        case STORE_SERVICE_APPOINTMENT_ID:
            return Object.assign({}, state, {
                serviceAppointmentId: action.appoitmentId
            });
        case RESCHEDULE_SERVICE_APPOINTMENT:
            return Object.assign({}, state, {
                technicianFetching: true
            });
        default:
            return state;
    }
  }
