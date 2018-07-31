// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreditCardForm from './CreditCardForm';

import * as appointmentActions from '../../../../redux/appointment/actions';
import { getBrainTreeClientToken } from '../../../../redux/register/startActions';


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
        fetchingCardData: state.Appointment.fetchingCardData,
        errorMessage: state.Appointment.errorMessage,
        clientToken: state.Start.clientToken
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

