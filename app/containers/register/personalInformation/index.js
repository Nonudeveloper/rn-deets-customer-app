// @flow
// Container for Login Component
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PersonalInformation from './PersonalInformation';
import * as PersonalInformationActions from '../../../redux/register/actions';


class PI extends Component {

    render() {
       const { form, isFetching, emailAvailability, actions, navigation, deviceToken } = this.props;
 
       return (
            <PersonalInformation 
                form={form} 
                isFetching={isFetching} 
                emailAvailability={emailAvailability} 
                actions={actions}
                navigation={navigation}  
                testProps={'testing'}
                deviceToken={deviceToken}
            />
       );
    }
 
 }
 

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(PersonalInformationActions, dispatch),
    };
};

const mapStateToProps = (state) => {
    return {
        form: state.form,
        isFetching: state.Register.isFetching,
        emailAvailability: state.Register.emailAvailability,
        deviceToken: state.Auth.deviceToken,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PI);

