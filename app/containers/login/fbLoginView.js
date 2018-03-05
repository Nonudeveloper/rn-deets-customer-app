import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import styles from './loginScreen.style';
import {FBLoginManager} from 'react-native-facebook-login';

const Icon = require('react-native-vector-icons/FontAwesome');

/**
  Example FBLoginView class
  Please note:
  - this is not meant to be a full example but highlights what you have access to
  - If you use a touchable component, you will need to set the onPress event like below
**/
class FBLoginView extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }

    onPress()
    {
      FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
        if (!error) {
          console.log("Login data: ", data);
        } else {
          console.log("Error: ", error);
        }
      })
    }

    render() {
        return ( 
          <View style={styles.fbButtonContainer} style={{ marginHorizontal: 25 }}>
            <TouchableHighlight
              style={styles.fbButtonStyle}
              onPress={this.onPress}
            >
              <Text style = {{color: '#fff', fontSize:16}}>
                Login with Facebook
              </Text>
                   
            </TouchableHighlight>
        </View>
      );
    }
}
module.exports = FBLoginView;