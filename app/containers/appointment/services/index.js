// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceScreen from './ServiceScreen';

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
        selectedAppointment: state.appointmentLists.selectedAppointment
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);

