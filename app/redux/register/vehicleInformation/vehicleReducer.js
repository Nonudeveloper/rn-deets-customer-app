import { 
    FETCH_MAKE_MODEL, 
    FETCH_MAKE_MODEL_SUCCESS, 
    FETCH_MAKE_MODEL_FALIURE, 
    UPDATE_MODELS,
    STORE_VEHICLE_IMAGE
} from '../constants';

const initialState = {
      isFetching: false,
      makeModelData: [],
      models: [],
      vehicleImage: {}
};

export default function vehicleReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_MAKE_MODEL:
            return Object.assign({}, state, {
                isFetching: true
            });
        case FETCH_MAKE_MODEL_SUCCESS:
            return Object.assign({}, state, {
                makeModelData: action.makeModelData,
                isFetching: false
            });
        case FETCH_MAKE_MODEL_FALIURE:
            return Object.assign({}, state, {
              isFetching: false,
              err: action.err
            });
        case UPDATE_MODELS:
            return Object.assign({}, state, {
                models: action.models
            });
        case STORE_VEHICLE_IMAGE:
            return Object.assign({}, state, {
              vehicleImage: action.image
            }); 
        default:
            return state;
    }
  }
