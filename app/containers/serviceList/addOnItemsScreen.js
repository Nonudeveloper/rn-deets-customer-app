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
        <TouchableOpacity style={styles.addsOnListContainer} underlayColor='transparent' >
            <View style={styles.addsOnTextContainer}>
                <Text numberOfLines={1} style={styles.addsOnNameText} > {this.props.item.adds_on_name} </Text>
                <View style={styles.addsOnBottomTextContainer}>
                    <Text style={[styles.item, { backgroundColor: 'gray' }]} > {this.props.item.adds_on_type_name} </Text>
                    <Text style={styles.item} > Estimation Time - {this.props.item.estimation_time} Mins</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text 
                    style={styles.addsOnCostText} 
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
