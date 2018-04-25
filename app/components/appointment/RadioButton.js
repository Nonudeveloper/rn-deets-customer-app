import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const checkButton = require('../../assets/icons/6_check_btn.png');
const vehicleIcon = require('../../assets/icons/car_place_holder.png');
const unCheckButton = require('../../assets/icons/6_uncheck_btn.png');
 
export default class RadioButton extends Component {
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

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 25
    },
 
    radioButton:
    {
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    radioButtonHolder:
    {
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    radioIcon:
    {
        // borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    label:
    {
        marginLeft: 10,
        fontSize: 20
    },
 
    selectedTextHolder:
    {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
 
    selectedText:
    {
        fontSize: 18,
        color: 'white'
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
        // top: 10,
        paddingHorizontal: 20
      },
      radioButtonContainer: {
          paddingHorizontal: 17
      },
      vehicleInnerContainer: {
        flex: 1, 
        width: 300, 
        flexDirection: 'row',
      },
      selectedArrayItemsBtn:
        {
          marginTop: 20,
          padding: 10,
          backgroundColor: 'rgba(0,0,0,0.6)',
          alignSelf: 'stretch'
        },
        nextButtonContainer: {
          paddingBottom: 20,
      },
      nextButtonStyle: {
          borderRadius: 100,
          height: 55,
          // backgroundColor: '#8ac10b',
          borderWidth: 4,
          borderColor: '#bfff80',
          justifyContent: 'center',
          alignItems: 'center'
      },
      vehicleFont: { 
        fontSize: 16, 
        color: '#586069' 
      },
      licenceFont: { 
        fontSize: 18, 
        color: 'black', 
        fontWeight: 'bold' 
      }
});