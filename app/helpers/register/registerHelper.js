import SuperFetch from '../superFetch';

class RegisterHelper {

  register = async userInfo => {
    return await SuperFetch.post('user_register', userInfo).then(response => {
        const result = this.checkExpirity(response.access_token);
        result.user = response.user;
        return result;
    });
  };

  customHeader = () => ({
    'Content-Type': 'application/json',
    Accept: 'application/json',
    //Authorization: 'Bearer '+localStorage.getItem('id_token') || undefined
  });

  async fetchAllVehicles() {
    // return await SuperFetch.post('technician/get_vehicle_years')
    // .then(response => {
    //   return response;
    // })
    // .catch(error => ({ error: JSON.stringify(error) }));
    return await fetch('https://api.deetsmobile.com/get_vehicle_years', {
      method: 'post',
      headers: this.customHeader(),
    })
      .then(response => response.json())
      .then(res => res)
      .catch(error => ({ error }));
  }

  verifyEmail = async email => {
    let registration_type = 2;
    return await SuperFetch.post('customer/verify_email', { email, registration_type }).then(response => {
        return response;
    })
    .catch(error => ({ error: JSON.stringify(error) }));
  };

  async fetchMakeModel(year) {
    return await SuperFetch.post('technician/get_vehicle_data_for_year', year)
    .then(response => {
      return response;
    })
    .catch(error => ({ error: JSON.stringify(error) }));
  }

  async fetchNearByPlaces(data) {
    return await SuperFetch.get('technician/get_nearby_place_polygon?longitude=' + data.payload[1] + '&latitude=' + data.payload[0] + '&type=postcode')
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
  }
}

export default new RegisterHelper();

