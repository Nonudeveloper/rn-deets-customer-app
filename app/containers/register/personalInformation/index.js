// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonalInformation from './personalInformation';

// import * as loginActions from '../../redux/auth/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(loginActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        // user: state.Auth.user
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInformation);

