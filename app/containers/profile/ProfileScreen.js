import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Header from '../header/Header';
import styles from './styles';


export default class ProfileScreen extends Component {
    //Playing with React Native Animations
    render() {
        return (
            <View style={styles.container}>
                <Header 
                    navigation={this.props.navigation} 
                    headerText={'Profile'}
                    buttonType={'burger'}
                />
            </View>
        );
    }
}
