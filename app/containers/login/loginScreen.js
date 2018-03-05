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
import FBLoginView from './fbLoginView';
import Hr from '../../components/hr';

export default class LoginScreen extends Component {
  constructor(props) {
          super(props);
          
          this.state = {
            email: '',
            password: '',
            flag: null,
            fb_id: null,
            access_token: null,
          };
  }

  _loginEmail = () => {
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
            email: 'Aishwarya.garg@yopmail.com',
            password: 'admin123',
            flag: 3
          };
      }, () => {
          this.props.actions.loginRequest(this.state);
      });
    }
  }

  _fbAuth = (e) => {
    this.setState(() => {
      return {
        flag: 1,
        fb_id: e.credentials.userId,
        access_token: e.credentials.token,
        //  fb_id: e.credentials.userId,
        // access_token: e.credentials.token,
      };
    }, () => {
      this.props.actions.loginRequest(this.state);
    });
  };

  render() {
    const { email, password } = this.state;
    const { user } = this.props;
    console.log(this.state);

    return (
      <View style={styles.container}>
        <Header headerText={''} navigation={this.props.navigation} />
        
        <FBLoginView />
       
        <Hr color="black" width={2} marginleft={25} marginright={25}>
          <Text style={styles.textWithDivider}>OR</Text>
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
                  fontSize: 16
                }}>Login</Text>
            </TouchableOpacity>
            {/* <Button /> */}
            </View>
        </View>
        
      </View>
    );
  }
}
