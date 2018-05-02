// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePasswordScreen from './ChangePasswordScreen';

import * as profileActions from '../../../redux/profile/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(profileActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Profile.isFetching,
        form: state.form,
        passwordConfirmation: state.Profile.passwordConfirmation
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);

