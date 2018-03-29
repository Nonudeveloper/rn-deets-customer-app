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
  
  render() {
    
    return (
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          automaticallyAdjustContentInsets={false}
          bounces={false}
          keyboardShouldPersistTaps='always'
        >
          <Header 
            headerText={'Personal Information'} 
            curre={0}
            navigation={this.props.navigation} 
            process={processOne}
          />
          <ProfilePic />
          <FormArea navigation={this.props.navigation} isFetching={this.props.isFetching} emailAvailability={this.props.emailAvailability} />
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
