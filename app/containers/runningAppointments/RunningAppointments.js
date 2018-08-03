import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity,ScrollView } from 'react-native';
import Header from '../header/Header';
import TimeInterval from '../home/TimeInterval';
import ItemList from './ItemList';
import VehicleInfo from './VehicleInfo';
import styles from './styles';

const visa = require('../../assets/icons/small_VISA.png');
const smallPaypalLogo = require('../../assets/icons/papal.png');
const passwordPoint = require('../../assets/icons/6_uncheck_btn.png');
const notificationOn = require('../../assets/icons/notification_icon_on.png');
const notificationOff = require('../../assets/icons/notification_icon_off.png');

export default class RunningAppointments extends React.Component {
    

    updatedInterval = (interval) => {
        //    console.log(interval);
    }

    goToSuggestionScreen(item) {
        if (item.suggested_service_adds_on.length !== 0) {
             this.props.navigation.navigate('SuggestedServices');
        }  
    }


    render() {
        const item = this.props.currentRunningAppointments[0];
        const { timeInterval } = this.props.navigation.state.params;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                    headerText={'Service Details'}
                    showRightIcon
                    rightIconType={'image'}
                    rightImageSource={item.suggested_service_adds_on.length !== 0 ? notificationOn : notificationOff}
                    onPress={() => this.goToSuggestionScreen(item)}
                />
                <View style={{ height: 250 }}>
                    <ItemList 
                        item={item} 
                        makeCallToTechnician={() => this.props.actions.makeCallToTechnician(item)}
                        messageToTechnician={() => this.props.actions.messageToTechnician(item)}
                        navigation={this.props.navigation}
                    />
                    <VehicleInfo item={item} />
                </View>
                <View style={{ height: item.service_adds_on.length !== 0 ? (item.service_adds_on.length * 18 + 60) : 50, borderBottomColor: '#000000', borderBottomWidth: 2 }}>
                    <View style={{ height: item.service_adds_on.length !== 0 ? 40 : 50 }}>
                        <View style={styles.serviceCostWrapper} >
                            <View style={styles.serviceNameContainer}>
                                <Text style={styles.serviceNameTextStyle} >
                                    {item.appointment.service_name}
                                </Text>
                            </View>
                            <View style={styles.serviceCostContainer} >
                                <Text style={styles.serviceCostStyle}>
                                    ${item.appointment.service_cost}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        { item.service_adds_on.length !== 0 &&
                            <ScrollView style={{ flex: 1 }}>
                                { item.service_adds_on.length !== 0 && item.service_adds_on.map((items, index) =>
                                    <View key={index} style={styles.addOnsWrapper}>
                                        <View style={styles.addOnsTextWrapper}>
                                            <View style={styles.addOnsFirstTextContainer}>
                                                {
                                                    index === 0 &&
                                                    <Text style={styles.text}>Addon Services - </Text>
                                                }
                                            </View>
                                            <View style={styles.addOnsNameTextContainer}>
                                                <Text numberOfLines={1} style={styles.text}>{items.adds_on_name}</Text>
                                            </View>
                                        </View>
                                        <View style={styles.addOnsCostContainer}>
                                            <Text style={styles.text}>${items.cost}</Text>
                                        </View>
                                    </View>
                                )}  
                            </ScrollView>
                        }
                    </View>
                </View>
                <View style={styles.paymentContainer} >
                    <Text style={{ fontSize: 20 }}>Payment</Text>
                    <Image source={item.payment.length !== 0 && item.payment[0].type === 'PayPal' ? smallPaypalLogo : visa} style={styles.paymentImageStyle} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Text style={styles.paymentTextStyle}>{item.payment[0].card_number.toString().substr(-4)}</Text>
                    </View>
                    <Text style={{ fontSize: 19, color: '#000' }}>
                        ${item.appointment.total_cost}
                    </Text>
                </View>
                <TouchableOpacity style={styles.timeIntervalWrapper} onPress={() => this.goToRunningAppointments()}>
                    <View style={styles.timeIntervalStaticTextContainer}>
                        <Text style={{ fontSize: 18 }}>SERVICE IN PROGRESS :</Text>
                    </View>
                    <TimeInterval 
                        onRef={ref => (this.timeInterval = ref)}
                        currentRunningAppointments={this.props.currentRunningAppointments[0].appointment}
                        updatedInterval={this.updatedInterval}
                        initialTimeInterval={timeInterval}
                        nextScreenTime
                    />
                </TouchableOpacity>
            </View>
        );
    }
}
