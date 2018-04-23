import { 
    POST_NEW_APPOINTMENT, POST_NEW_APPOINTMENT_SUCCESS, POST_NEW_APPOINTMENT_FALIURE, SCHEDULE_NEW_APPOINTMENT, SCHEDULE_NEW_APPOINTMENT_SUCCESS, SCHEDULE_NEW_APPOINTMENT_FALIURE, 
} from './constants';

const initialState = {
      isFetching: false,
      success: false
};

export default function homeReducer(state = initialState, action) {
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
        default:
            return state;
    }
  }
