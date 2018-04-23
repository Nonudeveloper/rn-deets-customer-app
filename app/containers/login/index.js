// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginScreen from './LoginScreen';

import * as loginActions from '../../redux/auth/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(loginActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        user: state.Auth.user,
        form: state.form,
        errorMessage: state.Auth.errorMessage,
        showAlert: state.Auth.showAlert,
        isLoading: state.Auth.isLoading,
        isAuthenticated: state.Auth.isAuthenticated
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

