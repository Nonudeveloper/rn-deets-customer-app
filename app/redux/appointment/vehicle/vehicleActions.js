import { 
    FETCH_MY_VEHICLES, 
    FETCH_MY_VEHICLES_SUCCESS, 
    FETCH_MY_VEHICLE_FAILURE,
    STORE_VEHICLE_IMAGE,
    ADD_UPDATE_AUTH_VEHICLE,
    ADD_UPDATE_VEHICLE_SUCCESS,
    ADD_UPDATE_VEHICLE_FAILURE,
    HIDE_ALERT,
    SELECTED_VEHICLE
} from './constants';

    
export function fetchAuthVehicles() {
    return {
        type: FETCH_MY_VEHICLES,
    };
}

export function fetchAuthVehiclesSuccess(vehicles) {
    return {
        type: FETCH_MY_VEHICLES_SUCCESS,
        vehicles
    };
}

export function fetchServicesFailure(err) {
    return {
        type: FETCH_MY_VEHICLE_FAILURE,
        err
    };
}

export function storeVehicleImage(image) {
    return {
      type: STORE_VEHICLE_IMAGE,
      image,
    };
}

export function addUpdateVehicle(form, vehicleImage) {
    return {
      type: ADD_UPDATE_AUTH_VEHICLE,
      form,
      vehicleImage,
    };
}

export function addUpdateVehicleSuccess(vehicles) {
    return {
      type: ADD_UPDATE_VEHICLE_SUCCESS,
      vehicles,
    };
}

export function addUpdateVehicleFailure(err) {
    return {
      type: ADD_UPDATE_VEHICLE_FAILURE,
      err,
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function selectedVehicle(vehicle) {
    return {
      type: SELECTED_VEHICLE,
      vehicle
    };
}

