import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from '../styles';

const carImage = require('../../../../assets/icons/3_car_img.png');
const downArrow = require('../../../../assets/icons/down_arrow.png');

export default class ServiceDetailHeader extends React.Component {

  componentWillMount() {
    // this.props.actions.fetchServices({ access_token: this.props.token });
  }

  render() {
    const { item } = this.props;
    return (
        <View style={{ height: 150 }}>
            <View style={styles.serviceContainer}>
                <View>
                    <Image style={styles.carImage} source={carImage} />
                </View>
                <View style={styles.serviceInfoContainer}>
                    <View style={styles.serviceNameContainer}>
                        <View style={styles.serviceName}>
                            <Text style={styles.serviceNameText}>{item.key}</Text>
                        </View>
                        <View style={styles.servicePrice}>
                            <Text style={styles.servicePriceText}>$24</Text>
                        </View>
                    </View>
                    <View style={styles.descContainer}>
                        <Text style={[styles.descText, { color: '#000' }]}>Estimated Time: {item.time}</Text>
                        <Text style={[styles.descText, { color: 'grey' }]}>{item.desc}</Text>
                    </View>
                </View>
            </View>
            <View style={[styles.detailInfoContainer]}>
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
    );
  }
}
