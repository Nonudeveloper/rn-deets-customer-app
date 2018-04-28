import { 
    FETCH_ALL_USER_VEHICLES, FETCH_ALL_USER_VEHICLES_SUCCESS, FETCH_ALL_USER_VEHICLES_FALIURE 
} from './constants';

const initialState = {
      isFetching: false,
      vehicles: [],
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_USER_VEHICLES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_ALL_USER_VEHICLES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vehicles: action.vehicles
            });
        case FETCH_ALL_USER_VEHICLES_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        default:
            return state;
    }
  }
