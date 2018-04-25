import { 
    SEARCH_ADDRESS, 
    SEARCH_ADDRESS_SUCCESS, 
    SEARCH_ADDRESS_FALIURE, 
    EMPTY_FEATURES 
} from './constants';

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
