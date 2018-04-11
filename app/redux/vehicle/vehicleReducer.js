import { 
    FETCH_MY_VEHICLES,
    FETCH_MY_VEHICLES_SUCCESS,
    FETCH_MY_VEHICLES_FALIURE
} from './constants';

const initialState = {
      isFetching: false,
      vehicles: [],
};

export default function servicesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MY_VEHICLES:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_MY_VEHICLES_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                vehicles: action.vehicles
            });
        case FETCH_MY_VEHICLES_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        default:
            return state;
    }
  }
