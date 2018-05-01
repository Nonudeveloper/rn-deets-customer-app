import { 
    FETCH_AUTH_USER_DETAILS_SUCCESS
} from './constants';

const initialState = {
      isFetching: false,
      authUser: []
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_AUTH_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                authUser: action.user
            });
        
        default:
            return state;
    }
  }
