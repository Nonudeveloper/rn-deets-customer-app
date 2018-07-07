import React, { Component } from 'react';
import { Text, View, FlatList, Alert, StyleSheet, TouchableHighlight, ScrollView, Image } from 'react-native';
import Header from '../header/Header';
import ListItem from './ListItem';
import { getAppointments } from './detail/api';
import AppoinmentTabs from './Tabs';
import styles from './styles';
import Loader from '../../deetscomponents/Loader';


const notAvailableIcon = require('../../assets/icons/tech_placeholder_not_available.png');
class PastAppointmentsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            appointments: [],
            selectedAppointments: '',
            selectedTab: 'upcoming',
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

    componentWillReceiveProps(nextProps) {
        if (!nextProps.upcomingAppointments.length) {
            this.setState({ selectedTab: 'past' });
        } else {
            this.setState({ selectedTab: 'upcoming' });
        }
    }

    flatListItemSeparator = () => {
        return (
          <View
            style={{
              height: 3,
              width: '100%',
              backgroundColor: '#333',
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
        // this.setState({
        //     selectedAppointments: this.props.selectedAppointments,
        // });
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
                activeTab={this.state.selectedTab}
            />
        );
    }

    selectAll = () => {
        const IDs = [];
        //if selected tab is past
        if (this.state.selectedTab === 'past') {
            for (const item of this.props.pastAppointments) {
                IDs.push(item.appointment.id);
            }
        } else {
            for (const item of this.props.upcomingAppointments) {
                IDs.push(item.appointment.id);
            }
        }
        //action to select all the appointments
        this.props.actions.selectAllAppointments(IDs);
        setTimeout(() => {
            this.setState({
                selectedAppointments: this.props.selectedAppointments,
            });
        }, 0.1);
    }

    renderTrashModal = () => {
        if (this.state.editMode) {
            return (
                <View 
                    style={{ 
                        height: 50, 
                        backgroundColor: '#000', 
                        opacity: 0.8, 
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center' 
                    }}
                >
                        <TouchableHighlight onPress={() => this.selectAll()}>
                            <Text style={{ color: '#fff', marginLeft: 20 }}>Select all</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => this.selectAll()}>
                            <Text style={{ color: '#fff', marginRight: 20 }}>Trash</Text>
                        </TouchableHighlight>
                </View>
            );
        }
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
                        buttonType={'back'}
                    />
                    <Loader loading={this.props.isFetching} />
                    <View style={{ height: 20 }} />
                    <AppoinmentTabs 
                        selectedTab={this.state.selectedTab} 
                        onTabClick={this.changeActiveTab} 
                    />
                    <FlatList
                        data={this.state.selectedTab === 'past' ? 
                        this.props.pastAppointments : 
                        this.props.upcomingAppointments}
                        ItemSeparatorComponent={this.flatListItemSeparator}
                        renderItem={
                            ({ item }) => this.renderItem(item)
                        }
                        keyExtractor={(item, index) => index.toString()}
                        extraData={this.state}
                        ListEmptyComponent={() => 
                            <View style={styles.notAvailableContainer}>
                             {(!this.props.upcomingAppointments.length && this.state.selectedTab !== 'past' && !this.props.isFetching ? 
                            <View style={styles.notAvailableContainer}>
                                <Image source={notAvailableIcon} style={styles.notAvailableImage} />
                                <Text style={styles.notAvailableText}>Sorry, you have no upcoming appointments.</Text>
                            </View>
                            : null)}
                            {(!this.props.pastAppointments.length && this.state.selectedTab === 'past' && !this.props.isFetching ? 
                            <View style={styles.notAvailableContainer}>
                                <Image source={notAvailableIcon} style={styles.notAvailableImage} />
                                <Text style={styles.notAvailableText}>Sorry, you have no past appointments.</Text>
                            </View>
                            : null)}
                            </View>
                        }
                    />
                     {this.renderTrashModal()}
                </View>
        );
    }
}

export default PastAppointmentsList;
