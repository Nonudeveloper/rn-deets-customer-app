import { 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_SUCCESS, 
    FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE,
    DELETE_APPOINTMENT,
    DELETE_APPOINTMENT_SUCCESS,
    DELETE_APPOINTMENT_FALIURE,
    SELECTED_APPOINTMENT_FOR_RESCHEDULE,
    SET_SELECTED_APPOINTMENT_TO_INITIAL_STATE,
    MAKE_CALL_TO_TECHNICIAN,
    MAKE_CALL_TO_TECHNICIAN_SUCCESS,
    MAKE_CALL_TO_TECHNICIAN_FALIURE,
    MESSAGE_TO_TECHNICIAN,
    MESSAGE_TO_TECHNICIAN_SUCCESS,
    MESSAGE_TO_TECHNICIAN_FALIURE,
    SELECT_APPOINTMENT,
    SELECT_APPOINTMENT_SUCCESS,
    SELECT_APPOINTMENT_FALIURE,
    TOGGLE_EDIT_MODE,
    SELECT_ALL_APPOINTMENTS,
    ACCEPT_OR_REJECT_REQUESTED_SERVICE,
    ACCEPT_OR_REJECT_REQUESTED_SERVICE_SUCCESS,
    ACCEPT_OR_REJECT_REQUESTED_SERVICE_FALIURE,
    HIDE_ALERT
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
        pastAppointments: appointments.past_appointments,
        currentRunningAppointments: appointments.current_running_appointments
    };
}

export function fetchUpcomingAndPastAppointmentsFaliure(err) {
    return {
        type: FETCH_UPCOMING_AND_PAST_APPOINTMENTS_FALIURE,
        err
    };
}

export function deleteAppointment(payload, deleteType) {
    return {
        type: DELETE_APPOINTMENT,
        payload,
        deleteType
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
export function makeCallToTechnician(payload) {
    return {
        type: MAKE_CALL_TO_TECHNICIAN,
        payload
    };
}

export function makeCallToTechnicianSuccess(res) {
    return {
        type: MAKE_CALL_TO_TECHNICIAN_SUCCESS,
        res
    };
}

export function makeCallToTechnicianFaliure(err) {
    return {
        type: MAKE_CALL_TO_TECHNICIAN_FALIURE,
        err
    };
}

export function messageToTechnician(payload) {
    return {
        type: MESSAGE_TO_TECHNICIAN,
        payload
    };
}

export function messageToTechnicianSuccess(res) {
    return {
        type: MESSAGE_TO_TECHNICIAN_SUCCESS,
        res
    };
}

export function messageToTechnicianFaliure() {
    return {
        type: MESSAGE_TO_TECHNICIAN_FALIURE
    };
}

export function selectAppointment(appointmentID) {
    return {
        type: SELECT_APPOINTMENT,
        appointmentID
    };
}

export function selectAppointmentSuccess(res = false) {
    return {
        type: SELECT_APPOINTMENT_SUCCESS,
        res
    };
}

export function selectAppointmentFaliure(err) {
    return {
        type: SELECT_APPOINTMENT_FALIURE,
        err
    };
}

export function selectAllAppointments(IDs) {
    return {
        type: SELECT_ALL_APPOINTMENTS,
        IDs
    };
}

export function toggleEditMode() {
    return {
        type: TOGGLE_EDIT_MODE,
    };
}

export function acceptOrRejectRequestedService(payload) {
    return {
        type: ACCEPT_OR_REJECT_REQUESTED_SERVICE,
        payload
    };
}

export function acceptOrRejectRequestedServiceSuccess(res) {
    return {
        type: ACCEPT_OR_REJECT_REQUESTED_SERVICE_SUCCESS,
        res
    };
}

export function acceptOrRejectRequestedServiceFaliure(err) {
    return {
        type: ACCEPT_OR_REJECT_REQUESTED_SERVICE_FALIURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}
