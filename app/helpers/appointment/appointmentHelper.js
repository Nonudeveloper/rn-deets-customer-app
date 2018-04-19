import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { getItem } from '../asyncStorage';

class AppointmetHelper {
    addUpdateVehicle = async authData => {
        const type = authData.form.type;
        const typeData = type.split(', ');
        const data = new FormData();
        if (Object.keys(authData.vehicleImage).length > 0) {
            const userBase64String = 'data:image/jpeg;base64,' + authData.vehicleImage.data;
            const userVehicleImageFile = dataURLtoFile(userBase64String, 'my_photo.jpg');
            data.append('vehicle_image', userVehicleImageFile);
        } else {
            data.append('vehicle_image', '');
        }
        if (authData.form.access_token) {
            data.append('access_token', authData.form.access_token);
        } else {
            const user = await getItem('user');
            data.append('access_token', JSON.parse(user).access_token);
        }
        
        data.append('flag', authData.form.flag);
        data.append('vehicle_model_id', authData.form.model_id);
        data.append('vehicle_make_id', authData.form.make_id);
        data.append('vehicle_color_id', authData.form.color_id);
        data.append('vehicle_year_id', authData.form.year);
        data.append('license', authData.form.license);
        data.append('vehicle_make', authData.form.make_id);
        data.append('vehicle_model', authData.form.model);
        data.append('vehicle_color', authData.form.color);
        data.append('vehicle_year', authData.form.year);
        data.append('vehicle_type', authData.form.vehicle_type);
        data.append('vehicle_type_name', typeData[0]);
        data.append('vehicle_type_segment', typeData[1]);
        data.append('vehicle_type_segment_id', authData.form.vehicle_type_segment_id);
        data.append('notes', authData.form.notes);
        data.append('license_type', 2);
        data.append('vehicle_id', authData.form.vehicle_id);


        return await fetch('http://127.0.0.1:8000/customer/add_or_edit_user_vehicle_information', {
            method: 'POST',
            body: data,
            }).then(response => {
                 return JSON.parse(response._bodyText);
            })
            .catch(error => console.log(error));
  };
}

export default new AppointmetHelper();
