import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    Text,
    Alert
} from 'react-native';
import Header from '../../header/Header';
import Form from '../../login/forgotPassword/form';
import styles from './styles.js';
import Loader from '../../../components/Loader';

export default class ForgotPasswordScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
        this.renderAlert = this.renderAlert.bind(this);
    }

    sendEmail = () => {
        const errors = this.props.form.forgetPassword.syncErrors;
        let errorCount = 0;
        for (const error in errors) {
            if (errors[error] !== undefined && errorCount === 0) {
                Alert.alert(
                    'Error',
                    errors[error],
                    [
                        { text: 'OK', onPress: () => console.log('OK Pressed') },
                    ],
                    { cancelable: false }
                );
                errorCount++;
            }
        }
        if (errorCount === 0) {
            this.setState(() => {
                return {
                    email: this.props.form.forgetPassword.values.email
                };
            }, () => {
                this.props.actions.forgotPasswordRequest(this.state);
            });
        }
    }

    renderAlert(msg) {
        const isError = !this.props.resetSuccessLog;
        Alert.alert(
            this.props.resetSuccessLog ? 'Success' : 'Error',
            msg,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        //dispath an action to make showAlert false
                        this.props.actions.hideResetAlert();
                        if (!isError) {
                            this.props.navigation.goBack();
                        }
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { isLoading } = this.props;
        return (
            <View>
                {/* <Loader
                    loading={false}
                /> */}
                {this.props.showResetAlert && this.props.resetErrorLog && this.renderAlert(this.props.resetErrorLog)}
                {this.props.showResetAlert && this.props.resetSuccessLog && this.renderAlert(this.props.resetSuccessLog)}
                <Header headerText={'Forgot Password'} navigation={this.props.navigation} />
                <Form style={styles.forgetForm} />
                <View style={styles.nextButtonContainer}>
                    <View style={{ marginHorizontal: 25 }}>
                        <TouchableOpacity
                            style={styles.nextButtonStyle}
                            onPress={this.sendEmail}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 18,
                                    fontWeight: 'bold'
                                }}
                            >Send password reset link</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}
