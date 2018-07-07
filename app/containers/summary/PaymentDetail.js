import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Hr from '../../deetscomponents/hr';
import styles from './styles';

export default class PaymentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPayment: 31,
            calculatedTip: 0.00
        }
    }

    render() {
        return (
            <View style={styles.container}>
                 <View style={styles.dateTimeContainer}>
                    <Hr color="black" width={1} marginleft={20} marginright={20}>
                        <Text style={styles.dateTimeTextStyle}>Jul 6, 2018 at 05:00 AM</Text>
                    </Hr>
                </View>
                <View style={styles.totalPaymentTextContainer}>
                    <Text style={styles.totalPaymentTextStyle}>Total Payment - $31</Text>
                </View>
                <View style={styles.tipCostContainer}>
                    <Text style={styles.tipCostTextStyle}>$ 0.00</Text>
                </View>       
            </View>
        );
    }
}
