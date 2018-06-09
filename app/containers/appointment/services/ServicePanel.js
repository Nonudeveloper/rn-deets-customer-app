import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import ServiceList from './ServicesList';
import styles from './styles';
import PropTypes from 'prop-types';
import Header from '../../header/Header';

const CONTAINER_PADDING_TOP = 10;
const indicatorOne = require('../../../assets/icons/process1.png');

export default class ServicesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection:
        props.activeSection !== undefined
          ? props.activeSection
          : props.initiallyActiveSection,
          item: [],
          initialCost: '',
          totalCost: '',
          initialEstimationTime: '',
          totalEstimationTime: '',
          addOns: [],
          showNext: false
    };
  }
    setScrollRef = node => {
      if (node) {
        this.scrollViewRef = node;
      }
    }

    measurements = [];
    
    handlePressTout = (servicePanelIndex) => {
      this.scrollViewRef.scrollTo({
        y: this.measurements[servicePanelIndex].pageY - CONTAINER_PADDING_TOP,
      });
    }

    handleLayout = (measurements, servicePanelIndex) => {
      if (!this.measurements[servicePanelIndex]) {
        this.measurements[servicePanelIndex] = measurements;
      }
    }

    toggleState(key, item) {
      if (this.state.activeSection === key) {
        this.setState({
          activeSection: false,
          item: [],
          initialCost: '',
          totalCost: '',
          initialEstimationTime: '',
          totalEstimationTime: '',
          addOns: [],
          showNext: false
        });
      } else {
        const isVehicleLarge = this.props.selectedVehicle.vehicle_type === 2 ? 1 : 0;
        this.setState({
            activeSection: key,
            item,
            initialCost: isVehicleLarge ? item.service_Large_cost : item.cost,
            totalCost: isVehicleLarge ? item.service_Large_cost : item.cost,
            initialEstimationTime: item.estimation_time,
            totalEstimationTime: item.estimation_time,
            showNext: true
        });
      }
    }

    getAddOnsData(newCost, newEstimationTime, addOns) {
      const totalCost = parseInt(this.state.initialCost) + parseInt(newCost);
      const totalEstimationTime = parseInt(this.state.initialEstimationTime) + parseInt(newEstimationTime);
      this.setState({
        totalCost,
        totalEstimationTime,
        addOns
      });
    }

    goToNext() {
      const addOnIDs = [];
  
      const data = this.state.addOns;
      data.map((item) => {
          addOnIDs.push(item.vehicle.id);
      });
      const addOnString = data.length > 0 ? addOnIDs.join() : '';
      this.props.actions.storeSelectedServices({ 
        serviceSelected: this.state.item, 
        vehicleSelected: this.props.selectedVehicle, 
        selectedaddOns: data,
        totalCost: this.state.totalCost,
        totalEstimationTime: this.state.totalEstimationTime
      });
      //dispatch createNewServiceAppointment action 
      if (this.props.reSchedule === '') {
        this.props.actions.createNewServiceAppointment(this.state.item, this.props.selectedVehicle, addOnString);
      } else {
        this.props.actions.rescheduleServiceAppointment(this.props.reSchedule.appointment.id, addOnString);
      }
      
      //navigate
      // this.props.navigation.navigate('DateTimeScreen');
    }
  
    render() {
      return (
        <View style={styles.container}>
        <Header 
            headerText={'Deets'} 
            navigation={this.props.navigation} 
            headerText={'Services'}
            showRightIcon={this.state.showNext}
            rightText={'Next'}
            onPress={() => this.goToNext()}
            indicatorSource={indicatorOne}
        />
          <ScrollView
            scrollEventThrottle={20}
            ref={this.setScrollRef}
          >
            <View>
              { this.props.services.length > 0 &&
                this.props.services.map((service, index) => {
                  return (
                    <ServiceList
                      key={index}
                      servicePanelIndex={index}
                      item={service}
                      addons={service.included_adds_on}
                      handleLayout={this.handleLayout}
                      handlePressTout={this.handlePressTout}
                      activeSection={this.state.activeSection}
                      toggleActiveState={this.toggleState.bind(this)}
                      selectedVehicle={this.props.selectedVehicle}
                      reSchedule={this.props.reSchedule}
                      getAddOnsData={this.getAddOnsData.bind(this)}
                    />
                  );
                })
              }
            </View>
          </ScrollView>
          {this.state.activeSection !== false &&
          <View style={styles.buttonContainer} >
                <View style={styles.totalPaymentContainer}>
                  <Text style={[styles.paymentText, { flex: 3 }]}>Total Payment</Text>
                  <Text style={styles.paymentText}>${this.state.totalCost}</Text>
                </View>
            </View>
          }
        </View>
      );
    }
  }


  ServicesPanel.propTypes = {
    initiallyActiveSection: PropTypes.bool,
    activeSection: PropTypes.oneOfType([
      PropTypes.bool, // if false, closes all sections
      PropTypes.number, // sets index of section to open
    ]),
};
 
ServicesPanel.defaultProps = {
  initiallyActiveSection: false,
};