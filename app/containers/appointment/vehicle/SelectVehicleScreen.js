import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../header/Header';
import VehicleFlatList from './VehicleFlatList';
import Loader from '../../../deetscomponents/Loader';

const backButton = require('../../../assets/icons/add_car_icon_onclick.png');

export default class SelectVehicleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

 componentWillMount() {
  this.props.fetchAuthVehicles();
 }

  render() {
    console.log(this.props);
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
            onPress={() => this.props.navigation.navigate('AddEditVehicle')}
            rightImageSource={backButton}
            rightIconType={'image'}
        />
        <VehicleFlatList userVehicles={this.props.userVehicle} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { height: -5, width: -5 },
    shadowRadius: 10,
    backgroundColor: '#f9f9f9',
},
navBar: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
},
vehicleContainer: {
  height: 100, 
  backgroundColor: 'white',
  borderBottomWidth: 2, 
  borderBottomColor: '#e0e0e0', 
  borderTopWidth: 2, 
  borderTopColor: '#e0e0e0',
  flexDirection: 'row',
  alignItems: 'center',
  // top: 10
},
radioButtonContainer: {
  paddingLeft: 30, 
  paddingRight: 30
},
vehicleInnerContainer: {
  flex: 1, 
  width: 300, 
  flexDirection: 'row',
}
});
