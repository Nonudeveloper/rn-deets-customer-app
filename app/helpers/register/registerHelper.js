import SuperFetch from '../superFetch';

class RegisterHelper {
  

 
  register = async userInfo => {
    const type = userInfo.form2.type;
    const typeData = type.split(', ');
    const data = new FormData();
    data.append('user_image', {
      uri: userInfo.user_image.uri,
      name: 'my_photo.jpg',
      type: 'image/jpg'
      // name: userInfo.user_image.fileName,
      // type: userInfo.user_image.type
    });
    if (userInfo.form1.flag === 1) {
      data.append('fb_access_token', userInfo.form1.fb_access_token);
      data.append('fb_id', userInfo.form1.fb_id);
    }
    data.append('first_name', userInfo.form1.fname);
    data.append('last_name', userInfo.form1.lname);
    data.append('email', userInfo.form1.email);
    data.append('mobile', userInfo.form1.mobile);
    data.append('password', userInfo.form1.password);
    data.append('user_type', 2);
    data.append('device_token', 78);
    data.append('flag', userInfo.form1.flag);
    data.append('vehicle_model_id', userInfo.form2.model);
    data.append('vehicle_make_id', userInfo.form2.make);
    data.append('vehicle_color_id', userInfo.form2.color);
    data.append('vehicle_year_id', userInfo.form2.year);
    data.append('license', userInfo.form2.license);
    data.append('vehicle_make', 34);
    data.append('vehicle_model', '34');
    data.append('vehicle_color', '34');
    data.append('vehicle_year', '34');
    data.append('vehicle_type', 1);
    data.append('vehicle_type_name', typeData[0]);
    data.append('vehicle_type_segment', typeData[1]);
    data.append('vehicle_type_segment_id', 5);
    data.append('notes', userInfo.form2.notes);
    data.append('license_type', 2);
    data.append('nonce', userInfo.nonce);

    return await fetch('http://127.0.0.1:8000/customer/register_new_user', {
      method: 'post',
      body: data
    }).then(response => {
       return JSON.parse(response._bodyText).result;
    })
    .catch(error => ({ error: JSON.stringify(error) }));
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

