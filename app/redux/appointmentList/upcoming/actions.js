import { 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE
} from './constants';
    
export function fetchUpcomingAndPastAppointments(payload) {
    return {
        type: FETCH_UPCOMING_AND_PAST_APPOINTMENTS,
        payload
    };
}

export function fetchUpcomingAndPastAppointmentsSuccess(appointments) {
    console.log(appointments);
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
