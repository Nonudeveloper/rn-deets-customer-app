import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

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
        <Image source={i < stars ? ratingStartActive : ratingStartInactive} key={i} resizeMode={'contain'} style={{ width: 16, height: 16, marginRight: 4 }} />
        );
    }
    return availabilityGrid;
  }

  render() {
      console.log(this.props)
    const selectedDate = new Date(this.props.selectedSchedule.selectedDate);
    const appointmentDate = selectedDate.toDateString();
    const newDate = new Date(this.props.selectedSchedule.selectedDate + ' ' + this.props.selectedSchedule.selectedTime);
    const newDateIso = newDate.toISOString();
    const now = new Date(newDateIso);
    now.setMinutes(now.getMinutes() + this.props.endTime);
    const endTime = now.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    return (
      <View style={styles.container}>
        {/* <Text>Service Provider Details</Text> */}
        <View 
            style={{ 
                flex: 1, 
                backgroundColor: '#fff', 
                marginVertical: 15,
                borderTopColor: '#000',
                borderTopWidth: 1,
                borderBottomColor: '#000',
                borderBottomWidth: 1,

            }}
        >
            <View style={{ flex: 2, flexDirection: 'row', marginTop: 4, borderBottomColor: 'grey', borderBottomWidth: 1, marginHorizontal: 30 }}>
                <View 
                    style={{ flex: 1 }}
                >
                    <Image 
                        resizeMode={'contain'} style={{ width: '80%', height: '80%' }} 
                        source={this.props.selectedSchedule.selectedItem.technician.image ? { uri: this.props.selectedSchedule.selectedItem.technician.image } : avatar} 
                    />
                </View>

                <View 
                    style={{ flex: 3 }}

                >
                    <Text style={{ color: '#1a1a1a', fontSize: 20 }}>
                        {this.props.selectedSchedule.selectedItem.technician.first_name} {this.props.selectedSchedule.selectedItem.technician.last_name}
                    </Text>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    {this.getAverageRating(this.props.selectedSchedule.selectedItem.technician.average_rating)}
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 16, color: '#1a1a1a'}}>{appointmentDate}</Text>
                        <Text style={{ fontSize: 16, color: '#1a1a1a' }}>{this.props.selectedSchedule.selectedTime} to {endTime}</Text>
                    </View>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View 
                    style={{ flex: 0, width: 40, marginLeft: 30, marginRight: 10, borderRightWidth: 1, borderRightColor: 'grey' }}
                >
                    <Image source={directionOff} resizeMode={'contain'} style={{ width: 25, height: 25 }} />
                    
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 16, color: '#1a1a1a' }}>9601-9669 Rancho Dr, Escondido, CA...</Text>
                </View>
            </View>

        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'darkkhaki'
    },
  
});
