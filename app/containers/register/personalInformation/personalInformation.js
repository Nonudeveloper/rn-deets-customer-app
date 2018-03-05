import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../header/registerHeader';
import ProfilePic from './profilePic';
import FormArea from './form';
import styles from './styles';


export default class PersonalInformation extends Component {

  constructor(props) {
      super(props);
  }

  goToNext() {
    console.log('Hold on Going to next page/screen!');
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
          <Header headerText={'Personal Information'} curre={0} navigation={this.props.navigation} />
          <ProfilePic />
          <FormArea navigation={this.props.navigation} />
          <View style={styles.nextButtonContainer}>
            <View style={{ marginHorizontal: 25 }}>
              <TouchableOpacity
                style={styles.nextButtonStyle}
                onPress={this.goToNext.bind(this)}
              >
                <Text style={{ color: '#fff' }}>Next</Text>
              </TouchableOpacity>
              {/* <Button /> */}
            </View>
          </View>
        </KeyboardAwareScrollView>
    );
  }
}
