import SuperFetch from '../superFetch';
import { getItem } from '../asyncStorage';
import { dataURLtoFile,  } from '../utility';

class ServicesHelper {

    async fetchAllServices() {
        const user = await getItem('user');
        // const token = await getItem('token');
        return await SuperFetch.post('customer/get_default_services_and_adds_on', { access_token: JSON.parse(user).access_token })
        .then(response => response)
        .catch(error => ({ error: JSON.stringify(error) }));
    }

    createNewAppointment = async appointmentInfo => {
        console.log(appointmentInfo);
        const user = await getItem('user');
        const data = new FormData();

        if (appointmentInfo.selectedVehicle.vehicle_type === 2) {
            data.append('service_cost', appointmentInfo.service.service_Large_cost);
        } else {
            data.append('service_cost', appointmentInfo.service.cost);
        }
        const today = new Date();
        const date = today.getFullYear() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getDate();

        const payload = {
            service_cost: appointmentInfo.selectedVehicle.vehicle_type === 2 ? appointmentInfo.service.service_Large_cost : appointmentInfo.service.cost,
            service_image: appointmentInfo.service.image,
            service_id: appointmentInfo.service.service_id,
            access_token: JSON.parse(user).access_token,
            service_name: appointmentInfo.service.service_name,
            service_location_zipcode: '7302',
            service_location_latitude: '33.8218570',
            service_location_longitude: '-118.0615270',
            service_date: '2018-04-26',
            service_duration_minutes: appointmentInfo.service.estimation_time,
            current_date_time: today.toJSON(),
            adds_on_id: appointmentInfo.addons,
            user_vehicle_id: appointmentInfo.selectedVehicle.vehicle_id,
            service_location_string: '1386–1468 State Route 97, Narrowsburg, NY  12764, United States',
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
        return await SuperFetch.post('/customer/create_new_user_service_appointment', payload)
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
}


export default new ServicesHelper();

