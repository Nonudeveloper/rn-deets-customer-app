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
}
export default new ProfileHelper();
