import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';
import { dataURLtoFile, USER } from '../utility';

class ServicesHelper {

    async fetchAllServices() {
        const user = await getItem(USER);
        // const token = await getItem('token');
        return await SuperFetch.post('customer/get_default_services_and_adds_on', { access_token: JSON.parse(user).access_token })
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));
    }

    createNewAppointment = async appointmentInfo => {
        const user = await getItem(USER);
        const data = new FormData();

        if (appointmentInfo.selectedVehicle.vehicle_type === 2) {
            data.append('service_cost', appointmentInfo.service.service_Large_cost);
        } else {
            data.append('service_cost', appointmentInfo.service.cost);
        }
        const today = new Date();
        const selectedDate = appointmentInfo.serviceDate === '' ? new Date() : new Date(appointmentInfo.serviceDate);
        const serviceDate = selectedDate.getFullYear() + '-' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + selectedDate.getDate()).slice(-2);

        const payload = {
            service_cost: appointmentInfo.selectedVehicle.vehicle_type === 2 ? appointmentInfo.service.service_Large_cost : appointmentInfo.service.cost,
            service_image: appointmentInfo.service.image,
            service_id: appointmentInfo.service.service_id,
            access_token: JSON.parse(user).access_token,
            service_name: appointmentInfo.service.service_name,
            service_location_zipcode: appointmentInfo.geoData.geoLocationData[0].zipcode,
            service_location_latitude: appointmentInfo.geoData.geoLocationData[0].coordinates[1],
            service_location_longitude: appointmentInfo.geoData.geoLocationData[0].coordinates[0],
            service_date: serviceDate,
            service_duration_minutes: appointmentInfo.service.estimation_time,
            current_date_time: today.toJSON(),
            adds_on_id: appointmentInfo.addons,
            user_vehicle_id: appointmentInfo.selectedVehicle.vehicle_id,
            service_location_string: appointmentInfo.geoData.addressString,
            vehicle_type_key_cost: appointmentInfo.selectedVehicle.vehicle_type_key_cost
        };
        // data.append('service_image', appointmentInfo.service.image);
        // data.append('service_id', appointmentInfo.service.service_id);
        // data.append('access_token', JSON.parse(user).access_token);
        // data.append('service_name', appointmentInfo.service.service_name);
        // data.append('service_location_zipcode', '11106');
        // data.append('service_location_latitude', '33.8218570');
        // data.append('service_location_longitude', '-118.0615270');
        // data.append('service_date', date);
        // data.append('service_duration_minutes', appointmentInfo.service.estimation_time);
        // data.append('current_date_time', today.toJSON());
        // data.append('adds_on_id', appointmentInfo.addons);
        // data.append('user_vehicle_id', appointmentInfo.selectedVehicle.vehicle_id);
        // data.append('service_location_string', '1386–1468 State Route 97, Narrowsburg, NY  12764, United States');
        // data.append('vehicle_type_key_cost', appointmentInfo.selectedVehicle.vehicle_type_key_cost);
           
    
        // const token = await getItem('token');
        return await SuperFetch.post('customer/create_new_user_service_appointment', payload)
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));

        
        // return await fetch('http://newapi.deetsmobile.com/customer/create_new_user_service_appointment', {
        //     method: 'POST',
        //     body: { ...payload },
        //     headers: {
        //         'Accept':       'application/json',
        //         'Content-Type': 'application/json'
        //       }
        //     }).then(response => {
        //     return JSON.parse(response._bodyText);
        //     })
        //     .catch(error => ({ error: JSON.stringify(error) }));
    }

    reschudleAppointment = async reschudleAppointmentInfo => {
        const user = await getItem(USER);
        const data = new FormData();
        const today = new Date();
        const selectedDate = reschudleAppointmentInfo.serviceDate === '' ? new Date() : new Date(reschudleAppointmentInfo.serviceDate);
        const serviceDate = selectedDate.getFullYear() + '-' + ('0' + (selectedDate.getMonth() + 1)).slice(-2) + '-' + ('0' + selectedDate.getDate()).slice(-2);

        const payload = {
            access_token: JSON.parse(user).access_token,
            service_date: serviceDate,
            current_date_time: today.toJSON(),
            adds_on_id: reschudleAppointmentInfo.addOns,
            service_appointment_id: reschudleAppointmentInfo.appointmentId
        };
        return await SuperFetch.post('customer/reschedule_user_current_appointment', payload)
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));
    }


}


export default new ServicesHelper();

