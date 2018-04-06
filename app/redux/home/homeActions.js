import { 
    FETCH_NEARBY_PLACES, FETCH_NEARBY_PLACES_SUCCESS, FETCH_NEARBY_PLACES_FALIURE, 
} from './constants';
    
export function fetchNearByPlaces(payload) {
    return {
        type: FETCH_NEARBY_PLACES,
        payload
    };
}

export function fetchNearByPlacesSuccess(nearByPlaces) {
    return {
        type: FETCH_NEARBY_PLACES_SUCCESS,
        nearByPlaces: nearByPlaces.data
    };
}

export function fetchNearByPlacesFaliure(err) {
    return {
        type: FETCH_NEARBY_PLACES_FALIURE,
        err
    };
}
