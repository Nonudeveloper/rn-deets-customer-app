import React, { Component } from 'react';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import Header from '../header/Header';
import ListItem from './ListItem';
import { getAppointments } from './detail/api';
import AppoinmentTabs from './Tabs';
import styles from './styles';

class PastAppointmentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            selectedAppointments: '',
            selectedTab: 'past',
            editMode: false
        };
    }

    componentWillMount() {
        getAppointments()
        .then(res => {
            this.setState({ appointments: res[0].data[0], loading: false });
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

    changeActiveTab = tabName => {
        if (tabName === 'past') {
            this.setState({
                selectedTab: 'past',
                
            });
        } else {
            this.setState({
                selectedTab: 'upcoming'
            });
        }
    }
    selectAppointment(id) {
        this.props.actions.selectAppointment(id);
        setTimeout(() => {
            this.setState({
                selectedAppointments: this.props.selectedAppointments,
            });
        }, 0.1);
    }

    renderItem(item) {
        return (
            <ListItem 
                item={item} 
                onDelete={() => this.props.actions.deleteAppointment(item)} 
                makeCallToTechnician={() => this.props.actions.makeCallToTechnician(item)}
                messageToTechnician={() => this.props.actions.messageToTechnician(item)}
                selectAppointment={this.selectAppointment.bind(this)}
                selectedAppointments={this.state.selectedAppointments}
                navigation={this.props.navigation}
                editMode={this.state.editMode}
                actions={this.props.actions}
            />
        );
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                <Header 
                    navigation={this.props.navigation} 
                    headerText={'Appointments'}
                    rightText={this.state.editMode ? 'Cancel' : 'Edit'}
                    showRightIcon
                    onPress={() => this.setState({ editMode: !this.state.editMode })}
                    buttonType={'burger'}
                />
                <AppoinmentTabs 
                    selectedTab={this.state.selectedTab} 
                    onTabClick={this.changeActiveTab} 
                />
                <FlatList
                    data={this.state.selectedTab === 'past' ? this.state.appointments.past_appointments : this.state.appointments.upcoming_appointments}
                    ItemSeparatorComponent={this.flatListItemSeparator}
                    renderItem={
                        ({ item }) => this.renderItem(item)
                    }
                    keyExtractor={(item, index) => index.toString()}
                    extraData={this.state}
                />
            </View>
        );
    }
}

export default PastAppointmentsList;
