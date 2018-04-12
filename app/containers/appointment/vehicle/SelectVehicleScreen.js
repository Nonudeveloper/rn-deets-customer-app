import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Header from '../../header/Header';
import VehicleFlatList from './VehicleFlatList';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';


const backButton = require('../../../assets/icons/add_car_icon_onclick.png');


class SelectVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
    selectedArrayRef = new SelectedArray(); 
  }

  componentWillMount() {
    this.props.fetchAuthVehicles();
    this.props.setBackToInitialState();
  }

  getSelectedItems = () => {
    if (selectedArrayRef.getArray().length === 0) {
      alert('No Item(s) Selected!');
    } else {
      console.log(selectedArrayRef.getArray());
      // this.props.navigation.navigate('serviceScreen');
    }    
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
        <VehicleFlatList userVehicles={this.props.userVehicle} navigation={this.props.navigation} selectedArrayRef={selectedArrayRef}/>
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

class SelectedArray {
  constructor() {
      selectedItemsArray = [];
  }

  setItem(option) {
      selectedItemsArray.push(option);
  }

  getArray() {
      return selectedItemsArray;
  }
}


export default SelectVehicleScreen;
