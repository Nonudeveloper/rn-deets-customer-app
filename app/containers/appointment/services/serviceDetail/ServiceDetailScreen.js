import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../header/Header';
import ServiceDetailHeader from './ServiceDetailHeader';
import Button from '../../../../deetscomponents/Button';

const indicatorOne = require('../../../../assets/icons/process1.png');
const backButton = require('../../../../assets/icons/2_back_btn_onclick.png');

export default class ServiceDetailScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      item: []
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    }, () => {
      console.log(this.state.item);
    });
  }

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
            <ServiceDetailHeader item={this.state.item} />
            <View style={styles.buttonContainer} >
                <View style={styles.totalPaymentContainer}>
                  <Text style={styles.paymentText}>Total Payment</Text>
                  <Text style={styles.paymentText}>$24</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Button 
                      style={{ 
                          height: 50,
                          borderRadius: 100,
                          borderColor: '#a8a8a8',
                          marginHorizontal: 25, 
                          flex: 0, 
                          backgroundColor: '#8ac10b', 
                      }}
                  >
                    Next
                  </Button>
                </View>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: { 
      flex: 1, 
      justifyContent: 'center' 
    },
    totalPaymentContainer: { 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      top: 15
    },
    paymentText: {
      fontSize: 17,
      color: '#8ac10b'
    }
   
});
