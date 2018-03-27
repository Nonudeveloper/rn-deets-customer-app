import { AsyncStorage } from 'react-native';
import { 
    FETCH_VEHICLES,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FALIURE,
    RECIEVE_VEHICLES_DATA,
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

