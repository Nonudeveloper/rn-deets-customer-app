import React, { Component } from 'react';
import { View, TouchableHighlight, Text, StyleSheet, Image, AppRegistry, Platform } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

const checkButton = require('../../assets/icons/6_check_btn.png');

export default class Checkbox extends Component {
   constructor() {
      super();
 
      this.state = { checked: null };
   }
 
    componentWillMount(){
        if (this.props.checked) {
            this.setState({ checked: true }, () => {
                this.props.selectedArrayObject.setItem({ 'key': this.props.keyValue, 'vehicle': this.props.label });
            });
        } else {
            this.setState({ checked: false });
        }
    }
 
    toggleState(key, label) {
        this.setState({ checked: !this.state.checked }, () => {
            if (this.state.checked) {
                this.props.selectedArrayObject.setItem({ 'key': key, 'vehicle': label });
            } else {
                this.props.selectedArrayObject.getArray().splice( this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1 );
            }
        });
    }
    
   render() {
      return (
        <TouchableHighlight onPress={this.toggleState.bind(this, this.props.keyValue, this.props.label)} underlayColor='transparent' style={styles.checkBoxButton}>
           <View style={styles.checkBoxHolder}>
              <View style={{ width: this.props.size, height: this.props.size, padding: 2 }}>
              {
                 (this.state.checked)
                 ?
                    (<View style={styles.checkedView}>
                       <Image source={checkButton} style={styles.checkedImage} />
                    </View>)
                 :
                    (<View style={styles.uncheckedView} />)
              }
              </View>
              {/* <Text style = {[ styles.checkBoxLabel, { color: this.props.color }]}>{ this.props.label }</Text> */}
           </View>
        </TouchableHighlight>
      );
   }
}

Checkbox.propTypes = {
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.object,
  checked: PropTypes.bool
};
 
Checkbox.defaultProps = {
  size: 30,
  color: '#636c72',
  label: 'Default',
  checked: false
};
