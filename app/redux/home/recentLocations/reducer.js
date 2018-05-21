import { 
    FETCH_RECENT_LOCATIONS,
    FETCH_RECENT_LOCATIONS_SUCCESS,
    FETCH_RECENT_LOCATIONS_FAILURE,
    HIDE_ALERT,
    DELETE_RECENT_LOCATION,
    DELETE_RECENT_LOCATION_SUCCESS,
    DELETE_RECENT_LOCATION_FAILURE
} from './constants';


const initialState = {
    isFetching: false,
    errorMessage: '',
    recentLocations: ''
};

export default function recentLocationsReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_RECENT_LOCATIONS:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case FETCH_RECENT_LOCATIONS_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
        recentLocations: action.recentLocations,
        });
      case FETCH_RECENT_LOCATIONS_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.err,
        });
      case HIDE_ALERT:
        return Object.assign({}, state, {
          errorMessage: ''
        });
    case DELETE_RECENT_LOCATION:
        return Object.assign({}, state, {
          isFetching: true,
        });
      case DELETE_RECENT_LOCATION_SUCCESS:
        return Object.assign({}, state, {
          isFetching: false,
        recentLocations: action.log,
        });
      case DELETE_RECENT_LOCATION_FAILURE:
        return Object.assign({}, state, {
          isFetching: false,
          errorMessage: action.err,
        });
      default:
        return state;
    }
  }
