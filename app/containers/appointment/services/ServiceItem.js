import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const carImage = require('../../../assets/icons/3_car_img.png');
const downArrow = require('../../../assets/icons/down_arrow.png');

export default class ServiceItem extends React.Component {

    constructor(props) {
        super(props);
    }

    singleService = (item) => {
        this.props.navigation.navigate('serviceDetailScreen', { item });
    }

    render() {
        const { item } = this.props;
        return (
            <TouchableOpacity onPress={() => this.singleService(item)}>
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
                                <Text style={styles.servicePriceText}>${this.props.selectedVehicle.vehicle_type === 2 ? item.service_Large_cost : item.cost}</Text>
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
            </TouchableOpacity>
        );
    }
}
