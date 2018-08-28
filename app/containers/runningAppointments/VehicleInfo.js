import React from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles';


const avatar = require('../../assets/icons/3_user_img.png');


const VehicleInfo = (props) => (
    <View style={styles.vehicleInfoWrapper}>
        <View style={styles.vehicleInfoContainer}>
            <View style={styles.vehicleInfoInnerContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                        <Image 
                            style={styles.image} 
                            source={props.item.service_vehicle[0].vehicle_image !== '' ? { uri: props.item.service_vehicle[0].vehicle_image } : avatar } 
                        />
                    </View>
                </View>
                <View style={styles.appointmentDetails}>
                    <View style={{ flexWrap: 'wrap' }}>
                        <Text style={[styles.item, { fontSize: 16 }]} > 
                            {props.item.service_vehicle[0].vehicle_make.toUpperCase()} {props.item.service_vehicle[0].vehicle_model.toUpperCase()}, 
                        </Text>
                        <Text style={[styles.item, { fontSize: 16 }]} > 
                            {props.item.service_vehicle[0].vehicle_year.toUpperCase()}, {props.item.service_vehicle[0].vehicle_color.toUpperCase()}
                        </Text>    
                    </View>
                </View>
                <View style={styles.options}>
                    <Text style={{ fontSize: 20, color: '#000' }}>${props.item.appointment.total_cost}</Text>
                </View>
            </View>
        </View>
    </View>
);


export default VehicleInfo;
