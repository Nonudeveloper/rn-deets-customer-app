// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SuggestionsScreen from './SuggestionsScreen';
import * as appointmentDetailActions from '../../../redux/appointmentList/actions';



const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentDetailActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
        currentRunningAppointments: state.appointmentLists.currentRunningAppointments,
        isFetching: state.appointmentLists.isFetching,
        serviceRequestMessage: state.appointmentLists.serviceRequestMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SuggestionsScreen);
