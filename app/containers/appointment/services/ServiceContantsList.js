import React from 'react';
import { Animated } from 'react-native';
import DetailList from './DetailList';

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

export default class ServiceContantsList extends React.Component {
  constructor(props) {
    super(props);
    selectedArrayRef = new SelectedArray(); 
  }

    getSelectedItems = () => {
      if (selectedArrayRef.getArray().length !== 0) {
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
        const newCost = parseInt(sum);
        const newEstimationTime = parseInt(timeSum);
        console.log(selectedArrayRef.getArray());
        // this.props.navigation.navigate('serviceScreen');
        this.props.getAddOnsData(newCost, newEstimationTime, selectedArrayRef.getArray());
      }  else {
        this.props.getAddOnsData(0, 0, selectedArrayRef.getArray());
      }  
    }

    toutPositions = []

    render() {
      return (
        <Animated.View>
          <DetailList 
              servicesList={this.props.item.included_adds_on} 
              addonsList={this.props.item.excluded_adds_on}
              showServices={this.props.showServices}
              service={this.props.item}
              selectedVehicle={this.props.selectedVehicle}
              selectedArrayRef={selectedArrayRef}
              getSelectedItems={this.getSelectedItems}
              reSchedule={this.props.reSchedule}
          />
        </Animated.View>
      );
    }
  }
