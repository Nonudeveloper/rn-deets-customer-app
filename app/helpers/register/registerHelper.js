import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';


class RegisterHelper {
  
  register = async userInfo => {
    const type = userInfo.form2.type;
    const typeData = type.split(', ');
    const data = new FormData();
    if (Object.keys(userInfo.userImage).length > 0) {
        const userBase64String = 'data:image/jpeg;base64,' + userInfo.userImage.data;
        const userImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
        data.append('user_image', userImageFile);
    } 
    
    if (Object.keys(userInfo.vehicleImage).length > 0) {
        const vehicleBase64String = 'data:image/jpeg;base64,' + userInfo.vehicleImage.data;
        const vehicleImageFile = dataURLtoFile(vehicleBase64String, 'my_car.jpg');
        data.append('vehicle_image', vehicleImageFile);
    }

    if (userInfo.form1.flag === 1) {
        data.append('fb_access_token', userInfo.form1.fb_access_token);
        data.append('fb_id', userInfo.form1.fb_id);
        data.append('gender', userInfo.form1.gender);
    }

    if (userInfo.form1.device_token.os === 'android') {
      data.append('user_type', 2);
    } else {
      data.append('user_type', 1);
    }
    data.append('first_name', userInfo.form1.fname);
    data.append('last_name', userInfo.form1.lname);
    data.append('email', userInfo.form1.email);
    data.append('mobile', userInfo.form1.mobile);
    data.append('password', userInfo.form1.password);
    data.append('device_token', userInfo.form1.device_token.token);
    data.append('flag', userInfo.form1.flag);
    data.append('vehicle_model_id', userInfo.form2.model_id);
    data.append('vehicle_make_id', userInfo.form2.make_id);
    data.append('vehicle_color_id', userInfo.form2.color_id);
    data.append('vehicle_year_id', userInfo.form2.year);
    data.append('license', userInfo.form2.license);
    data.append('vehicle_make', userInfo.form2.make_id);
    data.append('vehicle_model', userInfo.form2.model);
    data.append('vehicle_color', userInfo.form2.color);
    data.append('vehicle_year', userInfo.form2.year);
    data.append('vehicle_type', userInfo.form2.vehicle_type);
    data.append('vehicle_type_name', typeData[0]);
    data.append('vehicle_type_segment', typeData[1]);
    data.append('vehicle_type_segment_id', userInfo.form2.vehicle_type_segment_id);
    data.append('notes', userInfo.form2.notes);
    data.append('license_type', 2);
    data.append('nonce', userInfo.nonce);

    return await fetch('https://api.deetsmobile.com/customer/register_new_user', {
      method: 'POST',
      body: data,
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
    return await SuperFetch.post('customer/get_vehicle_data_for_year', year)
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

