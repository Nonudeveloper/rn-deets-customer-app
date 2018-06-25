import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, TouchableOpacity, View, Alert, Image } from 'react-native';
import { renderFormatedDate, renderFormatedTime } from '../../helpers/utility';
import styles from './styles';

const avatar = require('../../assets/icons/temp_avatar.png');
const locationIcon = require('../../assets/icons/direction_on.png');
const messageIcon = require('../../assets/icons/messageIcon.png');
const phoneIcon = require('../../assets/icons/phoneIcon.png');
const rateStarActive = require('../../assets/icons/rate_star_active.png');
const uncheckButton = require('../../assets/icons/6_uncheck_btn.png');
const checkButton = require('../../assets/icons/6_check_btn.png');

class ListItem extends React.PureComponent {

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
        console.log(item);
        this.props.actions.selectedAppointmentForReschedule(item);
        this.props.navigation.navigate('SelectVehicleScreen', { schedule: 'resechudle' });  
    }

    updateAppointment() {
        this.props.navigation.navigate('SelectVehicleScreen');
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
                text: this.props.activeTab === 'past' ? 'Schedule' : 'Update',
                backgroundColor: '#009933',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
                onPress: () => { this.props.activeTab === 'past' ? 
                    this.scheduleItem(this.props.item) :
                    this.updateAppointment(this.props.item)
                }
                
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
                <TouchableOpacity
                    onPress={this.appointmentDetail.bind(this, item)} 
                    key={item.key}
                    activeOpacity={1}
                >
                    <View style={styles.itemContainer}>
                        <View style={styles.itemDetailContainer}>

                            {
                                this.props.editMode ? (
                                    <TouchableOpacity 
                                        onPress={() => this.selectAppointment(item.appointment.id)} 
                                        style={styles.radioContainer}
                                        activeOpacity={1}
                                    >
                                    {
                                        this.props.selectedAppointments && this.props.selectedAppointments.includes(item.appointment.id) ? (
                                            <Image style={styles.radioImage} source={checkButton} />
                                        ) : (
                                            <Image style={styles.radioImage} source={uncheckButton} />
                                        )
                                    }
                                        
                                    </TouchableOpacity>
                                ) : (
                                    null
                                )
                            }
                            
                            <View style={styles.avatarContainer}>
                                <View style={styles.avatar}>
                                    <Image 
                                        style={styles.image} 
                                        source={
                                            item.user[0].image !== '' ? 
                                            { uri: item.user[0].image } :
                                             avatar
                                        } 
                                    />
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
                                <TouchableOpacity onPress={() => this.callToTechnician(item)}>
                                    <Image source={phoneIcon} style={styles.messageIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.messageToTechnician(item)}>
                                    <Image source={messageIcon} style={styles.messageIcon} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.locationContainer}>
                            <View style={styles.locationIconCont}>
                                <Image source={locationIcon} style={styles.locationIcon} />
                            </View>
                            <View style={styles.hrContainer} />
                                <View style={styles.locationTextCont}>
                                    <Text numberOfLines={1} style={styles.text}>
                                        {item.appointment.service_location_string}
                                    </Text>
                                </View>
                            </View>
                        </View>
                </TouchableOpacity>
            </Swipeout>
        );
    }
}

export default ListItem;

