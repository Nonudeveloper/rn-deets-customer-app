import React, { Component } from 'react';
import { View, FlatList, Alert, Image, Text } from 'react-native';
import styles from './styles';

const carImage = require('../../../assets/icons/3_car_img.png');
const downArrow = require('../../../assets/icons/down_arrow.png');

class ServicesList extends Component {
  constructor(props) {
    super(props);
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
    return (
      <View style={{ flex: 1 }}>
        <FlatList
            data={this.props.services}
            // ItemSeparatorComponent={this.flatListItemSeparator}
            renderItem={
                ({ item }) => 
            <View style={styles.serviceItemContainer}>
                <View style={styles.serviceContainer}>
                    <View>
                        <Image style={styles.carImage} source={item.image ? { uri: item.image } : carImage} />
                    </View>
                    <View style={styles.serviceInfoContainer}>
                        <View style={styles.serviceNameContainer}>
                            <View style={styles.serviceName}>
                                <Text style={styles.serviceNameText}>{item.service_name}</Text>
                            </View>
                            <View style={styles.servicePrice}>
                                <Text style={styles.servicePriceText}>${item.cost}</Text>
                            </View>
                        </View>
                        <View style={styles.descContainer}>
                            <View style={{ marginHorizontal: 5 }}>
                                <Text style={[styles.descText, { color: '#000' }]}>Estimated Time: {item.estimation_time}</Text>
                                <Text style={[styles.descText, { color: 'grey' }]}>{item.details}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.detailInfoContainer}>
                    <View style={styles.dropItem}>
                        <Text style={{}}>INCLUDED SERVICES</Text>
                        <Image style={styles.downArrow} source={downArrow} />
                    </View>
                    <View style={styles.dropItem}>
                        <Text style={{}}>ADD-ON SERVICES</Text>
                        <Image style={styles.downArrow} source={downArrow} />
                    </View>
                </View>
            </View>
            }
            keyExtractor={() => Math.random().toString(36).substr(2, 9)}
        />
      </View>
    );
  }
}

export default ServicesList;
