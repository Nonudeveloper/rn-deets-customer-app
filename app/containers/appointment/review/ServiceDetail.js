import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import styles from './styles';

const car = require('../../../assets/icons/car_place_holder.png');

export default class ServiceDetail extends React.Component {

  render() {
      const vehicleInfo = this.props.selectedServices.vehicleSelected;
    return (
        <View style={{ flex: 3 }}>
            <View style={styles.serviceContainer}>
                <View style={styles.vehicleInfoContainer}>
                    <View style={styles.vehicleImageContainer}>
                        <Image 
                            resizeMode={'contain'} style={{ width: 80, height: 80 }} 
                            source={vehicleInfo.vehicle_image ? { uri: vehicleInfo.vehicle_image } : car} 
                        />
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.vehicleNameText}>{vehicleInfo.vehicle_make}, {vehicleInfo.vehicle_year},</Text>
                        <Text style={styles.vehicleColorText}>{vehicleInfo.vehicle_color}, HSHSB</Text>
                    </View>
                    <View style={styles.vehicleCostContainer}>
                        <Text style={styles.costTextStyle}>${this.props.selectedServices.totalCost}</Text>
                    </View>
                </View>
                <View style={styles.serviceDetailContainer}>
                    <View style={styles.serviceDetailInnerConatainer}>
                        <View style={{ flex: 4 }}>
                            <Text style={styles.serviceNameTextStyle}>{this.props.selectedServices.serviceSelected.service_name}</Text>
                        </View>
                        <View style={styles.serviceDetailCostContainer}>
                            <Text style={styles.costTextStyle}>${vehicleInfo.vehicle_type === 2 ? this.props.selectedServices.serviceSelected.service_Large_cost : this.props.selectedServices.serviceSelected.cost}</Text>
                        </View>
                    </View>
                    <View style={styles.serviceAddonConatiner}>
                        <View style={{ width: '40%' }}>
                        {this.props.selectedServices.selectedaddOns.length !== 0 ?
                            <Text style={styles.addonsTextStyle}>Addon Services - </Text>
                            : null
                        }
                        </View>
                        <ScrollView> 
                            {this.props.selectedServices.selectedaddOns.length !== 0 ?
                                this.props.selectedServices.selectedaddOns.map((addons, i) => 
                                    <View key={i} style={styles.addonsInnerConatainer}>
                                        <View style={{ flex: 4.4 }}>
                                            <Text numberOfLines={1} style={styles.addonsTextStyle}>{addons.vehicle.adds_on_name} </Text>
                                        </View>
                                        <View style={styles.addonsCostConatiner}>
                                            <Text color={'#1a1a1a'}>${vehicleInfo.vehicle_type === 2 ? addons.vehicle.large_vehicle_cost : addons.vehicle.small_vehicle_cost}</Text>
                                        </View>
                                    </View>
                                ) 
                                : null
                            }     
                        </ScrollView>
                    </View>      
                </View>
                <View style={styles.notesContainer}>
                    <View style={styles.notesInnerContainer}>
                        <Text style={styles.notesMainTextStyle}>Notes:</Text>
                        <Text style={styles.notesValueTextStyle}>{this.props.notes}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
  }
}
