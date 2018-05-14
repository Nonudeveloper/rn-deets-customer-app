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
      selectedAppointments: []
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
                selectedAppointments: state.selectedAppointments.map(id => {
                    if (id === action.appointmentID) {
                        //slice from here selectedAppointments oldschool version
                        const index = state.selectedAppointments.indexOf(action.appointmentID);
                        if (index > -1) {
                            state.selectedAppointments.splice(index, 1);
                        }
                        console.log(state.selectedAppointments);
                        return state.selectedAppointments;
                        //es6 VERSION
                        // let forDeletion = [2, 3, 5]

                        // let arr = [1, 2, 3, 4, 5, 3]

                        // arr = arr.filter(item => !forDeletion.includes(item))
                        // // !!! Read below about array.includes(...) support !!!

                        // console.log(arr)
                        // // [ 1, 4 ]
                    } 
                    console.log([...state.selectedAppointments, action.appointmentID]);
                    return [...state.selectedAppointments, action.appointmentID];
                })
            });
        default:
            return state;
    }
  }
