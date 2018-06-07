import { 
    SEARCH_ADDRESS, 
    SEARCH_ADDRESS_SUCCESS, 
    SEARCH_ADDRESS_FALIURE, 
    EMPTY_FEATURES,
    GET_FULL_ADDRESS_REVERSE_GEO,
    GET_FULL_ADDRESS_REVERSE_GEO_FALIURE, 
} from './constants';
import { GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS } from '../profile/constants';

export function searchAddress(payload) {
    return {
        type: SEARCH_ADDRESS,
        payload
    };
}

export function searchAddressSuccess(res) {
    return {
        type: SEARCH_ADDRESS_SUCCESS,
        features: JSON.parse(res._bodyText).features
    };
}

export function searchAddressFaliure(err) {
    return {
        type: SEARCH_ADDRESS_FALIURE,
        err
    };
}

export function emptyFeatures() {
    return {
        type: EMPTY_FEATURES,
        features: []
    };
}

export function getFullAddressReverseGeo(payload) {
    return {
        type: GET_FULL_ADDRESS_REVERSE_GEO,
        payload
    };
}

export function getFullAddressReverseGeoSuccess(res) {
    return {
        type: GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS,
        res
    };
}

export function getFullAddressReverseGeoFaliure(err) {
    return {
        type: GET_FULL_ADDRESS_REVERSE_GEO_FALIURE,
        err
    };
}
