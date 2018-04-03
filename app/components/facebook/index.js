import React, { Component } from 'react';
import { View, Text, TouchableHighlight , Image } from 'react-native';
import styles from './style.js';
import { FBLoginManager } from 'react-native-facebook-login';
import Icon from 'react-native-vector-icons/FontAwesome';
import Button from '../Button';


const buttonIcon = require('../../assets/icons/facebook_icon.png');

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/

class FBLoginView extends Component {
    constructor(props) {
        super(props);
    }

    onPress() {
      const props = this.props;
      FBLoginManager.loginWithPermissions(['email', 'user_friends'], (error, data) => {
        if (!error) {
          console.log("Login data: ", data);
          if (props.title === 'Login with Facebook') {
              props.fbLogin(data);
          } else {
             props.navigation.navigate('personalInformation', data);
          }
        } else {
          console.log("Error: ", error);
        }
      });
    }

    render() {
        return ( 
            <Button 
              style={styles.fbButtonStyle}
              buttonTextStyle={styles.buttonStyle}
              source={buttonIcon}
              onPress={this.onPress.bind(this)}
            >
              {this.props.title}
            </Button>
      );
    }
}
module.exports = FBLoginView;