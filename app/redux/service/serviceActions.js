import { 
    FETCH_SERVICES, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FALIURE
} from './constants';
    
export function fetchServices(payload) {
    return {
        type: FETCH_SERVICES,
        payload
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
