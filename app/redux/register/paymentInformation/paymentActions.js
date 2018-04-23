import { 
    FETCH_MAKE_MODEL, 
  } from '../constants';
    
    export function fetchMakeModel(year) {
      return {
        type: FETCH_MAKE_MODEL,
        year
      };
    }

