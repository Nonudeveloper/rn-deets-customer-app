import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../header/Header';
import ServicesList from './ServicesList';
import Loader from '../../../deetscomponents/Loader';


const indicatorOne = require('../../../assets/icons/process1.png');

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
