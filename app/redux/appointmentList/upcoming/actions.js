import { 
    SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE,
} from './constants';

export function setSelectedAppointmentToInitialState() {
    return {
        type: SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE,
    };
}
