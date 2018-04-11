import React from 'react';
import { View, Image, Text, FlatList, Alert } from 'react-native';
import styles from '../styles';

const carImage = require('../../../../assets/icons/3_car_img.png');
const downArrow = require('../../../../assets/icons/down_arrow.png');

export default class ServiceDetailHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { FlatListItems: [
        { key: 'Exterior Wash (only)' },
        { key: 'Silver Wash' },
        { key: 'Gold Wash' },
        { key: 'Four' },
        { key: 'Five' },
    ] };
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
                data={this.state.FlatListItems}
                ItemSeparatorComponent={this.flatListItemSeparator}
                renderItem={
                    ({ item }) => 
                    // render a custom item component here
                    <Text 
                        style={styles.item} 
                        onPress={this.getItem.bind(this, item.key)} 
                    > {item.key} </Text>
                    
                }
            />
        </View>
    );
  }
}
