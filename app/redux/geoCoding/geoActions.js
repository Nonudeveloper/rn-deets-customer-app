import { SEARCH_ADDRESS, SEARCH_ADDRESS_SUCCESS, SEARCH_ADDRESS_FALIURE } from './constants';

export function searchAddress(payload) {
    console.log(payload);
    return {
        type: SEARCH_ADDRESS,
        payload
    };
}

export function searchAddressSuccess(features) {
    return {
        type: SEARCH_ADDRESS_SUCCESS,
        features
    };
}

export function searchAddressFaliure(err) {
    return {
        type: SEARCH_ADDRESS_FALIURE,
        err
    };
}
