import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet, TouchableHighlight } from 'react-native';
import Header from '../../header/Header';
import ListItem from '../ListItem';
import { getAppointments } from '../detail/api';

class PastAppointmentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            selectedAppointments: this.props.selectedAppointments
        };
    }

    componentWillMount() {
        getAppointments()
        .then(res => {
            console.log(res[0].data);
            this.setState({ appointments: res[0].data[0], loading: false })
        })
        .catch(err => alert("An error occurred"));
    }

    componentDidMount() {
        this.props.actions.fetchUpcomingAndPastAppointments();
    }

    flatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#607D8B',
            }}
          />
        );
    }

    renderItem(item) {
        return (
            <ListItem 
                item={item} 
                onDelete={() => this.props.actions.deleteAppointment(item)} 
                makeCallToTechnician={() => this.props.actions.makeCallToTechnician(item)}
                messageToTechnician={() => this.props.actions.messageToTechnician(item)}
                selectAppointment={id => this.props.actions.selectAppointment(id)}
                selectedAppointments={this.props.selectedAppointments}
                navigation={this.props.navigation}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header 
                    navigation={this.props.navigation} 
                    headerText={'Appointments'}
                    rightText={'Edit'}
                    showRightIcon
                />
                <View style={{ flexDirection: 'row', height: 50 }}>
                    <TouchableHighlight 
                        style={{ 
                            flex: 1, 
                            backgroundColor: '#009933',
                            alignItems: 'center', 
                            justifyContent: 'center' 
                        }}
                        onPress={() => console.log('press4ed')}
                    >
                        <Text style={{ color: '#fff', fontSize: 15 }}>ccccccccccc</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style={{ 
                            flex: 1, 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            backgroundColor: '#fff' 
                        }}
                        onPress={() => this.props.navigation.navigate('UpcomingAppointmentsList')}
                    >
                        <Text style={{ fontSize: 15 }}>ccccccccccc</Text>
                    </TouchableHighlight>
                </View>
                <FlatList
                    data={this.state.appointments.past_appointments}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    renderItem={
                        ({ item }) => this.renderItem(item)
                    }
                    extraData={this.state}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
 
    mainContainer: {
        // Setting up View inside content in Vertically center.
        justifyContent: 'center',
        flex: 1,
        margin: 10
    },
   
     
});

export default PastAppointmentsList;
