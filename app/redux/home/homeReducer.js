import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE
} from './constants';

const initialState = {
      isFetching: false,
      serviceProviders: [],
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
        default:
            return state;
    }
  }
