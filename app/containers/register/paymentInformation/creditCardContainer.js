import { connect } from 'react-redux';
import CreditCardForm from './CreditCardForm';
import { bindActionCreators } from 'redux';
import * as registerActions from '../../../redux/register/actions';



const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(registerActions, dispatch)
    };
};

const mapStateToProps = (state) => {
    return {
         form: state.form,
         vehicleImage: state.Vehicle.vehicleImage,
         image: state.Register.image
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCardForm);