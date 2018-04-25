import { 
    FETCH_SERVICES, 
    FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FALIURE,
    CREATE_NEW_USER_SERVIVE_APPOINTMENT,
    SERVICES_APPOINTMENT_SUCCESS,
    SERVICES_APPOINTMENT_FALIURE,
    HIDE_ALERT,
    GET_SELECTED_SERVICES
} from './constants';
    
export function fetchServices() {
    return {
        type: FETCH_SERVICES,
    };
}

export function fetchServicesSuccess(services) {
    return {
        type: FETCH_SERVICES_SUCCESS,
        services
    };
}

export function fetchServicesFaliure(err) {
    return {
        type: FETCH_SERVICES_FALIURE,
        err
    };
}

export function createNewServiceAppointment(service, selectedVehicle, addons) {
    return {
        type: CREATE_NEW_USER_SERVIVE_APPOINTMENT,
        service,
        selectedVehicle,
        addons,
    };
}

export function serviceAppointmentSuccess(payload) {
    return {
        type: SERVICES_APPOINTMENT_SUCCESS,
        payload
    };
}

export function serviceAppointmentFaliure(err) {
    return {
        type: SERVICES_APPOINTMENT_FALIURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function storeSelectedServices(selectedServices) {
    return {
      type: GET_SELECTED_SERVICES,
      selectedServices
    };
}
