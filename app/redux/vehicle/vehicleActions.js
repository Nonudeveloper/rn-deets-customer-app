import { 
    FETCH_MY_VEHICLES, 
    FETCH_MY_VEHICLES_SUCCESS, 
    FETCH_MY_VEHICLE_FALIURE 
} from './constants';

    
export function fetchServices(payload) {
    return {
        type: FETCH_MY_VEHICLES,
        payload
    };
}

export function fetchServicesSuccess(vehicles) {
    return {
        type: FETCH_MY_VEHICLES_SUCCESS,
        vehicles
    };
}

export function fetchServicesFaliure(err) {
    return {
        type: FETCH_MY_VEHICLE_FALIURE,
        err
    };
}
