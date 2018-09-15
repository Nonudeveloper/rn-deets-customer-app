import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { reduxForm, Field, formValues, change, untouch, initialize } from 'redux-form';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import CommonTextInput from '../../deetscomponents/form/Input';
import { connect } from 'react-redux';

const clear = (<Icon name="times-circle" size={18} color="grey" />);


class FormArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            clearemailfield: false,
            clearmobilefield: false,
        };
        this.fname = null;
        this.lname = null;
        this.email = null;
        this.mobile = null;
    }


    componentDidMount() {
        this.props.onRef(this);
        
        if (Object.keys(this.props.authUser).length !== 0) {
            const user = this.props.authUser;
            const initialFormData = {
                fname: user.first_name,
                lname: user.last_name,
                mobile: user.mobile,
                email: user.email,
                access_token: user.access_token
            };
            this.props.dispatch(initialize('profileDetails', initialFormData));
        }
    }

    clear(fieldName) {
        //dispath an action here and clear the respected field
        this.props.dispatch(change('profileDetails', fieldName, ''));
        this.props.dispatch(untouch('profileDetails', fieldName));
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

    blurAll = () => {
        this.fname.getRenderedComponent().refs.fname.blur();
        this.lname.getRenderedComponent().refs.lname.blur();
        this.email.getRenderedComponent().refs.email.blur();
        this.mobile.getRenderedComponent().refs.mobile.blur();
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
        const phoneParser = n => n ? n.replace(/[^\d]/g, '') : '';
        
        return (
            <View style={styles.formArea}>
                <Field
                    name={'access_token'}
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
                    refField="fname"
                    borderBotmWidth={{ borderBottomWidth: 2 }}
                    editable={this.props.formEditable}
                    ref={ref => this.fname = ref} 
                    withRef
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
                    editable={this.props.formEditable}
                    refField="lname"
                    ref={ref => this.lname = ref}
                    withRef
                />
                <View style={{ flexDirection: 'row' }}>
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
                            editable={false}
                            refField="email"
                            ref={ref => this.email = ref}
                            withRef
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
                <View style={{ flexDirection: 'row' }}>
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
                            editable={this.props.formEditable}
                            refField="mobile"
                            ref={ref => this.mobile = ref}
                            withRef
                        />
                    </View>
                    <View style={styles.crossButtonContainerMobile}>
                        <View style={{ flex: 4 }}>
                            {this.state.clearmobilefield && <TouchableOpacity onPress={() => this.clear('mobile')} >{clear}</TouchableOpacity> }
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default reduxForm({ 
    form: 'profileDetails',
    keepDirtyOnReinitialize: true,
    enableReinitialize: true,
    validate: (values, props) => {
        if (!props.formEditable) {
            return null;
        }
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
          
        return errors;
    }
})(FormArea);
