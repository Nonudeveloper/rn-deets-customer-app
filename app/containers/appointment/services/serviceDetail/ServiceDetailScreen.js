import React from 'react';
import { StyleSheet, View } from 'react-native';
import Header from '../../../header/Header';
import ServiceDetailHeader from './ServiceDetailHeader';
import Button from '../../../../deetscomponents/Button';

const indicatorOne = require('../../../../assets/icons/process1.png');
const backButton = require('../../../../assets/icons/2_back_btn_onclick.png');

export default class ServiceDetailScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Header 
            headerText={'Deets'} 
            navigation={this.props.navigation} 
            headerText={'Services'}
            showRightIcon
            rightText={'Next'}
            onPress={() => this.props.navigation.navigate('selectVehicle')}
            indicatorSource={indicatorOne}
        />
            <ServiceDetailHeader item={{ key: 'myWash', desc: 'heha', time: 'whatever' }} />
            
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
