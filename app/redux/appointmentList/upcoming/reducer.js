import { 
    SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE,
} from './constants';

const initialState = {
    selectedAppointment: '',
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE:
            return Object.assign({}, state, {
                selectedAppointment: ''
            });
        default:
            return state;
    }
  }
