import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Header from '../../../header/Header';
import ServiceDetailHeader from './ServiceDetailHeader';
import Button from '../../../../deetscomponents/Button';

const indicatorOne = require('../../../../assets/icons/process1.png');
const backButton = require('../../../../assets/icons/2_back_btn_onclick.png');

class SelectedArray {
  constructor() {
      selectedItemsArray = [];
  }

  setItem(option) {
      selectedItemsArray.push(option);
  }

  getArray() {
      return selectedItemsArray;
  }
}

class ServiceDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    selectedArrayRef = new SelectedArray(); 
    this.state = {
      item: [],
      totalCost: ''
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    }, () => {
      console.log(this.state.item);
    });
  }

  getSelectedItems = () => {
    if (selectedArrayRef.getArray().length === 0) {
      alert('No Item(s) Selected!');
    } else {
      const costdata = [];
      const data = selectedArrayRef.getArray();
      data.map((item) => {
        if (this.props.selectedVehicle.vehicle_type === 2) {
          costdata.push(parseInt(item.vehicle.large_vehicle_cost));
        } else {
          costdata.push(parseInt(item.vehicle.small_vehicle_cost));
        }
        
      })
      console.log(costdata);
      costdata.reduce((a, b) => console.log(a + b));
      console.log(selectedArrayRef.getArray());
      // this.props.navigation.navigate('serviceScreen');
    }    
  }
  

  render() {
    console.log(this.state.item)
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
            <ServiceDetailHeader item={this.state.item} selectedVehicle={this.props.selectedVehicle} selectedArrayRef={selectedArrayRef} getSelectedItems={this.getSelectedItems} />
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
                      onPress={this.getSelectedItems}
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


export default ServiceDetailScreen;
