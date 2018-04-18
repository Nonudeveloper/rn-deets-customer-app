import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Header from '../../header/Header';
import VehicleFlatList from './VehicleFlatList';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';


const backButton = require('../../../assets/icons/add_car_icon_onclick.png');


export default class SelectVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchAuthVehicles();
    this.props.setBackToInitialState();
  }

  getSelectedItems = () => {
    this.props.navigation.navigate('serviceScreen');  
  }
  
  _selectedVehicle = (vehicle) => {
    this.props.selectedVehicle(vehicle);
  }

  render() {
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
      <Loader
                loading={isFetching} 
      />
        <Header 
            headerText={'Select Vehicle'} 
            navigation={this.props.navigation} 
            buttonType={'back'} 
            // titleType={'logo'}
            showRightIcon
            rightText={'Next'}
            onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: '' })}
            rightImageSource={backButton}
            rightIconType={'image'}
        />
        <VehicleFlatList 
          userVehicles={this.props.userVehicle} 
          navigation={this.props.navigation} 
          selectedVehicle={this._selectedVehicle}
        />
        <View style={styles.nextButtonContainer}>
            <View style={{ marginHorizontal: 25 }}>
              <Button 
                style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                onPress={this.getSelectedItems}
              >
                Next
              </Button>
            </View>
          </View>
          </View>
     
    );
  }
}

