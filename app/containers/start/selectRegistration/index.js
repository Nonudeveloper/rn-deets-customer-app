// @flow
// Container for Register Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SelectRegisteration from './SelectRegisteration';
import * as registerActions from '../../../redux/register/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(registerActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: state.Register.isFetching,
        deviceToken: state.Auth.deviceToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectRegisteration);

