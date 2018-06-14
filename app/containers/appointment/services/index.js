// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServicesScreen from './ServicesScreen';

import * as serviceActions from '../../../redux/appointment/services/serviceActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(serviceActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        services: state.Service.services,
        isFetching: state.Service.isFetching,
        selectedVehicle: state.AuthVehicle.selectedVehicle,
        selectedAppointment: state.appointmentLists.selectedAppointment,
        errorMessage: state.Service.errorMessage,
        technicianFetching: state.Service.technicianFetching,
        addressString: state.Geo.addressString,
        geoLocationData: state.Geo.geoLocationData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServicesScreen);

