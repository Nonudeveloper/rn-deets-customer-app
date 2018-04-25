import { 
    SEARCH_ADDRESS, SEARCH_ADDRESS_SUCCESS, SEARCH_ADDRESS_FALIURE, EMPTY_FEATURES
} from './constants';

const initialState = {
      isFetching: false,
      features: [],
};

export default function addressReducer(state = initialState, action) {
    switch (action.type) {
        case SEARCH_ADDRESS:
            return Object.assign({}, state, {
                isFetching: true
            });
        case SEARCH_ADDRESS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                features: action.features
            });
        case SEARCH_ADDRESS_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        case EMPTY_FEATURES:
            return Object.assign({}, state, {
                features: action.features
            });
        default:
            return state;
    }
  }
