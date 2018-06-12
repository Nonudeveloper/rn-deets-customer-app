import { 
    FETCH_SERVICES, 
    FETCH_SERVICES_SUCCESS, FETCH_SERVICES_FALIURE,
    CREATE_NEW_USER_SERVICE_APPOINTMENT,
    SERVICES_APPOINTMENT_SUCCESS,
    SERVICES_APPOINTMENT_FALIURE,
    HIDE_ALERT,
    GET_SELECTED_SERVICES,
    STORE_SERVICE_APPOINTMENT_ID,
    RESCHEDULE_SERVICE_APPOINTMENT
} from './constants';
    
export function fetchServices() {
    return {
        type: FETCH_SERVICES,
    };
}

export function fetchServicesSuccess(services) {
    return {
        type: FETCH_SERVICES_SUCCESS,
        services
    };
}

export function fetchServicesFaliure(err) {
    return {
        type: FETCH_SERVICES_FALIURE,
        err
    };
}

export function createNewServiceAppointment(service, selectedVehicle, addons, geoData) {
    return {
        type: CREATE_NEW_USER_SERVICE_APPOINTMENT,
        service,
        selectedVehicle,
        addons,
        geoData
    };
}

export function serviceAppointmentSuccess(payload) {
    const technicians = getTechnicanAvailability(payload);
    console.log(technicians);
    return {
        type: SERVICES_APPOINTMENT_SUCCESS,
        technicians
    };
}

export function serviceAppointmentFaliure(err) {
    return {
        type: SERVICES_APPOINTMENT_FALIURE,
        err
    };
}

export function hideAlert() {
    return {
      type: HIDE_ALERT
    };
}

export function storeSelectedServices(selectedServices) {
    return {
      type: GET_SELECTED_SERVICES,
      selectedServices
    };
}

function getTechnicanAvailability(data) {
    const availableTime = [];
    if (data.technician) { 
        data.technician.map((tec, i) => {
          const convertedtime = [];
          tec.interval.map((interval, j) => {
            const date = new Date(interval);
            const getTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
            convertedtime.push({ key: j, timeavailable: getTime, selected: false });
          });
          availableTime.push({ technician: tec, time: convertedtime });
        });
    }
    return availableTime;
}

export function storeUserServiceAppointmentId(appoitmentId) {
    return {
      type: STORE_SERVICE_APPOINTMENT_ID,
      appoitmentId
    };
}

export function rescheduleServiceAppointment(appointmentId, addOns) {
    return {
      type: RESCHEDULE_SERVICE_APPOINTMENT,
      appointmentId,
      addOns
    };
}
