import { 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE, 
    DELETE_APPOINTMENT, DELETE_APPOINTMENT_SUCCESS, 
    DELETE_APPOINTMENT_FALIURE
} from './constants';

const initialState = {
      isFetching: false,
      upcomingAppointments: [],
      pastAppointments: [],
      deleteSuccessfull: false
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_UPCOMING_AND_PAST_APPOINTMENTS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                upcomingAppointments: action.upcomingAppointments,
                pastAppointments: action.pastAppointments
            });
        case FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case DELETE_APPOINTMENT:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case DELETE_APPOINTMENT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                deleteSuccessfull: true
            });
        case DELETE_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        default:
            return state;
    }
  }
