import { 
    SEARCH_ADDRESS, SEARCH_ADDRESS_SUCCESS, SEARCH_ADDRESS_FALIURE, EMPTY_FEATURES, GET_FULL_ADDRESS_REVERSE_GEO, GET_FULL_ADDRESS_REVERSE_GEO_SUCCESS
} from './constants';

const initialState = {
      isFetching: false,
      features: [],
      addressString: '',
      geoLocationData: []
};

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ADDRESS:
            return Object.assign({}, state, {
            });
        case SEARCH_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                features: action.features
            });
        case SEARCH_ADDRESS_FALIURE:
            return Object.assign({}, state, {
                err: action.err
            });
        case EMPTY_FEATURES:
            return Object.assign({}, state, {
                features: action.features
            });
        case GET_FULL_ADDRESS_REVERSE_GEO:
            return Object.assign({}, state, {
                isFetching: true
            });
        case GET_FULL_ADDRESS_REVERSE_GEO_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                addressString: action.addressString,
                geoLocationData: action.geoLocationData
            });
        default:
            return state;
    }
  }
