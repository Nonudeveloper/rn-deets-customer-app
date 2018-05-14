import { 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE,
    DELETE_APPOINTMENT,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FALIURE,
    SELECTED_APPOINTMENT_FOR_RESCHEDULE,
    SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE
} from './constants';
    
export function fetchUpcomingAndPastAppointments(payload) {
    return {
        type: FETCH_UPCOMING_AND_PAST_APPOINTMENTS,
        payload
    };
}

export function fetchUpcomingAndPastAppointmentsSuccess(appointments) {
    return {
        type: FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS,
        upcomingAppointments: appointments.upcoming_appointments,
        pastAppointments: appointments.past_appointments
    };
}

export function fetchUpcomingAndPastAppointmentsFaliure(err) {
    return {
        type: FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE,
        err
    };
}

export function deleteAppointment(payload) {
    return {
        type: DELETE_APPOINTMENT,
        payload
    };
}

export function deleteAppointmentSuccess(res) {
    return {
        type: DELETE_APPOINTMENT_SUCCESS,
        res
    };
}

export function deleteAppointmentFaliure(err) {
    return {
        type: DELETE_APPOINTMENT_FALIURE,
        err
    };
}

export function selectedAppointmentForReschedule(appointment) {
    return {
        type: SELECTED_APPOINTMENT_FOR_RESCHEDULE,
        appointment
    };
}

export function setSelectedAppointmentToInitialState() {
    return {
        type: SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE,
    };
}
