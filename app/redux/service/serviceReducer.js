import { 
    FETCH_SERVICES, FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FALIURE
} from './constants';

const initialState = {
      isFetching: false,
      services: [],
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_SERVICES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_SERVICES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                services: action.services
            });
        case FETCH_SERVICES_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        default:
            return state;
    }
  }
