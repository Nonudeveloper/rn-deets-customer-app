// @flow
// Container for PastAppointmentsList Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppointmentDetail from './AppointmentDetail';

import * as appointmentDetailActions from '../../../redux/appointmentList/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentDetailActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        selectedAppointments: state.appointmentLists.selectedAppointments
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);

