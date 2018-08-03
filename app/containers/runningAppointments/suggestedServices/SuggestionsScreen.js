import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import Header from '../../header/Header';
import styles from './styles';
import Loader from '../../../deetscomponents/Loader';


const visa = require('../../../assets/icons/small_VISA.png');
const smallPaypalLogo = require('../../../assets/icons/papal.png');
const passwordPoint = require('../../../assets/icons/6_uncheck_btn.png');
const messageIcon = require('../../../assets/icons/messageIcon.png');
const phoneIcon = require('../../../assets/icons/phoneIcon.png');
const avatar = require('../../../assets/icons/3_user_img.png');
const uncheckButton = require('../../../assets/icons/6_uncheck_btn.png');
const checkButton = require('../../../assets/icons/6_check_btn.png');

export default class RunningAppointments extends React.Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            selectedAddons: [],
            newCost: 0
        };
    }


    pushOrFilterAddOns = (addOnsList, id, items) => {
        if (addOnsList.includes(id)) {
            const selectedAddons = addOnsList.filter(item => item !== id);
            const data = items.suggested_service_adds_on.filter(itm => {
                return selectedAddons.indexOf(itm.id) > -1;
                });
            let costSum = 0;
            for (let i = 0; i < data.length; i++) {
                costSum += parseInt(items.appointment.vehicle_type === 1 ? data[i].small_vehicle_cost : data[i].large_vehicle_cost);
            }
            this.setState({ selectedAddons, newCost: costSum });
        } else {
            addOnsList.push(id);
            const data = items.suggested_service_adds_on.filter(itm => {
                return addOnsList.indexOf(itm.id) > -1;
                });
            let costSum = 0;
            for (let i = 0; i < data.length; i++) {
                costSum += parseInt(items.appointment.vehicle_type === 1 ? data[i].small_vehicle_cost : data[i].large_vehicle_cost);
            }
            this.setState({ selectedAddons: addOnsList, newCost: costSum });
        } 
    };

    goToSuggetion(item) {
        const addOnsId = this.state.selectedAddons;
        const data = item.suggested_service_adds_on.filter(itm => {
            return addOnsId.indexOf(itm.id) > -1;
            });
        let costSum = 0;
        for (let i = 0; i < data.length; i++) {
            costSum += parseInt(item.appointment.vehicle_type === 1 ? data[i].small_vehicle_cost : data[i].large_vehicle_cost);
        }
        let timeSum = 0;
        for (let i = 0; i < data.length; i++) {
            timeSum += parseInt(data[i].estimation_time);
        }
        const oldServiceEndTime = new Date(item.appointment.service_end_time);
        oldServiceEndTime.setMinutes(oldServiceEndTime.getMinutes() + Number(timeSum));
        const newServiceEndTime = new Date(oldServiceEndTime);
        const newServiceEndTimeString = newServiceEndTime.toISOString();
        const options = {
            add_ons_id: this.state.selectedAddons.join(),
            technician_id: item.appointment.technician_id,
            old_service_end_time: item.appointment.service_end_time,
            service_appointment_id: item.appointment.id,
            new_service_end_time: newServiceEndTimeString,
            vehicle_type_key_cost: item.appointment.vehicle_type_key_cost,
            request_status: this.state.selectedAddons.length > 0 ? 1 : 2,
            total_payment: Number(item.appointment.total_cost) + costSum
        };
        this.props.actions.acceptOrRejectRequestedService(options);
    }

    renderAlert(message) {
        const msg = message.error ? message.error : message;
        const heading = message.error ? 'Error' : 'Success';
        Alert.alert(
            heading,
            msg,
            [
                { 
                text: 'OK', 
                onPress: () => {
                //dispath an action to make showAlert false
                    this.props.actions.hideAlert();
                    if (heading === 'Success') {
                        this.props.navigation.navigate('HomeComponent');
                    }
                } 
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        const items = this.props.currentRunningAppointments[0];
        return (
            <View style={styles.container}>
                <Header 
                    headerText={'Deets'} 
                    navigation={this.props.navigation} 
                    headerText={'suggestions'}
                    showRightIcon
                    rightText={this.state.selectedAddons.length > 0 ? 'Accept' : 'Ignore'}
                    onPress={() => this.goToSuggetion(items)}
                />
                <Loader loading={this.props.isFetching} />
                {this.props.serviceRequestMessage !== '' && this.renderAlert(this.props.serviceRequestMessage)}
                <View style={styles.providerInfoWrapper}>
                    <View style={styles.providerInfoContainer}>
                        <View style={styles.providerDetailWrapper}>
                            <View style={styles.providerDetailContainer}>
                                <View style={styles.providerImageContainer}>
                                    <Image style={styles.image} source={avatar} />
                                </View>
                                <View style={styles.providerNameContainer}>
                                    <Text numberOfLines={1} style={{ fontSize: 20, color: '#000' }}>{items.user[0].first_name} {items.user[0].last_name}</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 16, color: '#000' }}>has offered you</Text>
                                    <Text numberOfLines={1} style={{ fontSize: 16, color: '#000' }}>addons services.</Text>
                                </View>
                                <View style={styles.options}>
                                    <TouchableOpacity onPress={() => this.props.actions.callToTechnician(items)} >
                                        <Image source={phoneIcon} style={styles.messageIcon} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.actions.messageToTechnician(items)} >
                                        <Image source={messageIcon} style={styles.messageIcon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.serviceDetailContainer}>
                            <View style={styles.serviceNameContainer}>
                                <Text style={styles.serivceNameTextStyle}>{items.appointment.service_name}</Text>
                            </View>
                            <View style={styles.serviceCostContainer}>
                                <Text style={styles.serviceCostTextStyle}>${items.appointment.total_cost === '' ? items.appointment.service_cost : items.appointment.total_cost}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.staticServiceTextContainer}>
                        <Text style={styles.staticServiceTextStyle}>SUGGESTED ADD-ON SERVICES</Text>
                    </View>
                </View>
                <View style={{ flex: 1.5 }}>
                    <FlatList
                        data={items.suggested_service_adds_on}
                        extraData={this.state}
                        renderItem={
                            ({ item }) => 
                            <TouchableOpacity 
                                onPress={() => this.pushOrFilterAddOns(this.state.selectedAddons, item.id, items)}
                                activeOpacity={1}
                            > 
                                <View style={styles.addOnsWrapper}>
                                    <View style={styles.addOnsContainer}>
                                        <View style={{ justifyContent: 'center' }}>
                                            {
                                                this.state.selectedAddons.length !== 0 && this.state.selectedAddons.includes(item.id) ? (
                                                    <Image style={styles.radioImage} source={checkButton} />
                                                ) : (
                                                    <Image style={styles.radioImage} source={uncheckButton} />
                                                )
                                            } 
                                        </View>
                                        <View style={{ flex: 5 }}>
                                            <View style={styles.addOnsNameContainer}>
                                                <Text numberOfLines={1} style={styles.radioContainerText} >{item.adds_on_name}</Text>
                                            </View>
                                            <View style={styles.addOnsEstimateTimeContainer}>
                                                <View style={styles.addOnsStaticTextContainer}>
                                                    <Text numberOfLines={1} style={styles.addOnsStaticTextStyle} >{item.adds_on_type_name}</Text>
                                                </View>
                                                <View style={styles.addOnsEstimateTimeInnerContainer}>
                                                    <Text numberOfLines={1} style={styles.radioContainerTimeText} >Estimate Time - {item.estimation_time} Mins</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.addOnsCostContainer}>
                                            <Text style={styles.radioContainerText} >${items.appointment.vehicle_type === 1 ? item.small_vehicle_cost : item.large_vehicle_cost}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>           
                        }
                        keyExtractor={() => Math.random().toString(36).substr(2, 9)}
                    />
                </View>
                <View style={styles.paymentContainer} >
                    <Text style={{ fontSize: 20 }}>Payment</Text>
                    <Image source={items.payment.length !== 0 && items.payment[0].type === 'PayPal' ? smallPaypalLogo : visa} style={styles.paymentImageStyle} />
                    <View style={styles.paymentImageContainer}>
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                        <Text style={styles.paymentTextStyle}>{items.payment[0].card_number.toString().substr(-4)}</Text>
                    </View>
                    <Text style={styles.paymentCostTextStyle}>
                        ${parseInt(items.appointment.total_cost === '' ? items.appointment.service_cost : items.appointment.total_cost) + this.state.newCost}
                    </Text>
                </View>
            </View>
        );
    }
}
