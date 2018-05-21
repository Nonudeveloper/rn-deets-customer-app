import { 
    FETCH_RECENT_LOCATIONS,
    FETCH_RECENT_LOCATIONS_SUCCESS,
    FETCH_RECENT_LOCATIONS_FAILURE,
    HIDE_ALERT,
    DELETE_RECENT_LOCATION,
    DELETE_RECENT_LOCATION_SUCCESS,
    DELETE_RECENT_LOCATION_FAILURE
} from './constants';
    
export function fetchRecentLocations() {
    return {
        type: FETCH_RECENT_LOCATIONS,
    };
}

export function fetchRecentLocationsSuccess(recentLocations) {
    return {
        type: FETCH_RECENT_LOCATIONS_SUCCESS,
        recentLocations
    };
}

export function fetchRecentLocationsFailure(err) {
    return {
        type: FETCH_RECENT_LOCATIONS_FAILURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function deleteRecentLocation(locationId) {
    return {
        type: DELETE_RECENT_LOCATION,
        locationId
    };
}

export function deleteRecentLocationSuccess(log) {
    return {
        type: DELETE_RECENT_LOCATION_SUCCESS,
        log
    };
}

export function deleteRecentLocationFailure(err) {
    return {
        type: DELETE_RECENT_LOCATION_FAILURE,
        err
    };
}
