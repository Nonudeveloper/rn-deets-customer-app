// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymemtDetails from './PaymentDetails';

import * as appointmentActions from '../../redux/appointment/actions';
import { getBrainTreeClientToken } from '../../redux/register/startActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
        getBrainTreeClientToken: () => {
            dispatch(getBrainTreeClientToken());
        }
    };
};

const mapStateToProps = (state) => {
    return {
        userCardDetails: state.Appointment.userCardDetails,
        clientToken: state.Start.clientToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymemtDetails);
