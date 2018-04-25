import { 
    POST_NEW_APPOINTMENT, 
    POST_NEW_APPOINTMENT_SUCCESS, 
    POST_NEW_APPOINTMENT_FALIURE, 
    SCHEDULE_NEW_APPOINTMENT, 
    SCHEDULE_NEW_APPOINTMENT_SUCCESS, 
    SCHEDULE_NEW_APPOINTMENT_FALIURE,
    STORE_APPOINTMENT_SCHEDULE 
} from './constants';

const initialState = {
      isFetching: false,
      success: false,
      selectedSchedule: []
};

export default function appointmentReducer(state = initialState, action) {
    switch (action.type) {
        case POST_NEW_APPOINTMENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case POST_NEW_APPOINTMENT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                success: true
            });
        case POST_NEW_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        case SCHEDULE_NEW_APPOINTMENT:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SCHEDULE_NEW_APPOINTMENT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case SCHEDULE_NEW_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case STORE_APPOINTMENT_SCHEDULE:
            return Object.assign({}, state, {
                selectedSchedule: action.selectedSchedule
            });
        default:
            return state;
    }
  }
