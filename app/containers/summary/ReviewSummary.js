import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../../deetscomponents/Button';
import PaymentDetail from './PaymentDetail';
import ServiceDetail from './ServiceDetail';
import styles from './styles';


const zigzag = require('../../assets/icons/zigzag.png');
const starOff = require('../../assets/icons/starOff.png');

export default class ReviewSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipValue: 0,
            totalPayment: 0,
            calculatedTip: 0
        };
    }

    componentDidMount() {
        this.setState({ totalPayment: Number(this.props.summaryData[0].total_cost) });
    }

    changedTipValue(value) {
        const calculatedTip = Number(Number(this.props.summaryData[0].total_cost) * value / 100);
        const totalPayment = Number(Number(this.props.summaryData[0].total_cost) + calculatedTip);
        const newTotal = totalPayment.toFixed(2);
        this.setState({ calculatedTip, totalPayment: newTotal });
    }

    render() {
        return (
            <View style={styles.container}>
                <PaymentDetail 
                    calculatedTip={this.state.calculatedTip} 
                    totalPayment={this.state.totalPayment}
                    serviceDate={this.props.summaryData[0].service_start_time}
                />
                <ServiceDetail 
                    changedTipValue={this.changedTipValue.bind(this)} 
                    serviceSummaryData={this.props.summaryData.length !== 0 ? this.props.summaryData[0] : null}
                />
                <View style={styles.container}>
                    <View style={{ flex: 0.5 }}>
                        <Image style={{ width: '100%', height: '100%' }} source={zigzag} />
                    </View>
                    <View style={styles.rateTechnicianWrapper}>
                        <View style={styles.rateTechnicianTextContainer}>
                            <Text style={styles.rateTechnicianTextStyle}>Rate Technician</Text>
                        </View>
                        <View style={styles.rateTechnicianValueContainer}>
                            <Text style={styles.rateTechnicianValueText}>5.0</Text>
                        </View>
                    </View>
                    <View style={styles.starsWrapper}>
                        <TouchableOpacity style={styles.starImageContainer} onPress={()=> console.log('outer')}>
                            <TouchableOpacity style={{ position:'absolute' }} onPress={()=> console.log('inner')}>
                                <Image style={styles.starImageStyle} source={starOff} />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.starImageContainer}>
                            <Image style={styles.starImageStyle} source={starOff} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.starImageContainer}>
                            <Image style={styles.starImageStyle} source={starOff} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.starImageContainer}>
                            <Image style={styles.starImageStyle} source={starOff} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.starImageContainer}>
                            <Image style={styles.starImageStyle} source={starOff} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            style={styles.submitButtonStyle}
                            // onPress={() => this.setState({ showSummaryReview: true })}
                        >
                            Submit
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
