import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import Header from '../../header/Header';
import VehicleFlatList from './VehicleFlatList';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';


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
    if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
      <View style={styles.container}>
        <Header 
            headerText={'Select Vehicle'} 
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
        />
        <View style={styles.nextButtonContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'flex-end', }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: '' })}>
                <Image source={backButton} style={{ width: 30, height: 30 }} />
              </TouchableOpacity>
            </View>
        </View>
      </View>
     
    );
  }
}

