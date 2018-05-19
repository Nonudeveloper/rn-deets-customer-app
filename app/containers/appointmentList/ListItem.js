import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, TouchableHighlight, View, Alert, Image } from 'react-native';
import { renderFormatedDate, renderFormatedTime } from '../../helpers/utility';
import styles from './styles';

const avatar = require('../../assets/icons/temp_avatar.png');
const locationIcon = require('../../assets/icons/direction_on.png');
const messageIcon = require('../../assets/icons/messageIcon.png');
const phoneIcon = require('../../assets/icons/phoneIcon.png');
const rateStarActive = require('../../assets/icons/rate_star_active.png');
const uncheckButton = require('../../assets/icons/6_uncheck_btn.png');

class ListItem extends Component {

    getItem(item) {
        Alert.alert(item);
    }

    appointmentDetail = item => {
        this.props.navigation.navigate('PastAppointmentsDetail', { item });
    }

    renderRating(item = null) {
        const rating = [];
        for (let i = 0; i < 5; i++) {
            rating.push(<Image key={i} style={styles.ratingStart} source={rateStarActive} />);
        }
        return rating;
    }

    deleteItem(item) {
        this.props.onDelete(item);
    }

    callToTechnician(item) {
        this.props.makeCallToTechnician(item.user);
    }

    scheduleItem(item) {
        this.props.actions.selectedAppointmentForReschedule(item);
        this.props.navigation.navigate('SelectVehicleScreen', { schedule: 'resechudle' });  
    }
    
    messageToTechnician(item) {
        this.props.messageToTechnician(item.user);
    }

    selectAppointment(id) {
        this.props.selectAppointment(id);
    }

    render() {
        const rightSwipeBtns = [
            {
              text: 'Delete',
              backgroundColor: '#ff3300',
              underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
              onPress: () => { this.deleteItem(this.props.item); }
           }
        ];
        const leftSwipeBtns = [
            {
                text: 'Schedule',
                backgroundColor: '#009933',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.scheduleItem(this.props.item); }
            }
        ];

        const { item } = this.props;
        return (
            <Swipeout 
                right={rightSwipeBtns}
                left={leftSwipeBtns}
                autoClose
                backgroundColor='transparent'
            >
                <TouchableHighlight
                    onPress={this.appointmentDetail.bind(this, item)} 
                    key={item.key}
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.itemDetailContainer}>

                            {
                                this.props.editMode ? (
                                    <TouchableHighlight 
                                        onPress={() => this.selectAppointment(item.appointment.id)} 
                                        style={styles.radioContainer}
                                        activeOpacity={1}
                                    >
                                    {
                                        this.props.selectedAppointments && this.props.selectedAppointments.includes(item.appointment.id) ? (
                                            <Text>selected</Text>
                                        ) : (
                                            <Image style={styles.radioImage} source={uncheckButton} />
                                        )
                                    }
                                        
                                    </TouchableHighlight>
                                ) : (
                                    null
                                )
                            }
                            
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Image style={styles.image} source={avatar} />
                                </View>
                            </View>
                            <View style={styles.appointmentDetails}>
                                <View style={{}}>
                                    <Text 
                                        style={styles.item} 
                                        onPress={this.getItem.bind(this, item.key)} 
                                    > 
                                        {item.user[0].first_name} {item.user[0].last_name} 
                                    </Text>
                                    <View style={styles.ratingContainer}>
                                        <Image style={styles.ratingStart} source={rateStarActive} />
                                        <Image style={styles.ratingStart} source={rateStarActive} />
                                        <Image style={styles.ratingStart} source={rateStarActive} />
                                        <Image style={styles.ratingStart} source={rateStarActive} />
                                        <Image style={styles.ratingStart} source={rateStarActive} />
                                    </View>
                                    <Text style={styles.dateTime}>
                                        {renderFormatedDate(item.appointment.service_end_time)}
                                    </Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Text style={styles.dateTime}>
                                            {renderFormatedTime(item.appointment.service_start_time)} 
                                        </Text>
                                        <Text style={{ paddingHorizontal: 8, fontSize: 15, color: '#1a1a1a' }}>to</Text>
                                        <Text style={styles.dateTime}>
                                            {renderFormatedTime(item.appointment.service_end_time)}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.options}>
                                <TouchableHighlight onPress={() => this.callToTechnician(item)}>
                                    <Image source={phoneIcon} style={styles.messageIcon} />
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.messageToTechnician(item)}>
                                    <Image source={messageIcon} style={styles.messageIcon} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <View style={styles.locationIconCont}>
                                <Image source={locationIcon} style={styles.locationIcon} />
                            </View>
                            <View style={styles.locationTextCont}>
                                <Text style={styles.text}>
                                    {item.appointment.service_location_string.substr(0, 39)}...
                                </Text>
                            </View>
                        </View>
                    </View>
                </TouchableHighlight>
            </Swipeout>
        );
    }
}

export default ListItem;

