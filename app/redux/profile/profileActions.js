import { 
    FETCH_PROFILE_DATA, FETCH_PROFILE_DATA_SUCCESS, FETCH_PROFILE_DATA_FALIURE, 
} from './constants';
    
export function fetchProfileData(payload) {
    return {
        type: FETCH_PROFILE_DATA,
        payload
    };
}

export function fetchProfileDataSuccess(data) {
    return {
        type: FETCH_PROFILE_DATA_SUCCESS,
        data
    };
}

export function fetchProfileDataFaliure(err) {
    return {
        type: FETCH_PROFILE_DATA_FALIURE,
        err
    };
}
