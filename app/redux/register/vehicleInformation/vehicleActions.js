import { 
  FETCH_MAKE_MODEL, 
  FETCH_MAKE_MODEL_SUCCESS, 
  FETCH_MAKE_MODEL_FALIURE,
  UPDATE_MODELS,
  STORE_VEHICLE_IMAGE,
  SET_BACK_TO_INITIAL_STATE
} from '../constants';
  
  export function fetchMakeModel(year) {
    return {
      type: FETCH_MAKE_MODEL,
      year
    };
  }
  
  export function fetchMakeModelSuccess(makeModelData) {
    return {
      type: FETCH_MAKE_MODEL_SUCCESS,
      makeModelData
    };
  }
  
  export function fetchMakeModelFaliure() {
    return {
      type: FETCH_MAKE_MODEL_FALIURE,
    };
  }

  export function updateModels(models) {
    return {
      type: UPDATE_MODELS,
      models
    };
  }

  export function storeVehicleImage(image) {
    return {
      type: STORE_VEHICLE_IMAGE,
      image,
    };
  }

  export function setBackToInitialState() {
    return {
      type: SET_BACK_TO_INITIAL_STATE,
    };
  }

