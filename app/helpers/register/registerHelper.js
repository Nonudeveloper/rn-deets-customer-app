import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { apiConfig } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

class RegisterHelper {
  
  register = async userInfo => {
    const type = userInfo.form2.type;
    const typeData = type.split(', ');
    let vehicleImage;
    let userImage;
    if (Object.keys(userInfo.userImage).length > 0) {
        // const userBase64String = `data:image/jpeg;base64,${authData.vehicleImage.data}`;
        // const userVehicleImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
        
        userImage = {
            name: 'user_image',
            filename: 'myPhoto.jpg',
            type: userInfo.userImage.type,
            data: RNFetchBlob.wrap(userInfo.userImage.uri),
        };
    } else {
      userImage = {
            name: 'user_image',
            data: null,
        };
    }

    if (Object.keys(userInfo.vehicleImage).length > 0) {
      // const userBase64String = `data:image/jpeg;base64,${authData.vehicleImage.data}`;
      // const userVehicleImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
      
      vehicleImage = {
          name: 'vehicle_image',
          filename: 'myPhoto.jpg',
          type: userInfo.vehicleImage.type,
          data: RNFetchBlob.wrap(userInfo.vehicleImage.uri),
      };
    } else {
        vehicleImage = {
            name: 'vehicle_image',
            data: null,
        };
    }
        return await RNFetchBlob.fetch(
            'POST',
            `${apiConfig.url}customer/register_new_user`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
              { name: 'first_name', data: String(userInfo.form1.fname) },
              { name: 'last_name', data: String(userInfo.form1.lname) },
              { name: 'email', data: String(userInfo.form1.email) },
              { name: 'mobile', data: String(userInfo.form1.mobile) },
              { name: 'password', data: String(userInfo.form1.password) },
              { name: 'device_token', data: String(userInfo.form1.device_token.token) },
              { name: 'flag', data: String(userInfo.form1.flag) },
              { name: 'vehicle_model_id', data: String(userInfo.form2.model_id) },
              { name: 'vehicle_make_id', data: String(userInfo.form2.make_id) },
              { name: 'vehicle_color_id', data: String(userInfo.form2.color_id) },
              { name: 'vehicle_year_id', data: String(userInfo.form2.year) },
              { name: 'license', data: String(userInfo.form2.radio_button_type === 0 ? userInfo.form2.license : userInfo.form2.vin) },
              { name: 'vehicle_make', data: String(userInfo.form2.make) },
              { name: 'vehicle_model', data: String(userInfo.form2.model) },
              { name: 'vehicle_color', data: String(userInfo.form2.color) },
              { name: 'vehicle_year', data: String(userInfo.form2.year) },
              { name: 'vehicle_type', data: String(userInfo.form2.vehicle_type) },
              { name: 'vehicle_type_name', data: String(typeData[0]) }, 
              { name: 'vehicle_type_segment', data: String(typeData[1]) },
              { name: 'vehicle_type_segment_id', data: String(userInfo.form2.vehicle_type_segment_id) },  
              { name: 'notes', data: String(userInfo.form2.notes) },
              { name: 'license_type', data: String(userInfo.form2.radio_button_type === 0 ? 2 : 1) },
              { name: 'nonce', data: String(userInfo.nonce) },
              { name: 'user_type', data: String(userInfo.form1.device_token.os === 'android' ? 2 : 1) },
              { name: 'fb_access_token', data: String(userInfo.form1.flag === 1 ? userInfo.form1.fb_access_token : '') },
              { name: 'fb_id', data: String(userInfo.form1.flag === 1 ? userInfo.form1.fb_id : '') },
              { name: 'gender', data: String(userInfo.form1.flag === 1 ? userInfo.form1.gender : '') },
              vehicleImage,
              userImage,
            ],
        ).then((resp) => {
            return JSON.parse(resp.data);
        }).catch((err) => {
            console.warn(err);
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
    return await fetch(`${apiConfig.url}get_vehicle_years`, {
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

