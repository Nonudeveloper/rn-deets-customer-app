import React from 'react';
import { View, Image, Text, FlatList, Alert } from 'react-native';
import styles from '../styles';
import AddonItemsScreen from './addOnItemsScreen';

// const carImage = require('../../../../assets/icons/3_car_img.png');
// const downArrow = require('../../../../assets/icons/down_arrow.png');

export default class ServiceDetailHeader extends React.Component {

  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
    // this.props.actions.fetchServices({ access_token: this.props.token });
  }

  getItem(item) {
    Alert.alert(item);
  }

  flatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  checkAddOns() {
    
  }

  render() {
    return (
      
        <View style={{ backgroundColor: '#fff' }}>
            <FlatList
                data={this.props.showServices ? this.props.servicesList : this.props.addonsList}
                ItemSeparatorComponent={this.flatListItemSeparator}
                renderItem={
                    ({ item }) => 
                    <View style={{ flex: 1, height: 65, flexDirection: 'row', alignItems: 'center' }}>
                    {
                      (this.props.showServices)
                      ?
                      (<View style={{ flex: 3 }}>
                        <Text 
                          style={styles.item} 
                          onPress={this.getItem.bind(this, item.adds_on_name)} 
                        > {item.adds_on_name} </Text>
                      </View>)
                      :
                      (<AddonItemsScreen 
                          size={20} 
                          keyValue={item.id} 
                          selectedArrayObject={this.props.selectedArrayRef}  
                          color='#636c72' 
                          label={item} 
                          callback
                          getSelectedItems={this.props.getSelectedItems}
                          item={item}
                          selectedVehicle={this.props.selectedVehicle}
                          reSchedule={this.props.reSchedule}
                      />)
                    }
                    </View>
                      
                    
                }
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            />
        </View>
    );
  }
}

