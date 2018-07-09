import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Hr from '../../deetscomponents/hr';
import styles from './styles';
import { renderFormatedTime } from '../../helpers/utility';

export default class PaymentDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceDate: this.formattedDate()
        };
    }

    formattedDate() {
        const today = new Date(this.props.serviceDate);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const newDate = months[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();
        return newDate;
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
                 <View style={styles.dateTimeContainer}>
                    <Hr color="black" width={1} marginleft={20} marginright={20}>
                        <Text style={styles.dateTimeTextStyle}>{this.state.serviceDate} at {renderFormatedTime(this.props.serviceDate)}</Text>
                    </Hr>
                </View>
                <View style={styles.totalPaymentTextContainer}>
                    <Text style={styles.totalPaymentTextStyle}>Total Payment - ${this.props.totalPayment}</Text>
                </View>
                <View style={styles.tipCostContainer}>
                    <Text style={styles.tipCostTextStyle}>${this.props.calculatedTip === 0 ? '0.00' : this.props.calculatedTip}</Text>
                </View>       
            </View>
        );
    }
}
