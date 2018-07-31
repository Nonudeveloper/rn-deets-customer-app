import React, { Component } from 'react';
import Swipeout from 'react-native-swipeout';
import { Text, TouchableHighlight, View, Alert, Image } from 'react-native';
import { renderFormatedDate, renderFormatedTime } from '../../helpers/utility';
import styles from './styles';

const avatar = require('../../assets/icons/3_user_img.png');
const locationIcon = require('../../assets/icons/direction_on.png');
const messageIcon = require('../../assets/icons/messageIcon.png');
const phoneIcon = require('../../assets/icons/phoneIcon.png');
const starOn = require('../../assets/icons/starOn.png');
const starOff = require('../../assets/icons/starOff.png');

export default class ItemList extends Component {


    getAverageRating(totalRating, totalRatingUsers) {
        averageRating = totalRating / totalRatingUsers;
        averageRatingounded = Math.round(averageRating *  2) / 2;
        averageRatingExact = Math.round(averageRating * 100) / 100;
        const availabilityGrid = [];
        for (let i = 0; i < 5; i++) {
            availabilityGrid.push(
              <Image 
                source={i < averageRatingExact ? starOn : starOff} 
                key={i} 
                style={{ width: 15, height: 15, marginHorizontal: 3 }} 
              />
            );
        }
        return availabilityGrid;
      }

    rateData(totalRating, totalRatingUsers) {
        averageRating = totalRating / totalRatingUsers;
       return  Math.round(averageRating * 100) / 100;
    }

    render() {
        const { item } = this.props;
        return (
            <View style={styles.swipOutContainer}>
                <View style={{flex:4, paddingLeft: 10}}>    
                    <View style={styles.itemDetailContainer}>
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Image style={styles.image} source={item.user[0].image !== '' ? { uri: item.user[0].image } : avatar} />
                            </View>
                        </View>
                        <View style={styles.appointmentDetails}>
                            <View style={{}}>
                                <Text style={styles.item} > 
                                    {item.user[0].first_name} {item.user[0].last_name} 
                                </Text>
                                <View style={styles.ratingContainer}>
                                    {this.getAverageRating(item.user[0].total_rating, item.user[0].total_rating_user)}
                                    <Text style={styles.averageRatingTextStyle}>({this.rateData(item.user[0].total_rating, item.user[0].total_rating_user)})</Text>
                                </View>
                                <Text style={styles.dateTime} >
                                    {renderFormatedDate(item.appointment.service_end_time)}
                                </Text>
                                <Text style={styles.dateTime} >
                                    {renderFormatedTime(item.appointment.service_start_time)} To  {renderFormatedTime(item.appointment.service_end_time)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.options}>
                            <TouchableHighlight onPress={() => this.callToTechnician(item)} >
                                <Image source={phoneIcon} style={styles.messageIcon} />
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => this.messageToTechnician(item)} >
                                <Image source={messageIcon} style={styles.messageIcon} />
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
                <View style={[styles.locationContainer]}>
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
        );
    }
}
