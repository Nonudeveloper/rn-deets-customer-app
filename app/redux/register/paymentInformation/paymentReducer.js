import { 
    FETCH_MAKE_MODEL, 
} from '../constants';

const initialState = {
      isFetching: false,
      makeModelData: [],
      models: []
};

export default function vehicleReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MAKE_MODEL:
            return Object.assign({}, state, {
                isFetching: true
            });
        default:
            return state;
    }
  }
