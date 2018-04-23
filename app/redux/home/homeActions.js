import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE
} from './constants';
    
export function fetchNearByPlaces(payload) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS,
        payload
    };
}

export function fetchNearByPlacesSuccess(serviceProviders) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS,
        serviceProviders
    };
}

export function fetchNearByPlacesFaliure(err) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
        err
    };
}
