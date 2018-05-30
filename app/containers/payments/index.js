// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymemtDetails from './PaymentDetails';

import * as appointmentActions from '../../redux/appointment/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        userCardDetails: state.Appointment.userCardDetails,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymemtDetails);
