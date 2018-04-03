import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';


class RegisterHelper {
  
  register = async userInfo => {
    const type = userInfo.form2.type;
    const typeData = type.split(', ');
    const data = new FormData();

    const base64String = 'data:image/jpeg;base64,' + userInfo.userImage.data;
    // fs.writeFile('my_image.jpg', base64String, { encoding: 'base64' }, function(err) {
    //     console.log('File created');
    // });
    const file = dataURLtoFile(base64String, 'my_photo.jpg');
    data.append('userImage', file);

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

    return await fetch('https://postman-echo.com/post', {
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

