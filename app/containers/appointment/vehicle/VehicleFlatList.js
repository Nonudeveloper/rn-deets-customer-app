import React from 'react';
import { View, Image, FlatList, TouchableOpacity, Text } from 'react-native';
import VehicleItems from './VehicleItems';
import styles from './styles';


const editButton = require('../../../assets/icons/edit_btn.png');
const notAvailableIcon = require('../../../assets/icons/tech_placeholder_not_available.png');

export default class VehicleFlatList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioItems: [],
      selectedItem: ''
    };
  }

  componentWillMount() {
    if (this.props.userVehicles.length > 0) {
      const userVehicles = [];
      this.props.userVehicles.map((item, i) => {
        if (this.props.rescheduling) {
          if (this.props.rescheduleAppointment !== '' && this.props.rescheduleAppointment.service_vehicle.length !== 0) {
            if (item.vehicle_id === this.props.rescheduleAppointment.service_vehicle[0].user_vehicle_id) {
              item.selected = true;
            } else {
              item.selected = false;
            }
          }
        } else {
          if (i === 0) {
            item.selected = true;
          } else {
            item.selected = false;
          }
        }
        userVehicles.push(item);
      });
      this.setState({
        radioItems: userVehicles
      }, () => {
        this.state.radioItems.map((item) => {
          if (item.selected === true) {
            this.setState({ selectedItem: item });
            this.props.selectedVehicle(item);
          }
        });
      });
    }
  }

  changeActiveRadioButton(index) {
    this.state.radioItems.map((item) => {
      if (item.vehicle_id === index) {
        item.selected = true;
        this.setState({ selectedItem: item });
        this.props.selectedVehicle(item);
      } else {
        item.selected = false;
      }
    });
    this.setState({
      radioItems: this.state.radioItems
    });
    this.props.navigation.navigate('serviceScreen');
  }

  render() {
    return (
      <FlatList
        data={this.state.radioItems}
        extraData={this.state}
        ItemSeparatorComponent={this.FlatListItemSeparator}
        renderItem={({ item }) =>
          <View style={styles.vehicleContainer}>
            <VehicleItems
              key={item.vehicle_id}
              button={item}
              onClick={this.changeActiveRadioButton.bind(this, item.vehicle_id)}
              vehicleMake={item.vehicle_make}
              vehicleYear={item.vehicle_year}
              vehicleColor={item.vehicle_color}
            />
            <View style={{ right: 30 }}>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: item })} >
                <Image
                  source={editButton}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
          </View>}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() =>
          <View style={styles.notAvailableContainer}>
            <View style={styles.notAvailableContainer}>
              <Image source={notAvailableIcon} style={styles.notAvailableImage} />
              <Text style={styles.notAvailableText}>Sorry, No Vehicle Added..</Text>
            </View>
          </View>
        }
      />

    );
  }
}
