import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';

class HomeHelper {

  async fetchNearByPlaces(data) {
    // return await SuperFetch.get('technician/get_nearby_place_polygon?longitude=' + data.payload[0] + '&latitude=' + data.payload[1] + '&type=postcode')
    return await SuperFetch.get(`technician/get_nearby_place_polygon?longitude=${data.payload[0]}&latitude=${data.payload[1]}&type=postcode`)
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
  }

  hitMapboxPlacesApi = async (data) => {
    // return await SuperFetch.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${data.query}.json?access_token=${
    //   data.MAPBOX_API_KEY
    // }&autocomplete=true`)
    // .then(response => {
    //   return response;
    // })
    // .catch(error => ({ error }));
    const path = `https://api.mapbox.com/geocoding/v5/mapbox.places/${data.query}.json?access_token=${
      data.MAPBOX_API_KEY
    }&autocomplete=true`;

    return await fetch(path, {
      method: 'get',
    })
      .then(res => res)
      .catch(error => ({ error }));
  }

  getRecentLocations = async () => {
    const user = await getItem('user');
    const data = {
        access_token: JSON.parse(user).access_token,
    };
    return await SuperFetch.post('customer/get_customer_recent_locations', data);
  } 

  deleteRecentLocation = async (locationId) => {
    const user = await getItem('user');
    const data = {
        access_token: JSON.parse(user).access_token,
        id: locationId
    };
    return await SuperFetch.post('customer/delete_user_recent_location', data);
  }

}

export default new HomeHelper();
