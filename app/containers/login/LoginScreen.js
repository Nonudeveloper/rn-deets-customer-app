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
import DeetsFacebook from '../../components/facebook';
import Hr from '../../components/hr';
import Loader from '../../components/Loader';


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
    console.log('here');
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
        Alert.alert(
          'Error',
          errors[error],
          [
            // { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
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
            email: this.props.form.signIn.values.email,
            password: this.props.form.signIn.values.password,
            flag: 3,
          };
      }, () => {
          this.props.actions.loginRequest(this.state);
      });
    }
  }

  fbLogin = (e) => {
    this.setState(() => {
      return {
        flag: 1,
        fb_id: e.credentials.userId,
        access_token: e.credentials.token,
      };
    }, () => {
      this.props.actions.loginRequest(this.state);
    });
  };

  renderAlert(error) {
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
            <TouchableOpacity
                style={styles.nextButtonStyle}
                onPress={this._loginEmail}
            >
            <Text 
                style={{ 
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: 'bold'
                }}
            >Login</Text>
            </TouchableOpacity>
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
