import { 
    POST_NEW_APPOINTMENT,
    POST_NEW_APPOINTMENT_SUCCESS,
    POST_NEW_APPOINTMENT_FALIURE,
    SCHEDULE_NEW_APPOINTMENT,
    SCHEDULE_NEW_APPOINTMENT_SUCCESS,
    SCHEDULE_NEW_APPOINTMENT_FALIURE,
    STORE_APPOINTMENT_SCHEDULE
} from './constants';
    
export function postNewAppointment(payload) {
    return {
        type: POST_NEW_APPOINTMENT,
        payload
    };
}

export function postNewAppointmentSuccess(appointments) {
    return {
        type: POST_NEW_APPOINTMENT_SUCCESS,
        appointments
    };
}

export function postNewAppointmentFaliure(err) {
    return {
        type: POST_NEW_APPOINTMENT_FALIURE,
        err
    };
}

export function scheduleNewAppointment(payload) {
    return {
        type: SCHEDULE_NEW_APPOINTMENT,
        payload
    };
}

export function scheduleNewAppointmentSuccess(response) {
    return {
        type: SCHEDULE_NEW_APPOINTMENT_SUCCESS,
        response
    };
}

export function scheduleNewAppointmentFaliure(err) {
    return {
        type: SCHEDULE_NEW_APPOINTMENT_FALIURE,
        err
    };
}

export function storeAppointmentschedule(selectedSchedule) {
    return {
        type: STORE_APPOINTMENT_SCHEDULE,
        selectedSchedule
    };
}
