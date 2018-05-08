import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { getItem } from '../asyncStorage';

class AppointmetHelper {


    appendVehicleData = async (data, authData) => {
        const type = authData.form.type;
        const typeData = type.split(', ');

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
    }

    addUpdateVehicle = async authData => {
        const formData = new FormData();
        const data = this.appendVehicleData(formData, authData);
        return await fetch('http://127.0.0.1:8000/customer/add_or_edit_user_vehicle_information', {
            method: 'POST',
            body: data,
            }).then(response => {
                 return JSON.parse(response._bodyText);
            })
            .catch(error => console.log(error));
    };


    postNewAppointment = async appointmentData => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            cost: appointmentData.cost,
            notes: appointmentData.notes,
            body_payment_card_id: appointmentData.body_payment_card_id,
            service_end_time: appointmentData.service_end_time,
            service_location_zipcode: '11106',
            service_location_latitude: '33.8218570',
            service_location_longitude: '-118.0615270',
            service_location_string: '1386–1468 State Route 97, Narrowsburg, NY  12764, United States',
            service_start_time: appointmentData.service_start_time,
            technician_id: appointmentData.technician_id,
            user_service_appointment_id: appointmentData.user_service_appointment_id,
            service_duration_minutes: appointmentData.service_duration_minutes
        };
        return await SuperFetch.post('customer/schedule_user_service_appointment', data).then(response => {
            return response;
        });

        // return await fetch('http://127.0.0.1:8000/customer/create_new_user_service_appointment', {
        //     method: 'POST',
        //     body: allData,
        //     }).then(response => {
        //          return JSON.parse(response._bodyText);
        //     })
        //     .catch(error => console.log(error));
    }

    addNewCardDetails = async ({ cardDetails }) => {
        return await SuperFetch.post('customer/add_new_payment_method_for_existing_user', cardDetails)
            .then(response => {
                return response;
            })
            .catch(error => console.log(error));
      };
  
}

export default new AppointmetHelper();
