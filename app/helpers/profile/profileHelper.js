import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { getItem } from '../asyncStorage';
import { apiConfig } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

class ProfileHelper {
    editUserProfile = async userInfo => {   
        let userImage;
        if (userInfo.newImage !== '') {
            userImage = {
                name: 'user_image',
                filename: 'myPhoto.jpg',
                type: userInfo.newImage.type,
                data: RNFetchBlob.wrap(userInfo.newImage.uri),
            };
        } else {
            userImage = {
                name: 'user_image',
                data: null,
            };
        }

        return await RNFetchBlob.fetch(
            'POST',
            `${apiConfig.url}customer/edit_user_profile`,
            {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
            [
                { name: 'first_name', data: userInfo.userProfileDetails.fname },
                { name: 'last_name', data: userInfo.userProfileDetails.lname },
                { name: 'mobile', data: userInfo.userProfileDetails.mobile },
                { name: 'access_token', data: userInfo.userProfileDetails.access_token },
                userImage,
            ],
        ).then((resp) => {
            console.log(resp);
            return JSON.parse(resp.data);
        }).catch((err) => {
            console.warn(err);
        });
        
        // const data = new FormData();
        // data.append('user_image', userInfo.newImage !== '' ? this.getImage(userInfo.newImage) : '');
        // data.append('first_name', userInfo.userProfileDetails.fname);
        // data.append('last_name', userInfo.userProfileDetails.lname);
        // data.append('mobile', userInfo.userProfileDetails.mobile);
        // data.append('access_token', userInfo.userProfileDetails.access_token);
        // return await fetch(`${apiConfig.url}customer/edit_user_profile`, {
        //     method: 'POST',
        //     body: data,
        // }).then(response => {
        //     return JSON.parse(response._bodyText);
        // })
        // .catch(error => ({ error: JSON.stringify(error) }));
    }

    getImage(image) {
        const userBase64String = 'data:image/jpeg;base64,' + image.data;
        const userImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
        return userImageFile;
    }

    changeUserPassword = async passwordData => {
        const user = await getItem('user');
        const access_token =  JSON.parse(user).access_token;
        const registration_type = 2;

        return await SuperFetch.post('customer/change_password_from_access_token', { ...passwordData, access_token, registration_type }).then(response => {
            return JSON.parse(response._bodyText);
        })
        .catch(error => ({ error: JSON.stringify(error) }));
        }

    fetchVehiclesMakeModel = async year => {
        return await SuperFetch.post('customer/get_vehicle_data_for_year', { year })
        .then(response => {
          return response;
        })
        .catch(error => ({ error: JSON.stringify(error) }));
    }


    addNewVehicle = async authData => {
        const type = authData.form.type;
        const typeData = type.split(', ');
        const user = await getItem('user');
        const accessToken = JSON.parse(user).access_token;
        let vehicleImage;

        if (Object.keys(authData.vehicleImage).length > 0) {
            // const userBase64String = `data:image/jpeg;base64,${authData.vehicleImage.data}`;
            // const userVehicleImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
            
            vehicleImage = {
                name: 'vehicle_image',
                filename: 'myPhoto.jpg',
                type: authData.vehicleImage.type,
                data: RNFetchBlob.wrap(authData.vehicleImage.uri),
            };
        } else {
            vehicleImage = {
                name: 'vehicle_image',
                data: null,
            };
        }
            return await RNFetchBlob.fetch(
                'POST',
                `${apiConfig.url}customer/add_or_edit_user_vehicle_information`,
                {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
                },
                [
                  { name: 'access_token', data: accessToken },
                  { name: 'flag', data: String(authData.form.flag) },
                  { name: 'vehicle_model_id', data: String(authData.form.model_id) },
                  { name: 'vehicle_make_id', data: String(authData.form.make_id) },
                  { name: 'vehicle_color_id', data: String(authData.form.color_id) },
                  { name: 'vehicle_year_id', data: String(authData.form.year) },
                  { name: 'license', data: String(authData.form.radio_button_type === 0 ? authData.form.license : authData.form.vin) },
                  { name: 'vehicle_make', data: String(authData.form.make_id) },
                  { name: 'vehicle_model', data: String(authData.form.model) },
                  { name: 'vehicle_color', data: authData.form.color },
                  { name: 'vehicle_year', data: String(authData.form.year) },
                  { name: 'vehicle_type', data: String(authData.form.vehicle_type) },
                  { name: 'vehicle_type_name', data: typeData[0] },
                  { name: 'vehicle_type_segment', data: String(typeData[1]) },
                  { name: 'vehicle_type_segment_id', data: String(authData.form.vehicle_type_segment_id) },
                  { name: 'notes', data: authData.form.notes },
                  { name: 'license_type', data: String(authData.form.radio_button_type === 0 ? 2 : 1) },
                  { name: 'vehicle_id', data: String(authData.form.vehicle_id) },
                  vehicleImage,
                ],
            ).then((resp) => {
                return JSON.parse(resp.data);
            }).catch((err) => {
                console.warn(err);
            });
    };

    deleteVehicle = async vehicleId => {
        const user = await getItem('user');
        const access_token =  JSON.parse(user).access_token;
        const newDate = new Date();

        const current_date_time = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2) +
                        ' ' + ('0' + newDate.getHours()).slice(-2) + ':' + ('0' + newDate.getMinutes()).slice(-2) + ':' + ('0' + newDate.getSeconds()).slice(-2);

        const vehicle_id = vehicleId;

        return await SuperFetch.post('customer/delete_user_vehicle', { access_token, current_date_time, vehicle_id }).then(response => {
            return response;
        })
        .catch(error => ({ error: JSON.stringify(error) }));
    }
}
export default new ProfileHelper();
