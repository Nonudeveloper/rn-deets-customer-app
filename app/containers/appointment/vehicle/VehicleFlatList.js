import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Checkbox from '../../../components/appointment/Checkbox';
import styles from './styles';


const vehicleIcon = require('../../../assets/icons/car_place_holder.png');
const editButton = require('../../../assets/icons/edit_btn.png');

export default class VehicleFlatList extends React.Component {
    
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
    return (
   
        <FlatList
            data={this.props.userVehicles}
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => 
                <View style={styles.vehicleContainer}>
                  <View style={styles.radioButtonContainer}>
                  <Checkbox size={30} keyValue={item.vehicle_id} selectedArrayObject={this.props.selectedArrayRef} checked={true} color='#636c72' label={item} />
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
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: item })} >
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
 