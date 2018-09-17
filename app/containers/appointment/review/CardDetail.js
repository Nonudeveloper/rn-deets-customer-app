import React from 'react';
import { FlatList, View, Text, Image, TouchableOpacity, TouchableHighlight, Modal } from 'react-native';
import styles from './styles';
import Loader from '../../../deetscomponents/Loader';

const visaImage = require('../../../assets/icons/small_VISA.png');
const passwordPoint = require('../../../assets/icons/6_uncheck_btn.png');
const arrowBtn = require('../../../assets/icons/current_arrow_btn.png');

const BTClient = require('react-native-braintree-xplat');

const smallPaypalLogo = require('../../../assets/icons/papal.png');
const visaLogo = require('../../../assets/icons/small_VISA.png');
const popup = require('../../../assets/icons/popup_bg.png');

export default class CardDetail extends React.Component {

    constructor(props) {
        super(props);
        // BTClient.setup('eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwNTQ3MGEyNDUzYzljOTViMDc1ZTJhMGM4NzJmMDVmZmI3NzI4MzdlOGNlNGFlZjdkNDRiMzQzYmRmN2JhMjhkfGNyZWF0ZWRfYXQ9MjAxOC0wMy0zMFQxMTo0Njo0MC40Mzc4NDIwNzIrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=');
        this.state = {
            loading: false,
            modalVisible: false,
            selectedCard: []
        };
    }

