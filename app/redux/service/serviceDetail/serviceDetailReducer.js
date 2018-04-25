import { 
    TOGGLE_COLOR
} from './constants';

const initialState = {
      active: 0,
};

export default function serviceDetailReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_COLOR:
            return Object.assign({}, state, {
                active: action.index,
            });
        default:
            return state;
    }
  }
