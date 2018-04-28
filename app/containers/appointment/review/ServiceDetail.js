import React from 'react';
import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';

const car = require('../../../assets/icons/car_place_holder.png');
const ratingStartActive = require('../../../assets/icons/rate_star_active.png');
const ratingStartInactive = require('../../../assets/icons/rate_star_inactive.png');
const directionOff = require('../../../assets/icons/direction_off.png');

export default class ServiceDetail extends React.Component {

  render() {
      console.log(this.props)
      const vehicleInfo = this.props.selectedServices.vehicleSelected;
    return (
        <View style={styles.container}>
        {/* <Text>Service Provider Details</Text> */}
            <View 
                style={{ 
                    flex: 1, 
                    backgroundColor: '#fff', 
                    marginBottom: 15,
                    borderTopColor: '#000',
                    borderTopWidth: 1,
                    borderBottomColor: '#000',
                    borderBottomWidth: 1,

                }}
            >
                <View style={{ flex: 1.5, flexDirection: 'row', borderBottomColor: 'grey', borderBottomWidth: 1, alignItems: 'center',marginTop: 4 }}>
                    <View 
                        style={{ flex: 1, alignItems: 'center', marginHorizontal: 30 }}
                    >
                        <Image 
                            resizeMode={'contain'} style={{ width: 80, height: 80 }} 
                            source={vehicleInfo.vehicle_image ? { uri: vehicleInfo.vehicle_image } : car} 
                        />
                    </View>

                    <View 
                        style={{ flex: 3 }}

                    >
                        <Text style={{ color: '#1a1a1a', fontSize: 20 }}>{vehicleInfo.vehicle_make}, {vehicleInfo.vehicle_year},</Text>
                        <Text style={{ color: '#1a1a1a', fontSize: 25 }}>{vehicleInfo.vehicle_color}, HSHSB</Text>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                        <Text style={{ fontSize: 20, color: '#1a1a1a' }}>${this.props.selectedServices.totalCost}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 30,flex: 2, flexDirection: 'column', marginVertical: 5, alignItems: 'center', borderBottomColor: 'grey', borderBottomWidth: 1 }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{ flex: 8 }}>
                            <Text style={{ fontSize: 20, color: '#000' }}>{this.props.selectedServices.serviceSelected.service_name}</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                            <Text style={{ fontSize: 20, color: '#1a1a1a' }}>${vehicleInfo.vehicle_type === 2 ? this.props.selectedServices.serviceSelected.service_Large_cost : this.props.selectedServices.serviceSelected.cost}</Text>
                        </View>
                    </View>
                    <View style={{flex: 2, flexDirection: 'row'}}>
                    <View style={{width:'40%'}}>
                    <Text style={{ fontSize: 16, color: '#000' }}>Addon Services - </Text>
                    </View>
                    <ScrollView> 
                    {this.props.selectedServices.selectedaddOns !== ''?
                        this.props.selectedServices.selectedaddOns.map((addons, i) => 
                            <View key={i} style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{ flex: 4.4 }}>
                                    <Text numberOfLines={1} style={{ fontSize: 16, color: '#000' }}>{addons.vehicle.adds_on_name} </Text>
                                </View>
                                <View style={{ flex: 1, alignItems: 'center', borderLeftWidth: 1, borderLeftColor: 'grey' }}>
                                    <Text color={'#1a1a1a'}>${vehicleInfo.vehicle_type === 2 ? addons.vehicle.large_vehicle_cost : addons.vehicle.small_vehicle_cost}</Text>
                                </View>
                            </View>
                        )
                    :
                    null
                }
                        
            </ScrollView>
                </View>      
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, color: '#000' }}>Notes:</Text>
                        <Text style={{ fontSize: 16, color: 'grey', left: 5 }}>{this.props.notes}</Text>

                    </View>
                </View>

            </View>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 3,
        // backgroundColor: 'pink'
    },
  
});
