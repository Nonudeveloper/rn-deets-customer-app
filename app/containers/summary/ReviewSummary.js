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
            tipValue: 0
        };
    }

    changedTipValue(value) {
        this.setState({ tipValue: value });
    }

    render() {
        console.log(this.state);
        const { user_pending_tip_notifications } = this.props.summaryData;
        return (
            <View style={styles.container}>
                <PaymentDetail tipValue={this.state.tipValue} />
                <ServiceDetail changedTipValue={this.changedTipValue.bind(this)} />
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
