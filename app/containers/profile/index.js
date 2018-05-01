// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DetailsScreen from './Details';

import * as homeActions from '../../redux/profile/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        authUser: state.Profile.authUser
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen);

