import React from 'react';
import { Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import Checkbox from '../../../components/appointment/Checkbox';
import RadioButton from '../../../components/appointment/RadioButton';
import styles from './styles';


const vehicleIcon = require('../../../assets/icons/car_place_holder.png');
const editButton = require('../../../assets/icons/edit_btn.png');

export default class VehicleFlatList extends React.Component {
    constructor(props) {
      super(props);
      this.state = { 
        radioItems: [], 
        selectedItem: '' 
      };
    }

    componentWillReceiveProps(newProps) {
      if (newProps.userVehicles.length > 0) {
        const userVehicles = [];
        newProps.userVehicles.map((item, i) => {
          if (i === 0) {
            item.selected = true;
          } else {
            item.selected = false;
          }
          userVehicles.push(item);
        });
        this.setState({
          radioItems: userVehicles
        }, () => {
        this.state.radioItems.map((item) => {
              if (item.selected === true) {
                return this.setState({ selectedItem: item });
              }
          });
        });
      }
    }

    changeActiveRadioButton(index) {
      this.state.radioItems.map((item) => {
          if (item.vehicle_id === index) {
            item.selected = true;
            this.setState({
              selectedItem: item
            })
          } else {
            item.selected = false;
          }
        });
        this.setState({
          radioItems: this.state.radioItems
        });
    }


  render() {
    return (
        <FlatList
            data={this.state.radioItems}
            extraData={this.state} 
            ItemSeparatorComponent={this.FlatListItemSeparator}
            renderItem={({ item }) => 
                <View style={styles.vehicleContainer}>
                  <View style={styles.radioButtonContainer}>
                    <RadioButton key={item.vehicle_id} button={item} onClick={this.changeActiveRadioButton.bind(this, item.vehicle_id)} />
                  </View>
                  {this.props.selectedVehicle(this.state.selectedItem)}
                  <View style={styles.vehicleInnerContainer}>
                    <View style={{ flex: 1 }}>
                      <Image source={vehicleIcon} style={{ width: 80, height: 80 }} />
                    </View>
                    <View style={{ flex: 2 }}>
                      <Text style={styles.vehicleFont}>{item.vehicle_make}</Text>
                      <Text style={styles.vehicleFont}>{item.vehicle_year}, {item.vehicle_color}</Text>
                      <Text style={styles.licenceFont}>HSHSB</Text>
                    </View>
                  </View>
                  <View style={{ right: 15 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: item })} >
                        <Image 
                          source={editButton} 
                          style={{ width: 30, height: 30 }}
                        />
                    </TouchableOpacity>
                  </View>
                </View>}
            keyExtractor={(item, index) => index.toString()}
        />
       
    );
  }
}
 