import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../header/RegisterHeader';
import VehicleForm from './vehicleForm';
import CarPicture from './carPicture';
import styles from './styles';

export default class VehicleInformation extends React.Component {

  constructor(props) {
      super(props);
  }

  goToNext() {
    this.props.navigation.navigate('demo');
  }
  render() {
  const { container } = styles;

    return (
       <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <Header headerText={'Vehicle Information'} curre={1} navigation={this.props.navigation} />
          <View style={container}>
              <View style={styles.t1}>
                <CarPicture />
              </View> 
              <VehicleForm style={styles.t2} />
              <View style={[styles.nextButtonContainer, styles.t3]}>
                <View >
                  <TouchableOpacity
                    style={styles.nextButtonStyle}
                  >
                    <Text style={{ color: '#fff' }}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
          </View>
       </View>
        
    );
  }
}
