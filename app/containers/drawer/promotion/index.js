// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PromotionCodeScreen from './PromotionCodeScreen';



const mapDispatchToProps = (dispatch) => {
    return {
    };
};

const mapStateToProps = (state) => {
    return {
        forms: state.form
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionCodeScreen);
