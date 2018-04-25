import React from 'react';
import { View, Image, Text, FlatList, Alert } from 'react-native';
import styles from '../styles';
import Checkbox from '../../../../components/appointment/Checkbox';

const carImage = require('../../../../assets/icons/3_car_img.png');
const downArrow = require('../../../../assets/icons/down_arrow.png');

export default class ServiceDetailHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      ServicesList: [
          { key: 'Exterior Wash (only)' },
          { key: 'Silver Wash' },
          { key: 'Gold Wash' },
          { key: 'Four' },
          { key: 'Five' },
      ],
      AddonsList: [
        { key: 'Add on 1' },
        { key: 'Add on 2' },
        { key: 'Add on 3' },
        { key: 'Add on 4' },
        { key: 'Add on 5' },
      ],
    };
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

  render() {
    // const { item } = this.props;
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
                    (<View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
                      <View style={{ flex: 1 }}>
                      <Checkbox 
                        size={25} 
                        keyValue={item.id} 
                        selectedArrayObject={this.props.selectedArrayRef}  
                        color='#636c72' 
                        label={item} 
                        callback
                        getSelectedItems={this.props.getSelectedItems}
                      />
                      </View>
                      <View style={{ flex: 9, flexDirection: 'column',  }}>
                        <Text 
                          style={{ fontSize: 18, color: 'black'}} 
                          onPress={this.getItem.bind(this, item.adds_on_name)} 
                        > {item.adds_on_name} </Text>
                        <View style={{ flexDirection: 'row', paddingHorizontal: 5 }}>
                        <Text 
                          style={[styles.item, { backgroundColor: 'gray' }]} 
                          onPress={this.getItem.bind(this, item.adds_on_name)} 
                        > {item.adds_on_type_name} </Text>
                        <Text 
                          style={styles.item} 
                          onPress={this.getItem.bind(this, item.adds_on_name)} 
                        > Estimation Time - {item.estimation_time} Mins</Text>
                        </View>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text 
                            style={{ color: '#8ac10b', fontSize: 15 }} 
                        > ${this.props.selectedVehicle.vehicle_type === 2 ? item.large_vehicle_cost : item.small_vehicle_cost} </Text>
                      </View>
                      
                    </View>)
                    }
                    </View>
                      
                    
                }
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            />
        </View>
    );
  }
}

