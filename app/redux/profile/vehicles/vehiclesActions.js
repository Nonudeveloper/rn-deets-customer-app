import { 
    FETCH_ALL_USER_VEHICLES, FETCH_ALL_USER_VEHICLES_SUCCESS, FETCH_ALL_USER_VEHICLES_FALIURE, 
} from './constants';
    
export function fetchAllUserVehicles() {
    return {
        type: FETCH_ALL_USER_VEHICLES,
    };
}

export function fetchAllUserVehiclesSuccess(vehicles) {
    return {
        type: FETCH_ALL_USER_VEHICLES_SUCCESS,
        vehicles
    };
}

export function fetchAllUserVehiclesFaliure(err) {
    return {
        type: FETCH_ALL_USER_VEHICLES_FALIURE,
        err
    };
}
