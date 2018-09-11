// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChangePasswordScreen from './ChangePasswordScreen';

import * as profileActions from '../../../redux/profile/actions';


const mapDispatchToProps = (dispatch) => ({
        actions: bindActionCreators(profileActions, dispatch),
    });

const mapStateToProps = (state) => ({
        isFetching: state.Profile.isFetching,
        form: state.form,
        passwordConfirmation: state.Profile.passwordConfirmation
    });

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);

