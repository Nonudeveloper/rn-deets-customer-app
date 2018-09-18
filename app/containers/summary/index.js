// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SummaryScreen from './SummaryScreen';
import * as homeActions from '../../redux/home/homeActions';
import { loginThroughAccessToken } from '../../redux/auth/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
        loginThroughAccessToken: (deviceToken) => {
            dispatch(loginThroughAccessToken(deviceToken));
        },
    };
};

const mapStateToProps = (state) => {
    return {
        authUserWholeData: state.Auth.authUserWholeData,
        isFetching: state.home.tipProcess,
        tipMessage: state.home.tipMessage,
        deviceToken: state.Auth.deviceToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);

