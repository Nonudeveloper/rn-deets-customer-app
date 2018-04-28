// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReviewScreen from './ReviewScreen';

import * as appointmentActions from '../../../redux/appointment/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        selectedSchedule: state.Appointment.selectedSchedule,
        notes: state.form.notes.values,
        selectedServices: state.Service.selectedServices,
        userCardDetails: state.Appointment.userCardDetails,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewScreen);

