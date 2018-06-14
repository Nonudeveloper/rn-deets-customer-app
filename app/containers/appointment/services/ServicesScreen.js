import React from 'react';
import { View, ScrollView, Alert } from 'react-native';
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

  renderAlert(error) {
    Alert.alert(
      'Error',
      error,
      [
        { 
          text: 'OK', 
          onPress: () => {
            //dispath an action to make showAlert false
            this.props.actions.hideAlert();
          } 
        },
      ],
      { cancelable: false }
    );
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
        <Loader loading={this.props.technicianFetching} />
        {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
          <ServicesPanel 
              actions={this.props.actions}
              services={this.props.services} 
              selectedVehicle={this.props.selectedVehicle}
              navigation={this.props.navigation}
              reSchedule={this.props.selectedAppointment}
              addressString={this.props.addressString}
              geoLocationData={this.props.geoLocationData}
          />
        {/* </ScrollView> */}
      </View>
    );
  }
}
