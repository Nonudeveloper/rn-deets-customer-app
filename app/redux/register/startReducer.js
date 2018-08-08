import { 
    FETCH_VEHICLES,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FALIURE,
    RECIEVE_VEHICLES_DATA,
    GET_BRAINTREE_CLIENT_TOKEN,
    GET_BRAINTREE_CLIENT_TOKEN_SUCCESS,
    GET_BRAINTREE_CLIENT_TOKEN_FALIURE
} from './constants';


const initialState = {
      isFetching: false,
      vehicles: [],
      DefaultAvailability: [],
      clientToken: ''
};

export default function startReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_VEHICLES:
        return Object.assign({}, state, {
          isFetching: true
        });
      case FETCH_VEHICLES_SUCCESS:
        return Object.assign({}, state, {
          vehicles: action.vehicles,
          isFetching: false
        });
      case FETCH_VEHICLES_FALIURE:
        return Object.assign({}, state, {
          isFetching: false,
        });
      case RECIEVE_VEHICLES_DATA:
        return Object.assign({}, state, {
          vehicles: JSON.parse(action.vehicles),
          isFetching: false
        });
      case GET_BRAINTREE_CLIENT_TOKEN:
        return Object.assign({}, state, {
        });
      case GET_BRAINTREE_CLIENT_TOKEN_SUCCESS:
        return Object.assign({}, state, {
          clientToken: action.clientToken.clientToken
        });
      case GET_BRAINTREE_CLIENT_TOKEN_FALIURE:
        return Object.assign({}, state, {
          // vehicles: JSON.parse(action.vehicles),
          // isFetching: false
        });
      default:
        return state;
    }
  }
