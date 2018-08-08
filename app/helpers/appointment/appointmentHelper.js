import SuperFetch from '../superFetch';
import { dataURLtoFile } from '../utility';
import { getItem } from '../asyncStorage';
import { apiConfig } from '../../config';
import RNFetchBlob from 'rn-fetch-blob';

class AppointmetHelper {

    addUpdateVehicle = async authData => {
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


    postNewAppointment = async appointmentData => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            cost: appointmentData.cost,
            notes: appointmentData.notes,
            payment_card_id: appointmentData.body_payment_card_id,
            service_end_time: appointmentData.service_end_time,
            service_location_zipcode: appointmentData.service_location_zipcode,
            service_location_latitude: appointmentData.service_location_latitude,
            service_location_longitude: appointmentData.service_location_longitude,
            service_location_string: appointmentData.service_location_string,
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

    fetchUpcomingAndPastAppointments = async () => {
        const user = await getItem('user');
        const dateToday = new Date();
        const data = {
            access_token: JSON.parse(user).access_token,
            current_date_time: dateToday
        };
        return await SuperFetch.post('customer/get_user_upcoming_and_past_appointments', data);
    }

    deleteAppointment = async appointmentData => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            service_appointment_id: appointmentData.payload.appointment.id,
            technician_id: appointmentData.payload.appointment.technician_id,
            flag: 3,
            service_start_time: appointmentData.payload.appointment.service_start_time,
            ReasonId: 3
        };
        return await SuperFetch.post('customer/delete_or_cancelled_user_service_appointment_by_customer', data);
    }

    callToTechnician = async callData => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            phone: '+919882503084',
            registration_type: 2
        };
        return await SuperFetch.post('customer/make_call_to_technician_or_user', data);
    }

    textMessageToTechnician = async messageData => {
        const user = await getItem('user');
        const data = {
            access_token: JSON.parse(user).access_token,
            phone: '+919882503084',
            registration_type: 2,
            message_body: 2
        };
        return await SuperFetch.post('send_text_message_to_technician_or_user', data);
    } 

    acceptOrRejectRequestedService = async addOnsData => {
        const user = await getItem('user');
        const access_token = JSON.parse(user).access_token;
        return await SuperFetch.post('customer/accept_or_reject_requested_service_by_technician', { access_token, ...addOnsData });
    }
  
}

export default new AppointmetHelper();
