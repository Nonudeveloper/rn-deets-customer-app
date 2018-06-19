import React from 'react';
import { View, Alert } from 'react-native';
import ServiveProviderDetail from './ServiceProviderDetail';
import ServiceDetail from './ServiceDetail';
import CardDetail from './CardDetail';
import Header from '../../header/Header';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';

const indicatorFour = require('../../../assets/icons/process4.png');

export default class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }

  getSelectedCard = (CardDetails) => {
    this.props.actions.storeSelectedCardDetails(CardDetails);
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

  goToNext() {
    const startDate = new Date(this.props.selectedSchedule.selectedDate + ' ' + this.props.selectedSchedule.selectedTime);
    const startTime = startDate.toISOString();
    const startDateTime = new Date(startTime);
    startDateTime.setMinutes(startDateTime.getMinutes() + Number(this.props.selectedServices.totalEstimationTime));
    const endTime = this.getTime(startDateTime);
    // const endTime = startDateTime.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const endDate = new Date(this.props.selectedSchedule.selectedDate + ' ' + endTime);
    const endDateTime = endDate.toISOString();
    const { reSchedule } = this.props;
    const options = {
              cost: this.props.selectedServices.totalCost,
              notes: this.props.notes !== undefined ? this.props.notes.notes : '',
              body_payment_card_id: this.props.selectedCardDetails.id,
              service_end_time: endDateTime,
              service_start_time: startTime,
              technician_id: this.props.selectedSchedule.selectedItem.technician.technician_id,
              user_service_appointment_id: this.props.serviceAppointmentId,
              service_duration_minutes: this.props.selectedServices.totalEstimationTime,
              service_location_zipcode: reSchedule === '' ? this.props.geoLocationData[0].zipcode : reSchedule.appointment.service_location_zipcode,
              service_location_latitude: reSchedule === '' ? this.props.geoLocationData[0].coordinates[1] : reSchedule.appointment.service_location_latitude,
              service_location_longitude: reSchedule === '' ? this.props.geoLocationData[0].coordinates[0] : reSchedule.appointment.service_location_longitude,
              service_location_string: reSchedule === '' ? this.props.addressString : reSchedule.appointment.service_location_string,
    };
    this.props.actions.scheduleNewAppointment(options);
  }

  renderAlert(message) {
    const msg = message.error ? message.error : message.log;
    const heading = message.error ? 'Error' : 'Success';
    Alert.alert(
      heading,
      msg,
      [
        { 
          text: 'OK', 
          onPress: () => {
            //dispath an action to make showAlert false
            this.props.actions.hideAlert();
            if (message.log) {
              this.props.navigation.navigate('appointmentListStack');
            }
          } 
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const { isFetching } = this.props;
    console.log(this.props);
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'Review'}
            showRightIcon
            rightText={'Confirm'}
            onPress={() => this.goToNext()}
            indicatorSource={indicatorFour}
        />
        <Loader loading={isFetching} />
        {this.props.appointmentScheduleMsg !== '' && this.renderAlert(this.props.appointmentScheduleMsg)}
        {/* //sp details component */}
        {/* //appointment details component */}
        {/* //credit card details component */}
        <ServiveProviderDetail selectedSchedule={this.props.selectedSchedule} endTime={this.props.selectedServices.totalEstimationTime} />
        <ServiceDetail selectedServices={this.props.selectedServices} notes={this.props.notes !== undefined ? this.props.notes.value.notes : ''} />
        <CardDetail navigation={this.props.navigation} userCardDetails={this.props.userCardDetails} getSelectedCard={this.getSelectedCard} selectedServices={this.props.selectedServices} />
      </View>
    );
  }
}
