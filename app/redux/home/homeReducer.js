import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
    FETCH_POLYGON_DATA,
    FETCH_POLYGON_DATA_SUCCESS,
    FETCH_POLYGON_DATA_FALIURE,
    PAY_TIP_TO_TECHNICIAN,
    PAY_TIP_TO_TECHNICIAN_SUCCESS,
    PAY_TIP_TO_TECHNICIAN_FALIURE,
    HIDE_ALERT
} from './constants';

const initialState = {
      isFetching: false,
      serviceProviders: [],
      polygonData: [],
      pointFeatures: [],
      tipProcess: false,
      tipMessage: ''
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
        case PAY_TIP_TO_TECHNICIAN: 
            return Object.assign({}, state, {
                tipProcess: true,
            });
        case PAY_TIP_TO_TECHNICIAN_SUCCESS: 
            return Object.assign({}, state, {
                tipProcess: false,
                tipMessage: action.log
            });
        case PAY_TIP_TO_TECHNICIAN_FALIURE: 
            return Object.assign({}, state, {
                tipProcess: false,
                tipMessage: action.err
            });
        case HIDE_ALERT:
            return Object.assign({}, state, {
                tipMessage: ''
            });
        default:
            return state;
    }
  }
