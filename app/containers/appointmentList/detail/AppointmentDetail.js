import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Header from '../../header/Header';
import Item from './Item';
import VehicleInfo from './VehicleInfo';

export default class AppointmentDetail extends Component {
    render() {
        const { item } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Header 
                        navigation={this.props.navigation} 
                        headerText={'Service Details'}
                />
               <Item 
                    item={item} 
                    onDelete={() => this.props.actions.deleteAppointment(item)} 
                    makeCallToTechnician={() => this.props.actions.makeCallToTechnician(item)}
                    messageToTechnician={() => this.props.actions.messageToTechnician(item)}
                    selectAppointment={id => this.props.actions.selectAppointment(id)}
                    selectedAppointments={this.props.selectedAppointments}
                    navigation={this.props.navigation}
               />
               <VehicleInfo item={item} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
