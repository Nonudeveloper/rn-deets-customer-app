import React from 'react';
import { View, Image, Text, FlatList, Alert } from 'react-native';
import styles from '../styles';

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
                    <Text 
                        style={styles.item} 
                        onPress={this.getItem.bind(this, item.adds_on_name)} 
                    > {item.adds_on_name} </Text>
                    
                }
                keyExtractor={() => Math.random().toString(36).substr(2, 9)}
            />
        </View>
    );
  }
}
