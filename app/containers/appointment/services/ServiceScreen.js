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
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'Services'}
            showRightIcon
            rightText={'Next'}
            onPress={() => this.props.navigation.navigate('selectVehicle')}
            indicatorSource={indicatorOne}
        />
        <Loader loading={isFetching} />
        <ServicesList services={this.props.services} navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
