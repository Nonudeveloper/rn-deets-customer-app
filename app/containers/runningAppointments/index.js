// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RunningAppointments from './RunningAppointments';
import * as appointmentDetailActions from '../../redux/appointmentList/actions';



const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentDetailActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        currentRunningAppointments: state.appointmentLists.currentRunningAppointments
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RunningAppointments);
