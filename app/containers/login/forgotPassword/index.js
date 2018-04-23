// @flow
// Container for Forgot password Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import * as loginActions from '../../../redux/auth/actions';

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(loginActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        successLog: state.Auth.successLog,
        form: state.form,
        errorMessage: state.Auth.errorMessage,
        showResetAlert: state.Auth.showResetAlert,
        resetSuccessLog: state.Auth.resetSuccessLog,
        resetErrorLog: state.Auth.resetErrorLog,
        isLoading: state.Auth.isLoading
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);

