import { 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE, 
    DELETE_APPOINTMENT, DELETE_APPOINTMENT_SUCCESS, 
    DELETE_APPOINTMENT_FALIURE,
    MAKE_CALL_TO_TECHNICIAN,
    MAKE_CALL_TO_TECHNICIAN_SUCCESS,
    MAKE_CALL_TO_TECHNICIAN_FALIURE,
    MESSAGE_TO_TECHNICIAN,
    MESSAGE_TO_TECHNICIAN_SUCCESS,
    MESSAGE_TO_TECHNICIAN_FALIURE,
    TOGGLE_EDIT_MODE,
    SELECT_APPOINTMENT,
} from './constants';

const initialState = {
      isFetching: false,
      upcomingAppointments: [],
      pastAppointments: [],
      deleteSuccessfull: false,
      editMode: false,
      selectedAppointments: [],
};


const pushOrFilterID = (selectedAppointments, id) => {
    const forDeletion = [id];
    if (selectedAppointments.includes(id)) {
        return selectedAppointments.filter(item => !forDeletion.includes(item));
    } 
    selectedAppointments.push(id);
    return selectedAppointments;
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
        case MAKE_CALL_TO_TECHNICIAN:
            return Object.assign({}, state, {
                isFetching: true,
            });
        case MAKE_CALL_TO_TECHNICIAN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
            });
        case MAKE_CALL_TO_TECHNICIAN_FALIURE: 
            return Object.assign({}, state, {
                isFetching: false
            });
        case MESSAGE_TO_TECHNICIAN:
            return Object.assign({}, state, {
                isFetching: true
            });
        case MESSAGE_TO_TECHNICIAN_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false
            });
        case MESSAGE_TO_TECHNICIAN_FALIURE:
            return Object.assign({}, state, {
                isFetching: false
            });
        case TOGGLE_EDIT_MODE:
            return Object.assign({}, state, {
                editMode: !initialState.editMode
            });
        case SELECT_APPOINTMENT:
            return Object.assign({}, state, {
                selectedAppointments: pushOrFilterID(state.selectedAppointments, action.appointmentID)
            });
        default:
            return state;
    }
  }
