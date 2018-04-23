import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

const checkButton = require('../../assets/icons/6_check_btn.png');
 
export default class RadioButton extends Component {
    constructor() {
        super();
    }
        
        
    render() {
        return (
            <TouchableOpacity onPress={this.props.onClick} activeOpacity={0.8} style={styles.radioButton}>
                <View style={[styles.radioButtonHolder, { height: 30, width: 30, borderColor: '#636c72' }]}>
                {
                    (this.props.button.selected === true)
                    ?
                        (<View style={[styles.radioIcon, { height: 30, width: 30 }]}>
                        <Image source={checkButton} style={{ height: '100%', width: '100%' }} />
                        </View>)
                    :
                        null
                }
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
    }
});