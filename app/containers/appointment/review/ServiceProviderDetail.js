import React from 'react';
import { View, Text, Image, Linking, Platform, TouchableOpacity} from 'react-native';
import styles from './styles';

const avatar = require('../../../assets/icons/temp_avatar.png');
const ratingStartActive = require('../../../assets/icons/rate_star_active.png');
const ratingStartInactive = require('../../../assets/icons/rate_star_inactive.png');
const directionOn = require('../../../assets/icons/direction_on.png');

export default class ServiceProviderDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    console.log(this.props);
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

  getTime(date) {
    var date, TimeType, hour, minutes, seconds, fullTime;
    hour = date.getHours(); 
    if(hour <= 11) {
      TimeType = 'AM';
    } else {
      TimeType = 'PM';
    }

    if( hour > 12 ){
      hour = hour - 12;
    }
    if( hour == 0 ) {
        hour = 12;
    } 
    minutes = date.getMinutes();
    if(minutes < 10) {
      minutes = '0' + minutes.toString();
    }
    fullTime = hour.toString() + ':' + minutes.toString() + ' ' + TimeType.toString();
    return fullTime;
  }

  openMap() {
    const scheme = Platform.select({ ios: 'http://maps.apple.com/?ll=', android: 'geo:' });
    const latLng = `${this.props.geoData[0].coordinates[1]},${this.props.geoData[0].coordinates[0]}`;
    const url = Platform.select({
      ios: `${scheme}${latLng}`,
      android: `${scheme}${latLng}`
    });
    console.log(url);
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  render() {
    const selectedDate = new Date(this.props.selectedSchedule.selectedDate);
    const appointmentDate = selectedDate.toDateString();
    // const newDate = new Date(this.props.selectedSchedule.selectedInterval);
    // const newDateIso = newDate.toISOString();
    const now = new Date(this.props.selectedSchedule.selectedInterval);
    now.setMinutes(now.getMinutes() + Number(this.props.endTime));
    const endTime = this.getTime(now);
    // const endTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    
    return (
      <View style={{ flex:1 }}>
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
                
                <TouchableOpacity onPress={() => this.openMap()}>
                    <View style={styles.addressImageContainer}>
                        <Image source={directionOn} resizeMode={'contain'} style={{ width: 25, height: 25 }}/>
                    </View>                    
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={styles.providerInfoText}>{this.props.addressString}</Text>
                </View>
            </View>
        </View>
      </View>
    );
  }
}
