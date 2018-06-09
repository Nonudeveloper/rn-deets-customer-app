import { 
    POST_NEW_APPOINTMENT, 
    POST_NEW_APPOINTMENT_SUCCESS, 
    POST_NEW_APPOINTMENT_FALIURE, 
    SCHEDULE_NEW_APPOINTMENT, 
    SCHEDULE_NEW_APPOINTMENT_SUCCESS, 
    SCHEDULE_NEW_APPOINTMENT_FALIURE,
    STORE_APPOINTMENT_SCHEDULE,
    USER_CARD_DETAILS_SUCCESS,
    ADD_NEW_CARD_DETAILS,
    ADD_NEW_CARD_DETAILS_SUCCESS,
    ADD_NEW_CARD_DETAILS_FALIURE,
    HIDE_ALERT,
    STORE_USER_SELECTED_CARD_DETAILS,
    HIDE_SCHEDULE_ALERT
} from './constants';

const initialState = {
      isFetching: false,
      success: false,
      selectedSchedule: [],
      userCardDetails: [],
      fetchingCardData: false,
      errorMessage: '',
      selectedCardDetails: [],
      appointmentScheduleMsg: ''
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
                isFetching: false,
                appointmentScheduleMsg: action.response
            });
        case SCHEDULE_NEW_APPOINTMENT_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                appointmentScheduleMsg: action.err
            });
        case STORE_APPOINTMENT_SCHEDULE:
            return Object.assign({}, state, {
                selectedSchedule: action.selectedSchedule
            });
        case USER_CARD_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                userCardDetails: action.cardDetails
            });
        case ADD_NEW_CARD_DETAILS:
            return Object.assign({}, state, {
                fetchingCardData: true
            });
        case ADD_NEW_CARD_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                fetchingCardData: false,
            });
        case ADD_NEW_CARD_DETAILS_FALIURE:
            return Object.assign({}, state, {
                fetchingCardData: false,
                errorMessage: action.err
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                errorMessage: '',
                appointmentScheduleMsg: ''
            });
        case STORE_USER_SELECTED_CARD_DETAILS:
            return Object.assign({}, state, {
                selectedCardDetails: action.selectedCard
            });
        case HIDE_SCHEDULE_ALERT:
            return Object.assign({}, state, {
                appointmentScheduleMsg: ''
            });
        default:
            return state;
    }
  }
