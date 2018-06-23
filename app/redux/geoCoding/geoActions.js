import { 
    SEARCH_ADDRESS, 
    SEARCH_ADDRESS_SUCCESS, 
    SEARCH_ADDRESS_FALIURE, 
    EMPTY_FEATURES,
    GET_FULL_ADDRESS_REVERSE_GEO,
    GET_FULL_ADDRESS_REVERSE_GEO_FALIURE, 
    GET_FULL_ADDRESS_REVERSE_GEO_SUCCESS
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

export function getFullAddressReverseGeo(payload) {
    return {
        type: GET_FULL_ADDRESS_REVERSE_GEO,
        payload
    };
}

export function getFullAddressReverseGeoSuccess(res) {
    const geoLocationData = res ? getZipCodes(JSON.parse(res._bodyText).features) : {};
    return {
        type: GET_FULL_ADDRESS_REVERSE_GEO_SUCCESS,
        addressString: res ? JSON.parse(res._bodyText).features[0].place_name : '',
        geoLocationData
    };
}

export function getFullAddressReverseGeoFaliure(err) {
    return {
        type: GET_FULL_ADDRESS_REVERSE_GEO_FALIURE,
        err
    };
}

function getZipCodes(geoData) {
    const geoLocationData = [];
    geoData.map((geo) => {
        if (geo.place_type[0] === 'postcode') {
            geoLocationData.push({ zipcode: geo.text, coordinates: geo.geometry.coordinates });
        }
    });

    return geoLocationData;
}
