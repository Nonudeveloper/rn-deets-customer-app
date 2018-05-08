// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppointmentList from './appointmentList';

import * as appointmentListActions from '../../redux/appointmentList/upcoming/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentListActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Service.isFetching,
        pastAppointments: state.appointmentLists.pastAppointments
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentList);

