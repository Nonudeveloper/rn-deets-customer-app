import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Header from '../../../header/Header';
import ServiceDetailHeader from './ServiceDetailHeader';
import Button from '../../../../deetscomponents/Button';
import Loader from '../../../../deetscomponents/Loader';

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
      initialCost: '',
      totalCost: ''
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    }, () => {
        if (this.props.selectedVehicle.vehicle_type === 2) {
          this.setState({
            initialCost: this.state.item.service_Large_cost,
            totalCost: this.state.item.service_Large_cost
          });
        } else {
          this.setState({
            initialCost: this.state.item.cost,
            totalCost: this.state.item.cost
          });
        }
    });
  }

  getSelectedItems = () => {
    if (selectedArrayRef.getArray().length === 0) {
      // alert('No Item(s) Selected!');
      this.setState({
        totalCost: this.state.initialCost
      });
    } else {
      const costdata = [];
      const data = selectedArrayRef.getArray();
      data.map((item) => {
        if (this.props.selectedVehicle.vehicle_type === 2) {
          costdata.push(parseInt(item.vehicle.large_vehicle_cost));
        } else {
          costdata.push(parseInt(item.vehicle.small_vehicle_cost));
        }
      });
       let sum = 0;
      for (let i = 0; i < costdata.length; i++) {
        sum += costdata[i];
      }
      const totalCost = parseInt(this.state.initialCost) + parseInt(sum);
      this.setState({
        totalCost
      });
      console.log(selectedArrayRef.getArray());
      // this.props.navigation.navigate('serviceScreen');
    }    
  }

  goToNext() {
    if (selectedArrayRef.getArray().length === 0) {
      const addOns = '';
      this.props.actions.createNewServiceAppointment(this.state.item, this.props.selectedVehicle, addOns);
    } else {
      const costdata = [];
      const data = selectedArrayRef.getArray();
      data.map((item) => {
          costdata.push(item.vehicle.id);
      });
      const addOns = costdata.join();
      this.props.actions.createNewServiceAppointment(this.state.item, this.props.selectedVehicle, addOns);
      this.props.navigation.navigate('DateTimeScreen');
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
    const { technicianFetching } = this.props;
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
        <Loader
              loading={technicianFetching} 
        />
        {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
            <ServiceDetailHeader item={this.state.item} selectedVehicle={this.props.selectedVehicle} selectedArrayRef={selectedArrayRef} getSelectedItems={this.getSelectedItems} />
            <View style={styles.buttonContainer} >
                <View style={styles.totalPaymentContainer}>
                  <Text style={[styles.paymentText, { flex: 3 }]}>Total Payment</Text>
                  <Text style={styles.paymentText}>${this.state.totalCost}</Text>
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
                      onPress={this.goToNext.bind(this)}
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
      top: 15,
      paddingHorizontal: 15
    },
    paymentText: {
      fontSize: 17,
      color: '#8ac10b'
    }
   
});


export default ServiceDetailScreen;
