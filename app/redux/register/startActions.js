import { AsyncStorage } from 'react-native';
import { 
    FETCH_VEHICLES,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FALIURE,
    RECIEVE_VEHICLES_DATA,
    FETCH_DEFAULT_AVAILABILITY,
    FETCH_DEFAULT_AVAILABILITY_SUCCESS,
    FETCH_DEFAULT_AVAILABILITY_FALIURE,
    FETCH_VEHICLES_FROM_ASYNC_STORAGE,
    FETCH_DEFAULT_AVAILABILITY_FROM_ASYNC_STORAGE,
    RECIEVE_DEFAULT_AVAILABILITY_DATA
} from './constants';
  
    const saveVehiclesData = async (vehicles) => {
        try {
            await AsyncStorage.setItem('vehicles', JSON.stringify(vehicles));
            console.log('data stored');
        } catch (error) {
            // Error saving data
            console.log('AsyncStorage save error: ' + error.message);
        }
    };

    const saveDefaultAvailabilityData = async (defaultAvailability) => {
        try {
            await AsyncStorage.setItem('defaultAvailability', JSON.stringify(defaultAvailability));
            console.log('data stored');
        } catch (error) {
            // Error saving data
            console.log('AsyncStorage save error: ' + error.message);
        }
    };

    export function fetchVehicles(state) {
        return {
            type: FETCH_VEHICLES,
            state,
        };
    }
  
    export function fetchVehiclesSuccess(vehicles) {
        saveVehiclesData(vehicles);
        return {
            type: FETCH_VEHICLES_SUCCESS,
            vehicles
        };
    }
  
    export function fetchVehiclesFailure(err) {
        return {
            type: FETCH_VEHICLES_FALIURE,
            err,
        };
    }

    export function fetchDefaultAvailability(state) {
        return {
            type: FETCH_DEFAULT_AVAILABILITY,
            state,
        };
    }
  
    export function fetchDefaultAvailabilitySuccess(defaultAvailability) {
        saveDefaultAvailabilityData(defaultAvailability);
        return {
            type: FETCH_DEFAULT_AVAILABILITY_SUCCESS,
            defaultAvailability
        };
    }
  
    export function fetchDefaultAvailabilityFaliure(err) {
        return {
            type: FETCH_DEFAULT_AVAILABILITY_FALIURE,
            err,
        };
    }

    export function recieveVehiclesData(vehicles) {
        return {
            type: RECIEVE_VEHICLES_DATA,
            vehicles
        };
    }

    export function fetchVehiclesFromAsyncStorage() {
        return {
            type: FETCH_VEHICLES_FROM_ASYNC_STORAGE,
        };
    }

    export function fetchDefaultAvailabilityFromAsyncStorage() {
        return {
            type: FETCH_DEFAULT_AVAILABILITY_FROM_ASYNC_STORAGE,
        };
    }

     export function recieveDefaultAvailabilitysData(payload) {
        return {
            type: RECIEVE_DEFAULT_AVAILABILITY_DATA,
            payload
        };
    }

    // return dispatch => {
    //     return AsyncStorage.getItem('vehicles')
    //       .then((vehicles) => {
    //         dispatch(recieveVehiclesData(JSON.parse(vehicles)));
    //       });
    // };