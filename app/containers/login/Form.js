import React from 'react';
import { StyleSheet, View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import CommonTextInput from '../../deetscomponents/form/Input';

class FormArea extends React.Component {

    constructor(props) {
        super(props);
    }

    serviceAddress = () => {
        this.props.navigation.navigate('serviceAddress');
    }

  render() {
    const formStates = ['asyncValidating', 'dirty', 'pristine', 'valid', 'invalid', 'submitting',
    'submitSucceeded', 'submitFailed'];

    return (
        <View style={styles.formArea} keyboardShouldPersistTaps={'handled'}>
            <Field
                name={'email'}
                component={CommonTextInput}
                props={this.props}
                placeholder={'Email'}
                placeholderTextColor='grey'
                underlineColorAndroid="transparent"
                type="email"
                borderBotmWidth={{borderBottomWidth: 2}}
            />

            <Field
                name={'password'}
                component={CommonTextInput}
                props={this.props}
                placeholder={'Password'}
                placeholderTextColor='grey'
                underlineColorAndroid="transparent"
                type="password"
            />
            
        </View>
    );
  }
}

export default reduxForm({ 
    form: 'signIn',
    validate: (values) => {
        const errors = {};
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValidEmail = false;
        if (reg.test(values.email) !== false) {
            isValidEmail = true;
        }
        errors.email = !values.email
          ? 'Email field is required'
          : !isValidEmail
          ? 'Email is not valid'
          : undefined;
    
        errors.password = !values.password
          ? 'Password field is required'
          : values.password.length < 8
          ? 'Password must be at least 8 characters long'
          : undefined;
    
        return errors;
    }
})(FormArea);

const styles = StyleSheet.create({
    formArea: {
        backgroundColor: '#333333',
    },
    textStyle: {
        color: '#fff'
    },
    
});
