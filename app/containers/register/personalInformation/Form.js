import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { reduxForm, Field, formValues, change, untouch, initialize } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import CommonTextInput from '../../../components/form/Input';
import asyncValidate from './asyncValidate';

const info = (<Icon name="info-circle" size={18} color="#fff" />);
const clear = (<Icon name="times-circle" size={18} color="grey" />);

class FormArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            clearemailfield: false,
            clearmobilefield: false,
        };
    }

    serviceAddress = () => {
        this.props.navigation.navigate('serviceAddress');
    }

    clear(fieldName) {
        //dispath an action here and clear the respected field
        this.props.dispatch(change('signUp', fieldName, ''));
        this.props.dispatch(untouch('signUp', fieldName));
        if (fieldName === 'email') {
            this.setState({ clearemailfield: false });
        } else if (fieldName === 'mobile') {
             this.setState({ clearmobilefield: false });
        }
    }

    emailClear(value) {
        if (value) {
             this.setState({ clearemailfield: true });
        } else {
            this.setState({ clearemailfield: false });
        }
    }

    componentWillMount() {
        if (this.props.fbData !== null) {
            const fbUserData = JSON.parse(this.props.fbData.profile);
            const initialFormData = {
                fname: fbUserData.first_name,
                lname: fbUserData.last_name,
                flag: 1,
                fb_access_token: this.props.fbData.credentials.token,
                fb_id: fbUserData.id
                
        };
    
        this.props.dispatch(initialize('signUp', initialFormData));
        } else {
            const initialFormData = {
                flag: 3
            };
            this.props.dispatch(initialize('signUp', initialFormData));
        }
    }


    render() {
        const normalizePhone = value => {
                if (!value) {
                    this.setState({ clearmobilefield: false });
                    return value;
                }
                this.setState({ clearmobilefield: true });
                const onlyNums = value.replace(/[^\d]/g, '');
                if (onlyNums.length <= 3) {
                    return `(${onlyNums.slice(0, 3)}`;
                }
                if (onlyNums.length <= 6) {
                    return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3)}`;
                }
                return `(${onlyNums.slice(0, 3)}) ${onlyNums.slice(3, 6)} ${onlyNums.slice(6, 10)}`;
        };
        const phoneParser = (number) => number ? number.replace(/[^\d]/g, '') : '';
        
        return (
            <View style={styles.formArea}>
                {/* <Text style={styles.textStyle}>form component</Text> */}
                {/* <FormLabel>Name</FormLabel> */}

                <Field
                    name={'flag'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'fb_id'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'fb_access_token'}
                    component={CommonTextInput}
                    props={this.props}
                    type="hidden"
                />
                <Field
                    name={'fname'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'First Name'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                <Field
                    name={'lname'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'Last Name'}
                    placeholderTextColor='grey'
                    underlineColorAndroid="transparent"
                    type="text"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 6 }}>
                        <Field
                            name={'email'}
                            component={CommonTextInput}
                            props={this.props}
                            placeholder={'Email'}
                            placeholderTextColor='grey'
                            underlineColorAndroid="transparent"
                            type="email"
                            onChange={(value) => this.emailClear(value)}
                            borderBotmWidth={{ borderBottomWidth: 2 }}
                        /> 
                    </View>
                    <View style={styles.crossButtonContainer}>
                        <View style={{ flex: 1 }}>
                            {this.props.isFetching && <ActivityIndicator size="small" color="#00ff00" /> }
                        </View>
                         <View style={{ flex: 1 }}>
                             {this.state.clearemailfield && <TouchableOpacity onPress={() => this.clear('email')} >{clear}</TouchableOpacity> }
                        
                        </View>
                       
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 13 }}>
                        <Field
                            name={'mobile'}
                            component={CommonTextInput}
                            props={this.props}
                            placeholder={'Mobile'}
                            placeholderTextColor='grey'
                            underlineColorAndroid="transparent"
                            type="mobile"
                            normalize={normalizePhone}
                            parse={phoneParser}
                            borderBotmWidth={{ borderBottomWidth: 2 }}
                        />
                    </View>
                    <View style={styles.crossButtonContainer}>
                        <View style={{ flex: 4 }}>
                            {this.state.clearmobilefield && <TouchableOpacity onPress={() => this.clear('mobile')} >{clear}</TouchableOpacity> }
                        </View>
                    </View>
                </View>
                
                <Field
                    name={'password'}
                    component={CommonTextInput}
                    props={this.props}
                    placeholder={'Password'}
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
    form: 'signUp',
    destroyOnUnmount: false,
    keepDirtyOnReinitialize: true,
    validate: (values) => {
        const errors = {};
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        let isValidEmail = false;

        if (reg.test(values.email) !== false) {
            isValidEmail = true;
        }
          
        errors.fname = !values.fname
          ? 'First Name field is required'
          : undefined;

        errors.lname = !values.lname
          ? 'Last Name field is required'
          : undefined;

        errors.email = !values.email
          ? 'Email field is required'
          : !isValidEmail
          ? 'Email is not valid'
          : undefined;

        errors.mobile = !values.mobile
          ? 'Mobile field is required'
          : undefined;

        errors.password = !values.password
          ? 'Password field is required'
          : values.password.length < 8
          ? 'Password must be at least 8 characters long'
          : undefined;
          
        errors.confirmPassword = !values.confirmPassword
          ? 'Confirm Password field is required'
          : values.confirmPassword !== values.password
          ? 'Password and Confirmation Password do not match'
          : undefined;
          
        return errors;
    },
     asyncValidate,
     asyncBlurFields: ['email']
})(FormArea);
