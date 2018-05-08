// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsScreen from './Details';

import * as profileActions from '../../redux/profile/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(profileActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        authUser: state.Profile.authUser,
        isFetching: state.Profile.isFetching,
        form: state.form,
        errorMessage: state.Profile.errorMessage,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);

