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
    CHANGE_USER_PASSWORD_FAILURE,
    GET_AUTH_USER_VEHICLE_DETAILS,
    GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS,
    GET_AUTH_USER_VEHICLE_DETAILS_FAILURE,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_SUCCESS,
    FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_FAILURE,
    ADD_NEW_VEHICLE,
    ADD_NEW_VEHICLE_SUCCESS,
    ADD_NEW_VEHICLE_FAILURE,
    DELETE_VEHICLE,
    DELETE_VEHICLE_SUCCESS,
    DELETE_VEHICLE_FAILURE,
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

export function fetchAuthUserDetailsFailure(err) {
    return {
        type: FETCH_AUTH_USER_DETAILS_FAILURE,
        err
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

export function getAuthUserVehicleDetails() {
    return {
      type: GET_AUTH_USER_VEHICLE_DETAILS,
    };
}

export function getAuthUserVehicleDetailsSuccess(userVehiclesData) {
    return {
      type: GET_AUTH_USER_VEHICLE_DETAILS_SUCCESS,
      userVehiclesData
    };
}

export function getAuthUserVehicleDetailsFailure(err) {
    return {
      type: GET_AUTH_USER_VEHICLE_DETAILS_FAILURE,
      err
    };
}

export function fetchVehiclesMakeModelByYear(year) {
    return {
      type: FETCH_VEHICLE_MAKE_MODEL_BY_YEAR,
      year
    };
}

export function fetchVehiclesMakeModelByYearSuccess(data, year) {
    return {
      type: FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_SUCCESS,
      data,
      year
    };
}

export function fetchVehiclesMakeModelByYearFailure(err) {
    return {
      type: FETCH_VEHICLE_MAKE_MODEL_BY_YEAR_FAILURE,
      err
    };
}

export function fetchAddNewVehicle(form, vehicleImage, formType) {
    return {
      type: ADD_NEW_VEHICLE,
      form,
      vehicleImage,
      formType
    };
}

export function fetchAddNewSuccess(vehicles) {
    return {
      type: ADD_NEW_VEHICLE_SUCCESS,
      vehicles
    };
}

export function fetchAddNewVehicleFailure(err) {
    return {
      type: ADD_NEW_VEHICLE_FAILURE,
      err
    };
}

export function deleteVehicle(vehicleId) {
    return {
      type: DELETE_VEHICLE,
      vehicleId
    };
}

export function deleteVehicleSuccess(log) {
    return {
      type: DELETE_VEHICLE_SUCCESS,
      log
    };
}

export function deleteVehicleFailure(err) {
    return {
      type: DELETE_VEHICLE_FAILURE,
      err
    };
}

