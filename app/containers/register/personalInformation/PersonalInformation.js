import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../header/RegisterHeader';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';

const processOne = require('../../../assets/icons/process_selection_01.png');

export default class PersonalInformation extends Component {

  constructor(props) {
      super(props);
  }

  goToNext() {
    //   const errors = this.props.form.signUp.syncErrors;
    //   let errorCount = 0;
    //   for (const error in errors) {
    //     if (errors[error] !== undefined && errorCount === 0) {
    //       Alert.alert(
    //         'Error',
    //         errors[error],
    //         [
    //           { text: 'OK', onPress: () => console.log('OK Pressed') },
    //         ],
    //         { cancelable: false }
    //       );
    //       errorCount++;
    //     }
    //  }
    //  if (errorCount === 0) {
    //   this.props.navigation.navigate('vehicleInformation');
    //  }
    this.props.navigation.navigate('vehicleInformation');
  }

  getImage(image) {
    this.props.actions.storeImage(image);
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
    console.log(this.props);
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
          <FormArea navigation={this.props.navigation} isFetching={this.props.isFetching} fbData={this.props.navigation.state.params ? this.props.navigation.state.params : null} />
          <View style={styles.nextButtonContainer}>
            <View style={{ marginHorizontal: 25 }}>
              <TouchableOpacity
                style={styles.nextButtonStyle}
                onPress={this.goToNext.bind(this)}
              >
                <Text style={{ color: '#fff' }}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
    );
  }
}
