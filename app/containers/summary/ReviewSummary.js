import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Button from '../../deetscomponents/Button';
import PaymentDetail from './PaymentDetail';
import ServiceDetail from './ServiceDetail';
import styles from './styles';
import StarRating from 'react-native-star-rating';


const zigzag = require('../../assets/icons/zigzag.png');

export default class ReviewSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipValue: 0,
            totalPayment: 0,
            calculatedTip: 0,
            customStarCount: 0,
        };
    }

    componentDidMount() {
        this.setState({ totalPayment: Number(this.props.summaryData[0].total_cost) });
    }

    onCustomStarRatingPress(rating) {
        this.setState({
          customStarCount: rating,
        });
      }

    changedTipValue(value) {
        const calculatedTip = Number(Number(this.props.summaryData[0].total_cost) * value / 100);
        const totalPayment = Number(Number(this.props.summaryData[0].total_cost) + calculatedTip);
        const newTotal = totalPayment.toFixed(2);
        this.setState({ calculatedTip, totalPayment: newTotal });
    }

    submitData() {
        const payload = {
            user_service_appointment_id: this.props.summaryData[0].service_appointment_id,
            technician_id: this.props.summaryData[0].technician_id,
            flag: 1,
            tip_cost: this.state.calculatedTip,
            rating: this.state.customStarCount,
            comment: 'tip',
        };
            this.props.actions.payTipToTechnician(payload);
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
                    </View>
                    <View style={styles.starsWrapper}>
                    <StarRating
                        disabled={false}
                        emptyStar="ios-star-outline"
                        fullStar="ios-star"
                        halfStar="ios-star-half"
                        iconSet="Ionicons"
                        maxStars={5}
                        rating={this.state.customStarCount}
                        selectedStar={rating => this.onCustomStarRatingPress(rating)}
                        fullStarColor="green"
                        halfStarColor="green"
                        emptyStarColor="green"
                        halfStarEnabled
                        starPadding={10}
                        starStyle={{ marginHorizontal: 15 }}
                        starSize={50}
                    />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button 
                            style={styles.submitButtonStyle}
                            onPress={() => this.submitData()}
                        >
                            Submit
                        </Button>
                    </View>
                </View>
            </View>
        );
    }
}
