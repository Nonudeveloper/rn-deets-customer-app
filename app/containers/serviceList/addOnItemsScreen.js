import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';


export default class AddonItemsScreen extends Component {
   constructor() {
      super();
   }
 
    
 
   render() {
      return (
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }} underlayColor='transparent' >
            <View style={{ flex: 9, flexDirection: 'column' }}>
                <Text style={{ fontSize: 18, color: 'black' }} > {this.props.item.adds_on_name} </Text>
                <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                    <Text style={[styles.item, { backgroundColor: 'gray' }]} > {this.props.item.adds_on_type_name} </Text>
                    <Text style={styles.item} > Estimation Time - {this.props.item.estimation_time} Mins</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text 
                    style={{ color: 'black', fontSize: 15 }} 
                > ${this.props.item.small_vehicle_cost} </Text>
            </View>
        </TouchableOpacity>
      );
   }
}

// AddonItemsScreen.propTypes = {
//   size: PropTypes.number,
//   keyValue: PropTypes.number.isRequired,
//   selectedArrayObject: PropTypes.object.isRequired,
//   color: PropTypes.string,
//   label: PropTypes.object,
//   checked: PropTypes.bool
// };
 
// AddonItemsScreen.defaultProps = {
//   size: 30,
//   color: '#636c72',
//   label: 'Default',
//   checked: false
// };
