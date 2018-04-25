// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DateTimeScreen from './DateTimeScreen';

import * as appointmentActions from '../../../redux/appointment/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(appointmentActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token,
        services: state.Service.services,
        technician: state.Service.technician
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DateTimeScreen);

