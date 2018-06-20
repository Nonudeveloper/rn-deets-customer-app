// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeScreen from './DateTimeScreen';

import * as appointmentActions from '../../../redux/appointment/actions';
import { createNewServiceAppointment, rescheduleServiceAppointment } from '../../../redux/appointment/services/serviceActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
        createNewServiceAppointment: (service, selectedVehicle, addons, geoData, serviceDate) => {
            dispatch(createNewServiceAppointment(service, selectedVehicle, addons, geoData, serviceDate));
        },
        rescheduleServiceAppointment: (appointmentId, addOns, serviceDate) => {
            dispatch(rescheduleServiceAppointment(appointmentId, addOns, serviceDate));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        services: state.Service.services,
        technicians: state.Service.technician,
        selectedServices: state.Service.selectedServices,
        reSchedule: state.appointmentLists.selectedAppointment,
        errorMessage: state.Service.errorMessage,
        technicianFetching: state.Service.technicianFetching,
        addressString: state.Geo.addressString,
        geoLocationData: state.Geo.geoLocationData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeScreen);

