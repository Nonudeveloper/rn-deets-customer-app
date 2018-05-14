import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../header/Header';
import ServicesList from './ServicesList';
import { getItem } from '../../../helpers/asyncStorage';
import Loader from '../../../deetscomponents/Loader';

const indicatorOne = require('../../../assets/icons/process1.png');
const backButton = require('../../../assets/icons/2_back_btn_onclick.png');

export default class ServiceScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }

  componentDidMount() {
    if (this.props.services.length === 0) {
      this.props.actions.fetchServices();
    }
  }

  render() {
    console.log(this.props)
    const reSchedule = this.props.navigation.state.params;
    if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'Services'}
            indicatorSource={indicatorOne}
        />
        <ServicesList 
          services={this.props.services} 
          selectedVehicle={reSchedule !== undefined ? this.props.selectedAppointment.appointment.dataValues : this.props.selectedVehicle} 
          navigation={this.props.navigation}
          reSchedule={reSchedule} 
          selectedAppointment={this.props.selectedAppointment}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
