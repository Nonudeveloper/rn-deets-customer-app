// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymemtDetails from './PaymentDetails';

import * as appointmentActions from '../../redux/appointment/actions';
import { getBrainTreeClientToken, createBrainTreeClientToken } from '../../redux/register/startActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
        getBrainTreeClientToken: () => {
            dispatch(getBrainTreeClientToken());
        },
        createBrainTreeClientToken: (customerId) => {
            dispatch(createBrainTreeClientToken(customerId));
        }
    };
};

const mapStateToProps = (state) => {
    return {
        userCardDetails: state.Appointment.userCardDetails,
        clientToken: state.Start.clientToken,
        userDeatail: state.Profile.authUser,
        fetchingCardData: state.Appointment.fetchingCardData,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymemtDetails);
