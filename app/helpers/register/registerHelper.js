import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { apiConfig } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

class RegisterHelper {
  
  register = async userInfo => {
    const type = userInfo.form1.flag === 3 ? userInfo.form2.type : '';
    const typeData = userInfo.form1.flag === 3 ? type.split(', ') : '';
    let vehicleImage;
    let userImage;
    if (Object.keys(userInfo.userImage).length > 0 && userInfo.form1.flag === 3) {
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

    if (Object.keys(userInfo.vehicleImage).length > 0 && userInfo.form1.flag === 3) {
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
              { name: 'mobile', data: String(userInfo.form1.flag === 3 ? userInfo.form1.mobile : '') },
              { name: 'password', data: String(userInfo.form1.flag === 3 ? userInfo.form1.password : '') },
              { name: 'device_token', data: String(userInfo.form1.device_token.token) },
              { name: 'flag', data: String(userInfo.form1.flag) },
              { name: 'vehicle_model_id', data: String(userInfo.form1.flag === 3 ? userInfo.form2.model_id : '') },
              { name: 'vehicle_make_id', data: String(userInfo.form1.flag === 3 ? userInfo.form2.make_id : '') },
              { name: 'vehicle_color_id', data: String(userInfo.form1.flag === 3 ? userInfo.form2.color_id : '') },
              { name: 'vehicle_year_id', data: String(userInfo.form1.flag === 3 ? userInfo.form2.year : '') },
              { name: 'license', data: String(userInfo.form1.flag === 3 ? (userInfo.form2.radio_button_type === 0 ? userInfo.form2.license : userInfo.form2.vin) : '') },
              { name: 'vehicle_make', data: String(userInfo.form1.flag === 3 ? userInfo.form2.make : '') },
              { name: 'vehicle_model', data: String(userInfo.form1.flag === 3 ? userInfo.form2.model : '') },
              { name: 'vehicle_color', data: String(userInfo.form1.flag === 3 ? userInfo.form2.color : '') },
              { name: 'vehicle_year', data: String(userInfo.form1.flag === 3 ? userInfo.form2.year : '') },
              { name: 'vehicle_type', data: String(userInfo.form1.flag === 3 ? userInfo.form2.vehicle_type : '') },
              { name: 'vehicle_type_name', data: String(userInfo.form1.flag === 3 ? typeData[0] : '') }, 
              { name: 'vehicle_type_segment', data: String(userInfo.form1.flag === 3 ? typeData[1] : '') },
              { name: 'vehicle_type_segment_id', data: String(userInfo.form1.flag === 3 ? userInfo.form2.vehicle_type_segment_id : '') },  
              { name: 'notes', data: String(userInfo.form1.flag === 3 ? userInfo.form2.notes : '') },
              { name: 'license_type', data: String(userInfo.form1.flag === 3 ? (userInfo.form2.radio_button_type === 0 ? 2 : 1) : '') },
              { name: 'nonce', data: String(userInfo.form1.flag === 3 ? userInfo.nonce : '') },
              { name: 'user_type', data: String(userInfo.form1.device_token.os === 'android' ? 2 : 1) },
              { name: 'fb_access_token', data: String(userInfo.form1.flag === 1 ? userInfo.form1.fb_access_token : '') },
              { name: 'fb_id', data: String(userInfo.form1.flag === 1 ? userInfo.form1.fb_id : '') },
              { name: 'gender', data: String(userInfo.form1.flag === 1 ? userInfo.form1.gender : '') },
              { name: 'gtm_access_token', data: String(userInfo.form1.flag === 2 ? userInfo.form1.gtm_access_token : '') },
              { name: 'gtm_id', data: String(userInfo.form1.flag === 2 ? userInfo.form1.gtm_id : '') },
              { name: 'image_url', data: String(userInfo.form1.flag !== 3 ? userInfo.userImage : '') },
              vehicleImage,
              userImage,
            ],
        ).then((resp) => {
            return JSON.parse(resp.data);
        }).catch((err) => {
            console.warn(err);
        });
};

// register = async userInfo => {
//     const data = new FormData();
//     const type = userInfo.form2.type;
//     const typeData = type.split(', ');

//     if (Object.keys(userInfo.userImage).length > 0) {
//       const userBase64String = 'data:image/jpeg;base64,' + userInfo.userImage.data;
//       const userImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
//       data.append('user_image', userImageFile);
//     } else {
//       data.append('user_image', null);
//     }
  
//     if (Object.keys(userInfo.vehicleImage).length > 0) {
//         const vehicleBase64String = 'data:image/jpeg;base64,' + userInfo.vehicleImage.data;
//         const vehicleImageFile = dataURLtoFile(vehicleBase64String, 'my_car.jpg');
//         data.append('vehicle_image', vehicleImageFile);
//     } else {
//       data.append('vehicle_image', null);
//     }

//     if (userInfo.form1.flag === 1) {
//         data.append('fb_access_token', userInfo.form1.fb_access_token);
//         data.append('fb_id', userInfo.form1.fb_id);
//         data.append('gender', userInfo.form1.gender);
//     }
    
//     data.append('first_name', userInfo.form1.fname);
//     data.append('last_name', userInfo.form1.lname);
//     data.append('email', userInfo.form1.email);
//     data.append('mobile', userInfo.form1.mobile);
//     data.append('password', userInfo.form1.password);
//     data.append('user_type', userInfo.form1.device_token.os === 'android' ? 2 : 1);
//     data.append('device_token', userInfo.form1.device_token.token);
//     data.append('flag', userInfo.form1.flag);
//     data.append('vehicle_model_id', userInfo.form2.model_id);
//     data.append('vehicle_make_id', userInfo.form2.make_id);
//     data.append('vehicle_color_id', userInfo.form2.color_id);
//     data.append('vehicle_year_id', userInfo.form2.year);
//     data.append('license', userInfo.form2.radio_button_type === 0 ? userInfo.form2.license : userInfo.form2.vin);
//     data.append('vehicle_make', userInfo.form2.make);
//     data.append('vehicle_model', userInfo.form2.model);
//     data.append('vehicle_color', userInfo.form2.color);
//     data.append('vehicle_year', userInfo.form2.year);
//     data.append('vehicle_type', userInfo.form2.vehicle_type);
//     data.append('vehicle_type_name', typeData[0]);
//     data.append('vehicle_type_segment', typeData[1]);
//     data.append('vehicle_type_segment_id', userInfo.form2.vehicle_type_segment_id);
//     data.append('notes', userInfo.form2.notes);
//     data.append('license_type', userInfo.form2.radio_button_type === 0 ? 2 : 1);
//     data.append('nonce', userInfo.nonce);
//     return await fetch(`${apiConfig.url}customer/register_new_user`, {
//       method: 'post',
//       body: data
//     }).then(response => {
//        return JSON.parse(response._bodyText).result;
//     })
//     .catch(error => ({ error: JSON.stringify(error) }));
//   };

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

  async getBrainTreeClientToken() {
    return await SuperFetch.get('customer/getClientToken')
    .then(response => {
      return response;
    })
    .catch(error => ({ error }));
  }

}

export default new RegisterHelper();

