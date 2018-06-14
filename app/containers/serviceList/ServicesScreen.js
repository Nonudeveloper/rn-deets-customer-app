import React from 'react';
import { View, ScrollView } from 'react-native';
import Header from '../header/Header';
import ServicesList from './ServicesList';
import Loader from '../../deetscomponents/Loader';
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
    return (
      <View style={styles.container}>
      <Loader loading={this.props.isFetching} />
        <Header 
            navigation={this.props.navigation} 
            headerText={'Services'}
        />
      
        <ScrollView>
          <ServicesPanel services={this.props.services} />
        </ScrollView>
      </View>
    );
  }
}
