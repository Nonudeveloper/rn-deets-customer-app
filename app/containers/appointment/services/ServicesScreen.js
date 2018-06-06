import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../../header/Header';
import ServicesList from './ServicesList';
import Loader from '../../../deetscomponents/Loader';
import styles from './styles';
import ServicesPanel from './ServicePanel';


export default class ServiceScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.services.length === 0) {
      this.props.actions.fetchServices();
    }
  }

  render() {
    if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
      <View style={styles.container}>
        {/* <Header 
            navigation={this.props.navigation} 
            headerText={'Services'}
        /> */}
        {/* <ServicesList 
          services={this.props.services}
        /> */}
        {/* <ScrollView> */}
          <ServicesPanel 
              actions={this.props.actions}
              services={this.props.services} 
              selectedVehicle={this.props.selectedVehicle}
              navigation={this.props.navigation}
              reSchedule={this.props.selectedAppointment}
          />
        {/* </ScrollView> */}
      </View>
    );
  }
}
