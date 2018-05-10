import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { getItem } from '../asyncStorage';

class ProfileHelper {
    editUserProfile = async userInfo => {   
        const data = new FormData();
        data.append('user_image', userInfo.newImage !== '' ? this.getImage(userInfo.newImage) : '');
        data.append('first_name', userInfo.userProfileDetails.fname);
        data.append('last_name', userInfo.userProfileDetails.lname);
        data.append('mobile', userInfo.userProfileDetails.mobile);
        data.append('access_token', userInfo.userProfileDetails.access_token);
        return await fetch('http://127.0.0.1:8000/customer/edit_user_profile', {
            method: 'POST',
            body: data,
        }).then(response => {
            return JSON.parse(response._bodyText);
        })
        .catch(error => ({ error: JSON.stringify(error) }));
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
        const formData = new FormData();
        const type = authData.form.type;
        const typeData = type.split(', ');

        if (Object.keys(authData.vehicleImage).length > 0) {
            const userBase64String = 'data:image/jpeg;base64,' + authData.vehicleImage.data;
            const userVehicleImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
            formData.append('vehicle_image', userVehicleImageFile);
        } else {
            formData.append('vehicle_image', '');
        }
        if (authData.form.access_token) {
            formData.append('access_token', authData.form.access_token);
        } else {
            const user = await getItem('user');
            formData.append('access_token', JSON.parse(user).access_token);
        }
        
        formData.append('flag', authData.form.flag);
        formData.append('vehicle_model_id', authData.form.model_id);
        formData.append('vehicle_make_id', authData.form.make_id);
        formData.append('vehicle_color_id', authData.form.color_id);
        formData.append('vehicle_year_id', authData.form.year);
        formData.append('license', authData.form.license);
        formData.append('vehicle_make', authData.form.make_id);
        formData.append('vehicle_model', authData.form.model);
        formData.append('vehicle_color', authData.form.color);
        formData.append('vehicle_year', authData.form.year);
        formData.append('vehicle_type', authData.form.vehicle_type);
        formData.append('vehicle_type_name', typeData[0]);
        formData.append('vehicle_type_segment', typeData[1]);
        formData.append('vehicle_type_segment_id', authData.form.vehicle_type_segment_id);
        formData.append('notes', authData.form.notes);
        formData.append('license_type', 2);
        formData.append('vehicle_id', authData.form.vehicle_id);
        return await fetch('http://127.0.0.1:8000/customer/add_or_edit_user_vehicle_information', {
            method: 'POST',
            body: formData,
            }).then(response => {
                 return JSON.parse(response._bodyText);
            })
            .catch(error => console.log(error));
    };

    deleteVehicle = async vehicleId => {
        const user = await getItem('user');
        const access_token =  JSON.parse(user).access_token;
        const newDate = new Date();
        const current_date_time = newDate.getFullYear() + '-' + ('0' + (newDate.getMonth()+1)).slice(-2) + '-' + ('0' + newDate.getDate()).slice(-2) +
                        ' ' + ('0' + newDate.getHours()).slice(-2) + ':' + ('0' + newDate.getMinutes()).slice(-2) + ':' + ('0' + newDate.getSeconds()).slice(-2);
        const vehicle_id = vehicleId;
    return await SuperFetch.post('/customer/delete_user_vehicle', { access_token, current_date_time, vehicle_id }).then(response => {
        return response;
    })
    .catch(error => ({ error: JSON.stringify(error) }));
    }
}
export default new ProfileHelper();
