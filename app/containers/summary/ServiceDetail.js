import React, { Component } from 'react';
import { Text, View, Image, Slider } from 'react-native';
import Hr from '../../deetscomponents/hr';
import styles from './styles';

const userAvatar = require('../../assets/icons/3_user_img.png');

export default class ServiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tipValue: 0
        };
    }

    changedTipValue(ChangedValue) {
        this.setState({ tipValue: ChangedValue });
        this.props.changedTipValue(ChangedValue);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.sliderWrapper}>
                    <View style={styles.sliderContainer}>
                        <Slider
                            step={1}
                            minimumValue={0}
                            maximumValue={30}
                            minimumTrackTintColor='#6CB21B'
                            onValueChange={(ChangedValue) => this.changedTipValue(ChangedValue) }
                            style={{ width: '100%', height: '100%' }} 
                            thumbTintColor='#FFFFFF'
                        />
                    </View>
                    <View style={styles.sliderTextWrapper}>
                        <View style={styles.mainlyUsedContainer}>
                            <Text style={styles.sliderTextStyle}>0% Tip</Text>
                        </View>
                        <View style={styles.mainlyUsedContainer}>
                            <Text style={styles.sliderTextStyle}>{this.state.tipValue === 0 ? '' : this.state.tipValue + '%'}</Text>
                        </View>
                        <View style={styles.mainlyUsedContainer}>
                            <Text style={styles.sliderTextStyle}>30% Tip</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.hrContainer}>
                    <Hr color="black" width={1} marginleft={20} marginright={20}>
                        <Text style={styles.hrTextStyle}>Service Summary</Text>
                    </Hr>
                </View>
                <View style={styles.serviceImageContainer}>
                    <View style={styles.mainlyUsedContainer}>
                        <Image 
                            style={{ width: 80, height: 80 }} 
                            source={this.props.serviceSummaryData !== null ? { uri: this.props.serviceSummaryData.vehicle_image } : userAvatar}
                        />
                    </View>
                    <View style={styles.mainlyUsedContainer}>
                        <Image 
                            style={{ width: 80, height: 80 }} 
                            source={this.props.serviceSummaryData !== null ? { uri: this.props.serviceSummaryData.technician_image } : userAvatar} 
                        />
                    </View>
                    <View style={styles.mainlyUsedContainer}>
                        <Image 
                            style={{ width: 80, height: 80 }} 
                            source={this.props.serviceSummaryData !== null ? { uri: this.props.serviceSummaryData.service_image } : userAvatar} 
                        />
                    </View>
                </View>     
            </View>
        );
    }
}
