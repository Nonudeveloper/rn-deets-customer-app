import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';
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
            onPress={() => this.getSelectedItems()}
            // rightImageSource={backButton}
            // rightIconType={'image'}
        />
        <VehicleFlatList 
          userVehicles={this.props.userVehicle} 
          navigation={this.props.navigation} 
          selectedVehicle={this._selectedVehicle}
          navigation={this.props.navigation}
        />
        <View style={styles.nextButtonContainer}>
            <View style={{ flexDirection: 'row', marginHorizontal: 25, justifyContent: 'flex-end', }}>
              {/* <Button 
                style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                onPress={this.getSelectedItems}
              >
                Next
              </Button> */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: '' })}>
                <Image source={backButton} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
            </View>
          </View>
          </View>
     
    );
  }
}

