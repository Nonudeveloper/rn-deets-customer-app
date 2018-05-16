// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CreditCardForm from './CreditCardForm';

import * as appointmentActions from '../../../../redux/appointment/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        fetchingCardData: state.Appointment.fetchingCardData,
        errorMessage: state.Appointment.errorMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);

