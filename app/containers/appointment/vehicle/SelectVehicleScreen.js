import React from 'react';
import { View, TouchableOpacity, Image, Alert } from 'react-native';
import Header from '../../header/Header';
import VehicleFlatList from './VehicleFlatList';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';


const backButton = require('../../../assets/icons/add_car_icon_onclick.png');

export default class SelectVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVehicle: ''
    };
  }

  componentWillMount() {
    if (!this.props.userVehicle.length) {
      this.props.fetchAuthVehicles();
    }
    this.props.setBackToInitialState();
    if (this.props.navigation.state.params === undefined) {
      this.props.setSelectedAppointmentToInitialState();
    }
  }

  getSelectedItems = () => {
    this.state.selectedVehicle !== '' ?
    this.props.navigation.navigate('serviceScreen')
    :
    Alert.alert(
      'Error',
      'Add Vehicle First ...',
      [
        { text: 'Ok', onPress: () => console.log('Cancel Button Pressed'), style: 'cancel' },
      ]
    );
  }
  
  _selectedVehicle = (vehicle) => {
    this.setState({ selectedVehicle: vehicle });
    this.props.selectedVehicle(vehicle);
  }

  render() {
    if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
      <View style={styles.container}>
        <Header 
            headerText={'Vehicle'} 
            navigation={this.props.navigation} 
            buttonType={'back'} 
            showRightIcon
            rightText={'Next'}
            onPress={() => this.getSelectedItems()}
        />
        <VehicleFlatList 
          userVehicles={this.props.userVehicle} 
          navigation={this.props.navigation} 
          selectedVehicle={this._selectedVehicle}
          navigation={this.props.navigation}
          rescheduling={this.props.navigation.state.params !== undefined ? true : false}
          rescheduleAppointment={this.props.selectedAppointment}
        />
        <View style={{ right: 25, bottom: 25, position: 'absolute' }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: '' })}>
            <Image source={backButton} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </View>
     
    );
  }
}

