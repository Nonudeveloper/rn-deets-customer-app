import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight } from 'react-native';
import styles from '../styles';


const avatar = require('../../../assets/icons/temp_avatar.png');
const phoneIcon = require('../../../assets/icons/phoneIcon.png');
const visa = require('../../../assets/icons/small_VISA.png');

const VehicleInfo = (props) => (
        <View style={{ height: 180 }}>
                    
                    <View style={styles.itemDetailContainer}>
                       
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Image 
                                    style={styles.image} 
                                    source={{ uri: props.item.service_vehicle[0].vehicle_image }} 
                                />
                            </View>
                        </View>
                        <View style={styles.appointmentDetails}>
                            <View style={{ flexWrap: 'wrap' }}>
                                <Text 
                                    style={[styles.item, { fontSize: 20 }]} 
                                > 
                                    {props.item.service_vehicle[0].vehicle_make.toUpperCase()} {props.item.service_vehicle[0].vehicle_model.toUpperCase()}, 
                                </Text>
                                <Text 
                                    style={[styles.item, { fontSize: 20 }]} 
                                > 
                                    {props.item.service_vehicle[0].vehicle_year.toUpperCase()}, {props.item.service_vehicle[0].vehicle_color.toUpperCase()}
                                </Text>
                               
                            </View>
                        </View>
                        <View style={styles.options}>
                            <TouchableHighlight onPress={() => this.callToTechnician(props.item)}>
                                <Text style={{ fontSize: 25, color: '#000' }}>${props.item.appointment.total_cost}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    
                    <View 
                        style={
                            [styles.locationContainer, 
                            {   
                                justifyContent: 'space-between',
                                borderBottomColor: '#333',
                                borderBottomWidth: 1
                            }]
                        }
                    >
                        <View style={{ flex: 4, marginLeft: 20 }}>
                            <Text 
                                style={{ 
                                    fontSize: 20, 
                                    color: '#000' 
                                }}
                            >{props.item.appointment.service_name}</Text>
                        </View>
                        <View 
                            style={{ 
                                flex: 1, 
                                justifyContent: 'center', 
                                alignItems: 'center' 
                            }}
                        >
                            <Text style={{ fontSize: 19, color: '#000' }}>
                                ${props.item.appointment.total_cost}
                            </Text>
                        </View>
                    </View>


                    <View 
                        style={{ 
                            height: 30, 
                            justifyContent: 'space-between', 
                            alignItems: 'center', 
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginTop: 10
                        }}
                    >
                        <Text style={{ fontSize: 20 }}>Payment</Text>
                        <Image 
                            source={visa} 
                            style={{ 
                                resizeMode: 'contain', 
                                height: 55, 
                                width: 55 
                            }} 
                        />
                        <Text style={{ fontSize: 30, color: 'grey' }}>....</Text>
                        <Text style={{ fontSize: 20, color: 'grey' }}>1111</Text>
                        <Text style={{ fontSize: 19, color: '#000' }}>
                                ${props.item.appointment.total_cost}
                        </Text>
                    </View>
            
        </View>
);


export default VehicleInfo;
