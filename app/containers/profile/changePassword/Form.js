import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import styles from './styles';
import CommonTextInput from '../../../deetscomponents/form/Input';

class FormArea extends React.Component {

    constructor(props) {
        super(props);
    }



    render() {
        return (
            <View style={styles.formArea}>
                <Field
                    name={'current_password'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'Current Password'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="password"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                <Field
                    name={'new_password'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'New Password'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="password"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                <Field
                    name={'confirmPassword'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'Confirm Password'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="password"
                />
            </View>
        );
    }
}
export default reduxForm({ 
    form: 'changePassword',
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: true,
    validate: (values) => {
        const errors = {};
          
        errors.current_password = !values.current_password
          ? 'Current Password field is required'
          : undefined;

        errors.new_password = !values.new_password
          ? 'New Password field is required'
          : values.new_password.length < 8
          ? 'New Password must be at least 8 characters long'
          : undefined;
          
        errors.confirmPassword = !values.confirmPassword
          ? 'Confirm Password field is required'
          : values.confirmPassword !== values.new_password
          ? 'New Password and Confirmation Password do not match'
          : undefined;
          
        return errors;
    }
})(FormArea);
