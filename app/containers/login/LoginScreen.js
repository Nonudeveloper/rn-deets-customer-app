import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Alert
} from 'react-native';
import Header from '../header/Header';
import Form from '../login/Form';
import styles from './loginScreen.style';
import DeetsFacebook from '../../deetscomponents/facebook';
import Hr from '../../deetscomponents/hr';
import Loader from '../../deetscomponents/Loader';
import Button from '../../deetscomponents/Button';
import Instabug from 'instabug-reactnative';

export default class LoginScreen extends Component {

  constructor(props) {
          super(props);
          this.state = {
            email: '',
            password: '',
            flag: null,
            fb_id: null,
            access_token: null,
            device_token: 'erwerwegdfgdfgdfg' //need to replace this with real device token
          };
  }

  forgotPassword = () => {
      this.props.navigation.navigate('forgotPasswordScreen');
  }



  componentDidUpdate() {
    console.log('componentDidUpdate ');
  }

  _loginEmail = () => {
    if (this.props.errorMessage) {
      Alert.alert(
        'Error',
        'Invalid Credentials',
        [
         { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
      );
    }
    const errors = this.props.form.signIn.syncErrors;
    let errorCount = 0;
    for (const error in errors) {
      if (errors[error] !== undefined && errorCount === 0) {
        setTimeout( () => {
          Alert.alert(
            'Error',
            errors[error],
            [
              // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
          );
        }, 500);
        errorCount++;
      }
    }
    if (errorCount === 0) {
      const device_token = this.props.deviceToken.token ? this.props.deviceToken.token : 'devicetoken';
      const user_type = this.props.deviceToken.token ? this.props.deviceToken.os === 'android' ? 2 : 1 : '';
      this.setState(() => {
          return {
            email: this.props.form.signIn.values.email,
            password: this.props.form.signIn.values.password,
            flag: 3,
            device_token,
            user_type
          };
      }, () => {
          this.props.actions.loginRequest(this.state);
      });
    }
  }

  fbLogin = (e) => {
    const device_token = this.props.deviceToken.token ? this.props.deviceToken.token : 'devicetoken';
    const user_type = this.props.deviceToken.token ? this.props.deviceToken.os === 'android' ? 2 : 1 : '';
    this.setState(() => {
      return {
        flag: 1,
        fb_id: e.credentials.userId,
        access_token: e.credentials.token,
        device_token,
        user_type
      };
    }, () => {
      this.props.actions.loginRequest(this.state);
    });
  };

  renderAlert(error) {
    
    if (this.props.isBlocked) {
      this.renderBlockAlert();
      return;
    }

    setTimeout( () => {
      Alert.alert(
        'Error',
        error,
        [
          { 
            text: 'OK', 
            onPress: () => {
              //dispath an action to make showAlert false
              this.props.actions.hideAlert();
            } 
          },
        ],
        { cancelable: false }
      );
      }, 500 );
  }

  renderBlockAlert(error) {
    setTimeout( () => {
      Alert.alert(
        'Alert',
        'Your profile has been blocked , Please contact Admin',
        [
          { 
            text: 'Contact Us', 
            onPress: () => {
              //dispath an action to make showAlert false
              this.props.actions.hideAlert();
              Instabug.invoke();
            } 
          },
          { 
            text: 'OK', 
            onPress: () => {
              //dispath an action to make showAlert false
              this.props.actions.hideAlert();
            } 
          },
        ],
        { cancelable: false }
      );
      }, 500 );
  }

  render() {
    const { isLoading } = this.props;
    return (
      <View style={styles.container}>
        <Loader
            loading={isLoading} 
        />
        {this.props.showAlert && this.renderAlert(this.props.errorMessage)}
        <Header headerText={''} navigation={this.props.navigation} />
        
        <DeetsFacebook title="Login with Facebook" fbLogin={this.fbLogin} />
       
        <Hr color="black" width={2} marginleft={25} marginright={25}>
          <Text style={styles.textWithDivider}>OR{this.props.isAuthenticated}</Text>
        </Hr>

        <Form />
        
        <View style={styles.nextButtonContainer}>
            <View style={{ marginHorizontal: 25 }}>
            <Button 
                style={styles.nextButtonStyle}
                buttonTextStyle={styles.buttonStyle}
                onPress={this._loginEmail}
            >
                Login
            </Button>
            </View>
            <View
                style={styles.forgotPasswordView}
            >
            <TouchableOpacity
                onPress={this.forgotPassword}
            >
            <Text 
                style={styles.forgotPasswordText}
            >Forgot Password?</Text>
            </TouchableOpacity>
            </View>
        </View>
        
      </View>
    );
  }
}
