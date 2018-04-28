import { 
    FETCH_PROFILE_DATA, FETCH_PROFILE_DATA_SUCCESS, FETCH_PROFILE_DATA_FALIURE, 
} from './constants';

const initialState = {
      isFetching: false,
      data: [],
};

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PROFILE_DATA:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_PROFILE_DATA_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            });
        case FETCH_PROFILE_DATA_FALIURE:
            return Object.assign({}, state, {
                isFetching: false,
                err: action.err
            });
        default:
            return state;
    }
  }
