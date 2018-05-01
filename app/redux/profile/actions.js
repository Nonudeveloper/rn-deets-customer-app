import { 
    FETCH_AUTH_USER_DETAILS,
    FETCH_AUTH_USER_DETAILS_SUCCESS
} from './constants';
    
export function fetchAuthUserDetails() {
    return {
        type: FETCH_AUTH_USER_DETAILS,
    };
}

export function fetchAuthUserDetailsSuccess(user) {
    return {
        type: FETCH_AUTH_USER_DETAILS_SUCCESS,
        user
    };
}
