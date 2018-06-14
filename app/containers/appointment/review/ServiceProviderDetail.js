import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const avatar = require('../../../assets/icons/temp_avatar.png');
const ratingStartActive = require('../../../assets/icons/rate_star_active.png');
const ratingStartInactive = require('../../../assets/icons/rate_star_inactive.png');
const directionOff = require('../../../assets/icons/direction_off.png');

export default class ServiceProviderDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }

  getAverageRating(stars) {
    const availabilityGrid = [];
    for (let i = 0; i < 5; i++) {
        availabilityGrid.push(
        <Image source={i < stars ? ratingStartActive : ratingStartInactive} key={i} resizeMode={'contain'} style={styles.ratingImageStyle} />
        );
    }
    return availabilityGrid;
  }

  render() {
    const selectedDate = new Date(this.props.selectedSchedule.selectedDate);
    const appointmentDate = selectedDate.toDateString();
    const newDate = new Date(this.props.selectedSchedule.selectedDate + ' ' + this.props.selectedSchedule.selectedTime);
    const newDateIso = newDate.toISOString();
    const now = new Date(newDateIso);
    now.setMinutes(now.getMinutes() + parseInt(this.props.endTime));
    const endTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return (
      <View style={{ flex: 2 }}>
        <View style={styles.serviceProviderContainer} >
            <View style={styles.providerInfoContainer}>
                <View style={{ flex: 1 }}>
                    <Image 
                        resizeMode={'contain'} style={styles.providerInfoImageStyle} 
                        source={this.props.selectedSchedule.selectedItem.technician.image ? { uri: this.props.selectedSchedule.selectedItem.technician.image } : avatar} 
                    />
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={styles.providerNameText}>
                        {this.props.selectedSchedule.selectedItem.technician.first_name} {this.props.selectedSchedule.selectedItem.technician.last_name}
                    </Text>
                    <View style={styles.providerRatingContainer}>
                    {this.getAverageRating(this.props.selectedSchedule.selectedItem.technician.average_rating)}
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={styles.providerInfoText}>{appointmentDate}</Text>
                        <Text style={styles.providerInfoText}>{this.props.selectedSchedule.selectedTime} to {endTime}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.providerAddressContainer}>
                <View style={styles.addressImageContainer}>
                    <Image source={directionOff} resizeMode={'contain'} style={{ width: 25, height: 25 }} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.providerInfoText}>9601-9669 Rancho Dr, Escondido, CA...</Text>
                </View>
            </View>
        </View>
      </View>
    );
  }
}
