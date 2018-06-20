// @flow
// Container for Register Component
import { connect } from 'react-redux';
import PaymentInformation from './PaymentInformation';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../../redux/register/actions';



const mapDispatchToProps = (dispatch) => {
    console.log(registerActions);
    return {
        actions: bindActionCreators(registerActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
         form: state.form,
         vehicleImage: state.Vehicle.vehicleImage,
         image: state.Register.image,
         isFetching: state.Register.isFetching
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformation);
