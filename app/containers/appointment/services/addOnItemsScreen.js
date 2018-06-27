import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const checkButton = require('../../../assets/icons/6_check_btn.png');
const unCheckButton = require('../../../assets/icons/6_uncheck_btn.png');

export default class AddonItemsScreen extends Component {
   constructor() {
      super();
 
      this.state = { checked: null };
   }
 
    componentWillMount() {
        if (this.props.checked) {
            this.setState({ checked: true }, () => {
                this.props.selectedArrayObject.setItem({ 'key': this.props.keyValue, 'vehicle': this.props.label });
            });
        } else {
            this.setState({ checked: false });
        }
    }

    componentDidMount() {
        if (this.props.selectedArrayObject.getArray().length !== 0) {
        this.props.selectedArrayObject.getArray().splice( this.props.selectedArrayObject.getArray().findIndex(x => x.key == this.props.keyValue), 1 );
        }
        if (this.props.reSchedule !== '') {
            if (this.props.service.service_id === this.props.reSchedule.appointment.service_id) {
                this.props.reSchedule.service_adds_on.map((addons) => {
                    if (addons.adds_on_id === this.props.item.id) {
                        this.toggleState(this.props.keyValue, this.props.label)
                    }
                });
            }
        }
    }
 
    toggleState(key, label) {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.state.checked) {
                this.props.selectedArrayObject.setItem({ 'key': key, 'vehicle': label });
            } else {
                this.props.selectedArrayObject.getArray().splice( this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1 );
            }
            if (this.props.callback) {
                this.props.getSelectedItems(this.props.selectedArrayObject.getArray());
            }
        });
    }
    
   render() {
      return (
        <TouchableOpacity style={styles.addsOnListContainer} onPress={this.toggleState.bind(this, this.props.keyValue, this.props.label)} underlayColor='transparent' >
            <View style={{ flex: 1 }}>
                <View style={styles.checkBoxButton}>
                    <View style={styles.checkBoxHolder}>
                        <View style={{ width: this.props.size, height: this.props.size, padding: 2 }}>
                        {
                            (this.state.checked)
                            ?
                                (<View style={styles.checkedView}>
                                <Image source={checkButton} style={styles.checkedImage} />
                                </View>)
                            :
                                (<View style={styles.uncheckedView} >
                                    <Image source={unCheckButton} style={styles.checkedImage} />
                                </View>)
                        }
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.addsOnTextContainer}>
                <Text numberOfLines={1} style={styles.addsOnNameText} > {this.props.item.adds_on_name} </Text>
                <View style={styles.addsOnBottomTextContainer}>
                    <Text style={[styles.item, { backgroundColor: 'gray' }]} > {this.props.item.adds_on_type_name} </Text>
                    <Text style={styles.item} > Estimation Time - {this.props.item.estimation_time} Mins</Text>
                </View>
            </View>
            <View style={{ flex: 1 }}>
                <Text 
                    style={this.state.checked ? { color: '#8ac10b', fontSize: 15 } : { color: 'black', fontSize: 15 }} 
                > ${this.props.selectedVehicle.vehicle_type === 2 ? this.props.item.large_vehicle_cost : this.props.item.small_vehicle_cost} </Text>
            </View>
        </TouchableOpacity>
      );
   }
}

AddonItemsScreen.propTypes = {
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.object,
  checked: PropTypes.bool
};
 
AddonItemsScreen.defaultProps = {
  size: 30,
  color: '#636c72',
  label: 'Default',
  checked: false
};
