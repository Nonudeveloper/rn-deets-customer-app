import React from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import styles from './styles';

export default class FormArea extends React.Component {
    state = { language: 'java' };
    
  render() {
    const { pickerStyle, inputStyle } = styles;

    return (
        <View style={styles.formArea}>
            {/* <Text style={styles.textStyle}>form component</Text> */}
            {/* <FormLabel>Name</FormLabel> */}
            <View style={styles.colContainer}>
                <View style={styles.colOne}>
                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={
                            (itemValue, itemIndex) => this.setState({ language: itemValue })
                        }
                        style={pickerStyle}
                    >
                        <Picker.Item label="Year" value="java" />
                        <Picker.Item label="2000" value="js" />
                    </Picker>
                </View>
                <View style={styles.colTwo}>
                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={
                            (itemValue, itemIndex) => this.setState({ language: itemValue })
                        }
                        style={pickerStyle}
                    >
                        <Picker.Item label="Color" value="java" />
                        <Picker.Item label="2000" value="js" />
                    </Picker>
                </View>
            </View>
            <View >
                <View style={[inputStyle]}>
                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={
                            (itemValue, itemIndex) => this.setState({ language: itemValue })
                        }
                        style={pickerStyle}
                    >
                        <Picker.Item label="Make" value="java" />
                        <Picker.Item label="2000" value="js" />
                    </Picker>
                </View>
                <View style={[inputStyle]}>
                    <Picker
                        selectedValue={this.state.language}
                        onValueChange={
                            (itemValue, itemIndex) => this.setState({ language: itemValue })
                        }
                        style={pickerStyle}
                    >
                        <Picker.Item label="Make" value="java" />
                        <Picker.Item label="2000" value="js" />
                    </Picker>
                </View>
            </View>
            <View style={styles.licenseStyle}>
                <Text>License Plate #</Text>
            </View>
            <FormInput 
                placeholder='License Plate #'
                type="password" 
                placeholderTextColor='grey' 
                underlineColorAndroid="transparent" 
            />
            {/* <FormValidationMessage>Error message</FormValidationMessage> */}
        </View>
    );
  }
}
