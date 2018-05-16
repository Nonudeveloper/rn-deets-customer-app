import { 
    POST_NEW_APPOINTMENT,
    POST_NEW_APPOINTMENT_SUCCESS,
    POST_NEW_APPOINTMENT_FALIURE,
    SCHEDULE_NEW_APPOINTMENT,
    SCHEDULE_NEW_APPOINTMENT_SUCCESS,
    SCHEDULE_NEW_APPOINTMENT_FALIURE,
    STORE_APPOINTMENT_SCHEDULE,
    USER_CARD_DETAILS,
    USER_CARD_DETAILS_SUCCESS,
    ADD_NEW_CARD_DETAILS,
    ADD_NEW_CARD_DETAILS_SUCCESS,
    ADD_NEW_CARD_DETAILS_FALIURE,
    HIDE_ALERT,
    STORE_USER_SELECTED_CARD_DETAILS,
    HIDE_SCHEDULE_ALERT
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

export function fetchCardDetails() {
    return {
      type: USER_CARD_DETAILS
    };
}

export function fetchCardDetailsSuccess(cardDetails) {
    return {
      type: USER_CARD_DETAILS_SUCCESS,
      cardDetails
    };
}

export function addNewCardDetails(cardDetails) {
    return {
      type: ADD_NEW_CARD_DETAILS,
      cardDetails
    };
}

export function addNewCardDetailsSuccess() {
    return {
        type: ADD_NEW_CARD_DETAILS_SUCCESS,
    };
}

export function addNewCardDetailsFaliure(err) {
    return {
        type: ADD_NEW_CARD_DETAILS_FALIURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function storeSelectedCardDetails(selectedCard) {
    return {
      type: STORE_USER_SELECTED_CARD_DETAILS,
      selectedCard
    };
}

export function hideScheduleAlert() {
    return {
      type: HIDE_SCHEDULE_ALERT,
    };
}
