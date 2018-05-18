import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, TouchableHighlight, View, Alert, Image } from 'react-native';
import styles from '../styles';

const avatar = require('../../../assets/icons/temp_avatar.png');
const locationIcon = require('../../../assets/icons/direction_on.png');
const messageIcon = require('../../../assets/icons/messageIcon.png');
const phoneIcon = require('../../../assets/icons/phoneIcon.png');
const rateStarActive = require('../../../assets/icons/rate_star_active.png');
const uncheckButton = require('../../../assets/icons/6_uncheck_btn.png');

class Item extends Component {

    getItem(item) {
        Alert.alert(item);
    }

    appointmentDetail = item => {
        this.props.navigation.navigate('PastAppointmentsDetail', { item });
    }

    renderFormatedDate(fullDate) {
        const dateObj = new Date(fullDate);
        const day = dateObj.getDay();
        const date = dateObj.getDate();
        const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        // const dateStr = dateObj.toString().split(' ')[0];
        // const arr = fullDate.split('-');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = dateObj.getFullYear();

        return `${daysList[day]} ${date} ${months[dateObj.getMonth()]}. ${year}`;
    }

    renderFormatedTime(date) {
        const dateObj = new Date(date);
        let hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        const second = dateObj.getSeconds();
        let prepand = (hour >= 12) ? 'PM' : 'AM';
        hour = (hour >= 12) ? hour - 12 : hour;
        if (hour === 0 && prepand === ' PM ') { 
            if (minute === 0 && second === 0) { 
                hour = 12;
                prepand = ' Noon';
            } else { 
                hour = 12;
                prepand = ' PM';
            } 
        } 
        if (hour === 0 && prepand === ' AM ') { 
            if (minute === 0 && second === 0) { 
                hour = 12;
                prepand = ' Midnight';
            } else { 
                hour = 12;
                prepand = ' AM';
            } 
        } 

        if (hour < 10) {
            hour = `0${hour}`;
        }
        return `${hour}:${minute} ${prepand}`;
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
                text: 'Update',
                backgroundColor: 'pink',
                underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
            }
        ];

        const { item } = this.props;
        console.log(item);
        return (
            <View>
                <View style={{ height: 40, backgroundColor: '#e6e6e6', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#000', fontSize: 17 }}>Swipe to Edit the Services</Text>
                </View>
                <Swipeout 
                    right={rightSwipeBtns}
                    left={leftSwipeBtns}
                    autoClose
                    backgroundColor='transparent'
                >   
                    
                    <View style={[{ height: 150, borderBottomColor: 'grey', borderBottomWidth: 1 }]}>
                    
                            <View style={styles.itemDetailContainer}>
                               
                                <View style={styles.avatarContainer}>
                                    <View style={styles.avatar}>
                                        <Image style={styles.image} source={{ uri: item.user[0].image }} />
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
                                            {this.renderFormatedDate(item.appointment.service_end_time)}
                                        </Text>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Text >
                                                {this.renderFormatedTime(item.appointment.service_start_time)} 
                                            </Text>
                                            <Text style={{ paddingHorizontal: 8, fontSize: 15, color: '#1a1a1a' }}>to</Text>
                                            <Text style={styles.dateTime}>
                                                {this.renderFormatedTime(item.appointment.service_end_time)}
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
                            
                            <View style={[styles.locationContainer]}>
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
                </Swipeout>
            </View>
        );
    }
}

export default Item;

