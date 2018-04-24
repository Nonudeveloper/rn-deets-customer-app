import React from 'react';
import { StyleSheet, View } from 'react-native';
import ServiveProviderDetail from './ServiceProviderDetail';
import ServiceDetail from './ServiceDetail';
import CardDetail from './CardDetail';
import Header from '../../header/Header';
import Button from '../../../deetscomponents/Button';

const indicatorFour = require('../../../assets/icons/process4.png');

export default class ReviewScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }


  render() {
    console.log(this.props);
    // const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'Review'}
            showRightIcon
            rightText={'Confirm'}
            onPress={() => this.props.navigation.navigate('selectVehicle')}
            indicatorSource={indicatorFour}
        />
        {/* <Loader loading={isFetching} /> */}
        {/* //sp details component */}
        {/* //appointment details component */}
        {/* //credit card details component */}
        <ServiveProviderDetail selectedSchedule={this.props.selectedSchedule} endTime={this.props.selectedServices.totalEstimationTime} />
        <ServiceDetail selectedServices={this.props.selectedServices} notes={this.props.notes !== undefined ? this.props.notes.notes : ''}/>
        <CardDetail />
        {/* <Button 
            style={{ 
                height: 45,
                borderRadius: 100,
                borderColor: '#a8a8a8',
                marginHorizontal: 25, 
                backgroundColor: '#8ac10b', 
                borderWidth: 4,
            }}
        >Next</Button> */}

      </View>
    );
  }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
  
});
