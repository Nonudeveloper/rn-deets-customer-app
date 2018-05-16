import { TOGGLE_COLOR } from './constants';
    
export function fetchServices(index) {
    return {
        type: TOGGLE_COLOR,
        index
    };
}
