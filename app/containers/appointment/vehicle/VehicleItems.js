import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import styles from './styles';


const checkButton = require('../../../assets/icons/6_check_btn.png');
const vehicleIcon = require('../../../assets/icons/car_place_holder.png');
const unCheckButton = require('../../../assets/icons/6_uncheck_btn.png');
 
export default class VehicleItems extends Component {
    constructor() {
        super();
    }
        
        
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.8} style={styles.radioButton}>
                
                <View style={styles.radioButtonContainer}>
                    <View style={[styles.radioButtonHolder, { height: 20, width: 20, borderColor: '#636c72' }]}>
                    {
                        (this.props.button.selected === true)
                        ?
                            (<View style={[styles.radioIcon, { height: 20, width: 20 }]}>
                                <Image source={checkButton} style={{ height: '100%', width: '100%' }} />
                            </View>)
                        :
                            (<View style={[styles.radioIcon, { height: 20, width: 20 }]}>
                                <Image source={unCheckButton} style={{ height: '100%', width: '100%' }} />
                            </View>)
                    }
                    </View>
                </View>
                <View style={styles.vehicleInnerContainer}>
                    <View style={{ flex: 1 }}>
                        <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.vehicleFont}>{this.props.vehicleMake}</Text>
                        <Text style={styles.vehicleFont}>{this.props.vehicleYear}, {this.props.vehicleColor}</Text>
                        <Text style={styles.licenceFont}>HSHSB</Text>
                    </View>
                </View>
            </TouchableOpacity>
            
        );
    }
}
