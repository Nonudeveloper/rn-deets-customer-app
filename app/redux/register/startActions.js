import { AsyncStorage } from 'react-native';
import { 
    FETCH_VEHICLES,
    FETCH_VEHICLES_SUCCESS,
    FETCH_VEHICLES_FALIURE,
    RECIEVE_VEHICLES_DATA,
    GET_BRAINTREE_CLIENT_TOKEN,
    GET_BRAINTREE_CLIENT_TOKEN_SUCCESS,
    GET_BRAINTREE_CLIENT_TOKEN_FALIURE
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

    export function getBrainTreeClientToken() {
        return {
            type: GET_BRAINTREE_CLIENT_TOKEN,
        };
    }

    export function getBrainTreeClientTokenSuccess(clientToken) {
        return {
            type: GET_BRAINTREE_CLIENT_TOKEN_SUCCESS,
            clientToken
        };
    }
  
    export function getBrainTreeClientTokenFailure(err) {
        return {
            type: GET_BRAINTREE_CLIENT_TOKEN_FALIURE,
            err,
        };
    }

