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
                      <Checkbox 
                        size={30} 
                        keyValue={item.vehicle_id} 
                        selectedArrayObject={this.props.selectedArrayRef} 
                        checked 
                        color='#636c72' 
                        label={item} 
                      />
                  </View>
                  <View style={styles.vehicleInnerContainer}>
                    <View style={{ flex: 1 }}>
                      <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.vehicleFont}>{item.vehicle_make}</Text>
                      <Text style={styles.vehicleFont}>{item.vehicle_year}, {item.vehicle_color}</Text>
                      <Text style={styles.licenceFont}>HSHSB</Text>
                    </View>
                  </View>
                  <View style={{ right: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: item })} >
                        <Image 
                          source={editButton} 
                          style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>}
            keyExtractor={(item, index) => index.toString()}
        />
       
    );
  }
}
 