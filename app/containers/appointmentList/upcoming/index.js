// @flow
// Container for UpcomingAppointmentsList Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UpcomingAppointmentsList from './UpcomingAppointmentList';

import * as homeActions from '../../../redux/home/homeActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Service.isFetching,
        pastAppointments: state.appointmentLists.pastAppointments
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpcomingAppointmentsList);

