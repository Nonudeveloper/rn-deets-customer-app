import { 
    FETCH_MY_VEHICLES,
    FETCH_MY_VEHICLES_SUCCESS,
    FETCH_MY_VEHICLE_FAILURE,
    STORE_VEHICLE_IMAGE,
    ADD_UPDATE_AUTH_VEHICLE,
    ADD_UPDATE_VEHICLE_SUCCESS,
    ADD_UPDATE_VEHICLE_FAILURE,
    HIDE_ALERT,
    SELECTED_VEHICLE,
} from './constants';

const initialState = {
      isFetching: false,
      vehicles: [],
      vehicleImage: {},
      errorMessage: '',
      selectedVehicle: {}
};

export default function authReducer(state = initialState, action) {
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
        case FETCH_MY_VEHICLE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                errorMessage: action.err
            });
        case STORE_VEHICLE_IMAGE:
            return Object.assign({}, state, {
              vehicleImage: action.image
            });
        case ADD_UPDATE_AUTH_VEHICLE:
            return Object.assign({}, state, {
            //   vehicleImage: action.image
            });
        case ADD_UPDATE_VEHICLE_SUCCESS:
            return Object.assign({}, state, {
            //   vehicleImage: action.image
            });
        case ADD_UPDATE_VEHICLE_FAILURE:
            return Object.assign({}, state, {
                errorMessage: action.err
            }); 
        case HIDE_ALERT:
            return Object.assign({}, state, {
                errorMessage: ''
            }); 
        case SELECTED_VEHICLE:
            return Object.assign({}, state, {
                selectedVehicle: action.vehicle
            }); 
        default:
            return state;
    }
  }
