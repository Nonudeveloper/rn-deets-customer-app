// @flow
// Container for Register Component
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import SummaryScreen from './SummaryScreen';


const mapDispatchToProps = (dispatch) => {
    return {
        // actions: bindActionCreators(registerActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        authUserWholeData: state.Auth.authUserWholeData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryScreen);

