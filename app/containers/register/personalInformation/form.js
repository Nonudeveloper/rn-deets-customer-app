import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { reduxForm, Field } from 'redux-form';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const info = (<Icon name="info-circle" size={23} color="#fff" />);

export default class FormArea extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
    }

    serviceAddress = () => {
        console.log(this.props.navigation);
        this.props.navigation.navigate('serviceAddress');
    }

  render() {
    return (
        <View style={styles.formArea}>
            {/* <Text style={styles.textStyle}>form component</Text> */}
            {/* <FormLabel>Name</FormLabel> */}
            <FormInput placeholder='First Name' placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <FormInput placeholder='Last Name' placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <FormInput placeholder='Email' type='email' placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <FormInput placeholder='Mobile' placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <FormInput placeholder='Password' type="password" placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <FormInput placeholder='Confirm Password' placeholderTextColor='grey' underlineColorAndroid="transparent" inputStyle={{ borderBottomWidth: 2, borderBottomColor: 'grey' }} />
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 5 }}>
                    <FormInput  placeholder='Service Address' placeholderTextColor='grey' underlineColorAndroid="transparent" />
                </View>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => this.serviceAddress()} style={{ flex: 1, padding: 16 }}>{info}</TouchableOpacity>
                </View>
            </View>
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        </View>
    );
  }
}
