// @flow
// Container for PastAppointmentsList Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PastAppointmentsList from './PastAppointmentsList';

import * as appointmentListActions from '../../redux/appointmentList/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentListActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Service.isFetching,
        pastAppointments: state.appointmentLists.pastAppointments,
        upcomingAppointments: state.appointmentLists.upcomingAppointments,
        selectedAppointments: state.appointmentLists.selectedAppointments
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(PastAppointmentsList);

