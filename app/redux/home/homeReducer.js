import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
    FETCH_POLYGON_DATA,
    FETCH_POLYGON_DATA_SUCCESS,
    FETCH_POLYGON_DATA_FALIURE,
    EMPTY_POLYGON_DATA
} from './constants';

const initialState = {
      isFetching: false,
      serviceProviders: [],
      polygonData: [],
      pointFeatures: []
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NEARBY_SERVICE_PROVIDERS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                serviceProviders: action.serviceProviders
            });
        case FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        case FETCH_POLYGON_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_POLYGON_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                polygonData: action.data.polygonFeatures,
                pointFeatures: action.data.pointFeatures
            });
        case FETCH_POLYGON_DATA_FALIURE: 
            return Object.assign({}, state, {
                isFetching: false,
            });
        case EMPTY_POLYGON_DATA:
            return Object.assign({}, state, {
                polygonData: []
            });
        default:
            return state;
    }
  }
