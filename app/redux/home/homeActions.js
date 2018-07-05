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
    const data = arrangeDataForPolygon(res);
    return {
        type: FETCH_POLYGON_DATA_SUCCESS,
        data
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
    const polygonFeatures = [];
    const pointFeatures = [];
        for (var key in res) {
            polygonFeatures.push(
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
            pointFeatures.push(
                {
                    type: 'Feature',
                    properties: {
                        title: key,
                        description: key
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: res[key].marker
                    }
                }
            );
        }
    return { polygonFeatures, pointFeatures };
}
