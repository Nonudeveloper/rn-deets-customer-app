import _ from 'lodash';
import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
    FETCH_POLYGON_DATA,
    FETCH_POLYGON_DATA_SUCCESS,
    FETCH_POLYGON_DATA_FALIURE
} from './constants';

    
export function fetchNearByPlaces(payload) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS,
        payload
    };
}

export function fetchNearByPlacesSuccess(serviceProviders) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS,
        serviceProviders
    };
}

export function fetchNearByPlacesFaliure(err) {
    return {
        type: FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
        err
    };
}

export function fetchPolygonData(center) {
    return {
        type: FETCH_POLYGON_DATA,
        center
    };
}

export function fetchPolygonDataSuccess(res) {
    const polygonData = arrangeDataForPolygon(res);
    return {
        type: FETCH_POLYGON_DATA_SUCCESS,
        data: polygonData
    };
}

export function fetchPolygonDataFaliure(err) {
    return {
        type: FETCH_POLYGON_DATA_FALIURE,
        err
    };
}

function arrangeDataForPolygon(res) {
    // const polygonData = res.data.map((item) => _.flattenDeep(item.coordinates));
    // const furtherFlattenArray = _.flattenDeep(polygonData);
    // const len = res.length;
    const finalArray = [];
        for (var key in res) {
            finalArray.push(
                {
                    "type": "Feature",
                    "properties": {
              
                    },
                    "geometry": {
                      "type": "Polygon",
                      "coordinates": [
                        res[key].polygon
                      ]
                    }
                }
            );
        }
    return finalArray;
}
