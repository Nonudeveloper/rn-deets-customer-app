// @flow
// Container for Login Component
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PromotionCodeScreen from './PromotionCodeScreen';
import * as promoCodeActions from '../../../redux/promotionCode/actions';


const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(promoCodeActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        forms: state.form,
        promotionCode: state.PromotionCode.promotionCode,
        isFetching: state.PromotionCode.isFetching,
        errorMessage: state.PromotionCode.errorMessage,
        successMessage: state.PromotionCode.successMessage
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PromotionCodeScreen);
