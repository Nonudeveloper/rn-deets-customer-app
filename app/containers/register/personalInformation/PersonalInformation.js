import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../header/RegisterHeader';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';

const processOne = require('../../../assets/icons/process_selection_01.png');

export default class PersonalInformation extends Component {

  constructor(props) {
      super(props);
        // toDataUrl('https://lookaside.facebook.com/platform/profilepic/?asid=10210663114564932&height=50&width=50&ext=1523007763&hash=AeSavHT5oXVEMq4w', (myBase64) => {
        //   console.log(myBase64); // myBase64 is the base64 string
        // });
  }

  getImage(image) {
    this.props.actions.storeImage(image);
  }

  goToNext() {
      const errors = this.props.form.signUp.syncErrors;
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
      this.props.navigation.navigate('vehicleInformation');
     }
  }

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
    return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          bounces={false}
          keyboardShouldPersistTaps='always'
        >
        {this.props.emailAvailability.flag === 6 && this.renderAlert(this.props.emailAvailability.error)}
          <Header 
            headerText={'Personal Information'} 
            curre={0}
            navigation={this.props.navigation} 
            process={processOne}
          />
          <ProfilePic getImage={this.getImage.bind(this)} fbData={this.props.navigation.state.params ? JSON.parse(this.props.navigation.state.params.profile) : null} />
          <FormArea navigation={this.props.navigation} isFetching={this.props.isFetching} fbData={this.props.navigation.state.params ? this.props.navigation.state.params : null} deviceToken={this.props.deviceToken} />
          <View style={styles.nextButtonContainer}>
            <View style={{ marginHorizontal: 25 }}>
              <Button 
                style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                onPress={this.goToNext.bind(this)}
              >
                Next
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>
    );
  }
}
