// @flow
// Container for Login Component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PaymentInformation from './PaymentInformation';
import * as PaymentInformationActions from '../../../redux/register/actions';


class PaymentInformationContainer extends Component {

    render() {
       return (
            <PaymentInformation />
       );
    }
 
 }
 

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(PaymentInformationActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        isFetching: 'false',
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentInformationContainer);

