import _ from 'lodash';
import { 
    FETCH_NEARBY_SERVICE_PROVIDERS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_SUCCESS, 
    FETCH_NEARBY_SERVICE_PROVIDERS_FALIURE,
    FETCH_POLYGON_DATA,
    FETCH_POLYGON_DATA_SUCCESS,
    FETCH_POLYGON_DATA_FALIURE,
    PAY_TIP_TO_TECHNICIAN,
    PAY_TIP_TO_TECHNICIAN_SUCCESS,
    PAY_TIP_TO_TECHNICIAN_FALIURE,
    HIDE_ALERT,
    EMPTY_POLYGON_DATA,
    SAVE_UNSERVED_AREA
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

export function emptyPolygonData() {
    return {
        type: EMPTY_POLYGON_DATA
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


export function payTipToTechnician(payload) {
    return {
        type: PAY_TIP_TO_TECHNICIAN,
        payload
    };
}

export function payTipToTechnicianSuccess(log) {
    return {
        type: PAY_TIP_TO_TECHNICIAN_SUCCESS,
        log
    };
}

export function payTipToTechnicianFaliure(err) {
    return {
        type: PAY_TIP_TO_TECHNICIAN_FALIURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function saveUnservedArea(areaData) {
    return {
        type: SAVE_UNSERVED_AREA,
        areaData
    };
}
