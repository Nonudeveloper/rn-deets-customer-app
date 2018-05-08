import { 
    FETCH_AUTH_USER_DETAILS,
    FETCH_AUTH_USER_DETAILS_SUCCESS,
    FETCH_AUTH_USER_DETAILS_FAILURE,
    EDIT_USER_PROFILE,
    EDIT_USER_PROFILE_SUCCESS,
    EDIT_USER_PROFILE_FAILURE,
    HIDE_ALERT,
    CHANGE_USER_PASSWORD,
    CHANGE_USER_PASSWORD_SUCCESS,
    CHANGE_USER_PASSWORD_FAILURE
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

export function fetchAuthUserDetailsFailure() {
    return {
        type: FETCH_AUTH_USER_DETAILS_FAILURE
    };
}

export function editUserProfile(userProfileDetails, newImage) {
    return {
        type: EDIT_USER_PROFILE,
        userProfileDetails,
        newImage
    };
}

export function editUserProfileSuccess(user) {
    return {
        type: EDIT_USER_PROFILE_SUCCESS,
        user
    };
}

export function editUserProfileFailure(err) {
    return {
        type: EDIT_USER_PROFILE_FAILURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function changeUserPassword(passwordData) {
    return {
      type: CHANGE_USER_PASSWORD,
      passwordData
    };
}

export function changeUserPasswordSuccess(res) {
    return {
      type: CHANGE_USER_PASSWORD_SUCCESS,
      res
    };
}

export function changeUserPasswordFailure(err) {
    return {
      type: CHANGE_USER_PASSWORD_FAILURE,
      err
    };
}

