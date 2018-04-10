import { 
    FETCH_NEARBY_PLACES, FETCH_NEARBY_PLACES_SUCCESS, FETCH_NEARBY_PLACES_FALIURE
} from './constants';

const initialState = {
      isFetching: false,
      nearByPlaces: [],
};

export default function serviceAddressReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_NEARBY_PLACES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_NEARBY_PLACES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                nearByPlaces: action.nearByPlaces
            });
        case FETCH_NEARBY_PLACES_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        default:
            return state;
    }
  }