    componentWillMount() {
        if (this.props.userCardDetails.length > 0) {
            this.props.userCardDetails.map((item, i) => {
                if (item.is_default === 1) {
                    this.setState(() => {
                        return {
                            selectedCard: item
                        };
                    }, () => {
                        this.props.getSelectedCard(item);
                    });
                }
            });
        }
        this.props.createBrainTreeClientToken();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientToken !== '') {
            BTClient.setup(nextProps.clientToken);
        }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    withPaypal = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            BTClient.showPayPalViewController().then((nonce) => {
                this.setState({ loading: false });
                //payment succeeded, pass nonce to server
                const cardDetails = this.props.userCardDetails.length !== 0 ? this.props.userCardDetails[0] : '';
                const options = {
                    customer_id: 0,
                    // customer_id: cardDetails !== '' ? cardDetails.customer_id : 0,
                    is_default: 2,
                    email: this.props.userDeatail.email,
                    first_name: this.props.userDeatail.first_name,
                    last_name: this.props.userDeatail.last_name,
                    nonce,
                    access_token: this.props.userDeatail.access_token,
                    process: 'home',
                    type: 'Paypal',
                    id: cardDetails !== '' ? cardDetails.id : '',
                };
                this.props.actions.addNewCardDetails(options);
            })
                .catch(function (err) {
                    //error handling
                    console.log(err);
                });
        }, 300);
    }

    withCard = () => {
        this.props.navigation.navigate('creditCardForm', { selectedCard: this.state.selectedCard, process: 'review' });
        this.setModalVisible(!this.state.modalVisible);
    }

    cardSelected(card) {
        this.setState(() => {
            return {
                selectedCard: card
            };
        }, () => {
            this.setModalVisible(!this.state.modalVisible);
            this.props.getSelectedCard(card);
        });
    }

    renderModal = () => {
        return (
            <Modal
                visible={this.state.modalVisible}
                transparent
                animationType={'none'}
                onRequestClose={() => console.log('hjk')}
            >
                <Loader loading={this.state.loading || this.props.fetchingCardData} />
                <View style={styles.modalBackground}>
                    {/* <View style={styles.modalContentContainer}> */}
                    <View style={[styles.modalContentContainer, { height: this.props.userCardDetails.length !== 0 ? 500 : 300 }]}>
                        <View style={styles.modalHeaderContainer}>
                            <View style={styles.cancelContainer}>
                                <TouchableHighlight
                                    underlayColor={'transparent'}
                                    onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                    }}
                                    style={styles.cancelStyle}
                                >
                                    <Text style={styles.modelCancelText}>Cancel</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>Select Payment Method</Text>
                            </View>
                        </View>
                        <View style={styles.modalBodyContainer}>
                            {this.props.userCardDetails.length !== 0 &&
                                <View style={styles.flatlistContainer}>
                                    <Text style={styles.recentText}>RECENT</Text>
                                    <FlatList
                                        data={this.props.userCardDetails}
                                        horizontal
                                        // ItemSeparatorComponent={this.flatListItemSeparator}
                                        renderItem={
                                            ({ item }) =>
                                                <View style={styles.flatlistBodyOuterContainer}>
                                                    <TouchableHighlight
                                                        onPress={() => this.cardSelected(item)}
                                                        style={styles.TouchableHighlightOuterContainer}
                                                    >
                                                        <View style={styles.TouchableHighlightInnerContainer} >
                                                            <Image source={item.type === 'PayPal' ? smallPaypalLogo : visaLogo} style={{ resizeMode: 'contain', width: 80, height: 50 }} />
                                                        </View>
                                                    </TouchableHighlight>
                                                    <View style={styles.paymentTypeContainer}>
                                                        <Text style={styles.paymentTypeText}>{item.type}</Text>
                                                    </View>
                                                    <View style={{ height: 30, width: 110 }}>
                                                        <Text numberOfLines={1} style={{ fontSize: 16, flexWrap: 'wrap' }}>{item.type === 'PayPal' ? item.email : '*** **** **' + item.card_number.toString().substr(-2)}</Text>
                                                    </View>
                                                </View>
                                        }
                                        keyExtractor={() => Math.random().toString(36).substr(2, 9)}
                                    />
                                    <Text style={styles.otherText}>OTHER</Text>
                                </View>
                            }
                            <View style={{ flex: 1, top: 50 }}>
                                <TouchableHighlight underlayColor={'transparent'} onPress={() => this.withPaypal()} >
                                    <View style={styles.paymentItem} >
                                        <View >
                                            <Image source={smallPaypalLogo} style={styles.paypalImg} />
                                        </View>
                                        <View >
                                            <Text style={styles.boldText}>PayPal</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                                <TouchableHighlight onPress={() => this.withCard()}>
                                    <View style={styles.paymentItem}>
                                        <View>
                                            <Image source={visaLogo} style={styles.cardImage} />
                                        </View>
                                        <View >
                                            <Text style={styles.boldText}>Debit or Credit Card</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.cardDetailBodyContainer} >
                    <Text>Payment </Text>
                    {
                        (this.state.selectedCard.length === 0) ?
                            null
                            :
                            (<View style={{ flexDirection: 'row' }}>
                                <Image resizeMode={'contain'} style={{ width: 60, height: 30 }} source={this.state.selectedCard.type === 'PayPal' ? smallPaypalLogo : visaImage} />
                                {
                                    (this.state.selectedCard.type === 'PayPal') ?
                                        (<View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={{ left: 5 }}>{this.state.selectedCard.email}</Text>
                                        </View>)
                                        :
                                        (<View style={styles.passwordImageContainer}>
                                            <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                                            <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                                            <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                                            <Image resizeMode={'contain'} style={styles.passwordImage} source={passwordPoint} />
                                            <Text style={{ left: 5 }}>{this.state.selectedCard.card_number.toString().substr(-4)}</Text>
                                        </View>)
                                }

                            </View>)
                    }
                    <Text style={{ fontWeight: '600' }}> ${this.props.selectedServices.totalCost} </Text>
                    <TouchableOpacity onPress={() => this.setModalVisible(true)}>
                        <Image source={arrowBtn} resizeMode={'contain'} style={{ width: 30, height: 30, marginRight: 1 }} />
                    </TouchableOpacity>
                </View>
                {this.renderModal()}
            </View>
        );
    }
}
