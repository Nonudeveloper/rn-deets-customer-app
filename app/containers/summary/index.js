// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SummaryScreen from './SummaryScreen';
import * as homeActions from '../../redux/home/homeActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(homeActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        authUserWholeData: state.Auth.authUserWholeData,
        isFatching: state.home.tipProcess,
        tipMessage: state.home.tipMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);

