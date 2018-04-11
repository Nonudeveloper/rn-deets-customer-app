import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const info = (<Icon name="info-circle" size={20} color="green" />);

const vehicleIcon = require('../../../assets/icons/car_place_holder.png');
const editButton = require('../../../assets/icons/edit_btn.png');

export default class VehicleFlatList extends React.Component {
    constructor(props) {
          super(props);
    }
    
    FlatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#607D8B',
            }}
          />
        );
      }
    
  render() {
      console.log(this.props)
    return (
        <FlatList
            data={this.props.userVehicles}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({item}) => 
                <View style={styles.vehicleContainer}>
                  <View style={styles.radioButtonContainer}>
                    <TouchableOpacity onPress={() => this.serviceAddress()} >{info}</TouchableOpacity>
                  </View>
                  <View style={styles.vehicleInnerContainer}>
                    <View style={{ flex: 1 }}>
                      <Image source={vehicleIcon} style={{ width: 85, height: 85, borderRadius: 20 }} />
                    </View>
                    <View style={{ flex: 2, paddingTop: 10, paddingLeft: 10 }}>
                      <Text style={{ fontSize: 16, color: '#586069' }}>{item.vehicle_make}</Text>
                      <Text style={{ fontSize: 16, color: '#586069' }}>{item.vehicle_year}, {item.vehicle_color}</Text>
                      <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>Profile</Text>
                    </View>
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', item)} >
                        <Image 
                        source={editButton} 
                        style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>}
        />
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
