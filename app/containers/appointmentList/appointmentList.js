import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet } from 'react-native';
import Header from '../header/Header';
import PastAppointmentList from './pastAppointmentsList';

class AppointmentList extends Component {

    constructor(props) {
        super(props);
        this.state = { FlatListItems: [
                {key: 'One'},
                {key: 'Two'},
                {key: 'Three'},
                {key: 'Four'},
                {key: 'Five'},
                {key: 'Six'},
                {key: 'Seven'},
                {key: 'Eight'},
                {key: 'Nine'},
                {key: 'Ten'},
                {key: 'Eleven'},
                {key: 'Twelve'}
        ]}
    }

    componentDidMount() {
        this.props.actions.fetchUpcomingAndPastAppointments();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header 
                    navigation={this.props.navigation} 
                    headerText={'Appointments'}
                />
                <PastAppointmentList data={this.props.pastAppointments} />
            </View>
        );
    }
}

export default AppointmentList;
