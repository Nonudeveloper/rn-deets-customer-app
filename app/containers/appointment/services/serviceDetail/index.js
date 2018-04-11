// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ServiceScreen from './ServiceDetailScreen';

import * as serviceActions from '../../../../redux/service/serviceActions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(serviceActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        token: state.Auth.token
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceScreen);

