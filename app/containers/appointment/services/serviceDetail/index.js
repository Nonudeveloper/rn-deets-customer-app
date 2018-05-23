// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceScreen from './ServiceDetailScreen';

import * as serviceActions from '../../../../redux/appointment/services/serviceActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(serviceActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        selectedVehicle: state.AuthVehicle.selectedVehicle,
        errorMessage: state.Service.errorMessage,
        technicianFetching: state.Service.technicianFetching,
        selectedAppointment: state.appointmentLists.selectedAppointment
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);

