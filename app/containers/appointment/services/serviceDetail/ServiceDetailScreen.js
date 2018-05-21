import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import Header from '../../../header/Header';
import ServiceDetailHeader from './ServiceDetailHeader';
import Loader from '../../../../deetscomponents/Loader';

const indicatorOne = require('../../../../assets/icons/process1.png');

class SelectedArray {
  constructor() {
      this.selectedItemsArray = [];
  }

  setItem(option) {
      this.selectedItemsArray.push(option);
  }

  getArray() {
      return this.selectedItemsArray;
  }
}

class ServiceDetailScreen extends React.Component {

  constructor(props) {
    super(props);
    selectedArrayRef = new SelectedArray(); 
    this.state = {
      item: [],
      initialCost: '',
      totalCost: '',
      initialEstimationTime: '',
      totalEstimationTime: ''
    };
  }

  componentDidMount() {
    this.setState({
      item: this.props.navigation.state.params.item
    }, () => {
        const isVehicleLarge = this.props.selectedVehicle.vehicle_type === 2 ? 1 : 0;
        this.setState({
            initialCost: isVehicleLarge ? this.state.item.service_Large_cost : this.state.item.cost,
            totalCost: isVehicleLarge ? this.state.item.service_Large_cost : this.state.item.cost,
            initialEstimationTime: this.state.item.estimation_time,
            totalEstimationTime: this.state.item.estimation_time,
        });
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
      const totalTime = [];
      const data = selectedArrayRef.getArray();
      data.map((item) => {
        if (this.props.selectedVehicle.vehicle_type === 2) {
          costdata.push(parseInt(item.vehicle.large_vehicle_cost));
        } else {
          costdata.push(parseInt(item.vehicle.small_vehicle_cost));
        }
        totalTime.push(parseInt(item.vehicle.estimation_time));
      });


       let sum = 0;
      for (let i = 0; i < costdata.length; i++) {
        sum += costdata[i];
      }

      let timeSum = 0;
      for (let i = 0; i < totalTime.length; i++) {
        timeSum += totalTime[i];
      }
      const totalCost = parseInt(this.state.initialCost) + parseInt(sum);
      const totalEstimationTime = parseInt(this.state.initialEstimationTime) + parseInt(timeSum);
      this.setState({
        totalCost,
        totalEstimationTime
      });
      console.log(selectedArrayRef.getArray());
      // this.props.navigation.navigate('serviceScreen');
    }    
  }

  goToNext() {
    const addOnIDs = [];
    let addOnString = '';

    const data = selectedArrayRef.getArray();
    data.map((item) => {
        addOnIDs.push(item.vehicle.id);
    });
    addOnString = addOnIDs.join();
    this.props.actions.storeSelectedServices({ 
      serviceSelected: this.state.item, 
      vehicleSelected: this.props.selectedVehicle, 
      selectedaddOns: data,
      totalCost: this.state.totalCost,
      totalEstimationTime: this.state.totalEstimationTime
    });
    //dispatch createNewServiceAppointment action 
    if (this.props.selectedAppointment === '') {
      this.props.actions.createNewServiceAppointment(this.state.item, this.props.selectedVehicle, addOnString);
    } else {
      this.props.actions.rescheduleServiceAppointment(this.props.selectedAppointment.appointment.id, addOnString);
    }
    
    //navigate
    this.props.navigation.navigate('DateTimeScreen');
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
            onPress={() => this.goToNext()}
            indicatorSource={indicatorOne}
        />
        {/* <Loader
              loading={technicianFetching} 
        /> */}
        {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
            <ServiceDetailHeader 
              item={this.state.item} 
              selectedVehicle={this.props.selectedVehicle} 
              selectedArrayRef={selectedArrayRef} 
              getSelectedItems={this.getSelectedItems} 
              reSchedule={this.props.selectedAppointment}
            />
            <View style={styles.buttonContainer} >
                <View style={styles.totalPaymentContainer}>
                  <Text style={[styles.paymentText, { flex: 3 }]}>Total Payment</Text>
                  <Text style={styles.paymentText}>${this.state.totalCost}</Text>
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
      // flex: 1, 
      justifyContent: 'center',
      height: 65
    },
    totalPaymentContainer: { 
      flex: 1, 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      top: 15,
      paddingHorizontal: 15
    },
    paymentText: {
      fontSize: 23,
      color: '#8ac10b',
      fontWeight: 'bold'
    }
   
});


export default ServiceDetailScreen;
