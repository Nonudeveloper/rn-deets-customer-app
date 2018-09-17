import React from 'react';
import { FlatList, View, Text, Image, TouchableHighlight } from 'react-native';
import styles from './styles';
import Loader from '../../deetscomponents/Loader';


const BTClient = require('react-native-braintree-xplat');

const smallPaypalLogo = require('../../assets/icons/papal.png');
const visaLogo = require('../../assets/icons/small_VISA.png');

export default class CardDetail extends React.Component {

    constructor(props) {
        super(props);
        // BTClient.setup('eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwNTQ3MGEyNDUzYzljOTViMDc1ZTJhMGM4NzJmMDVmZmI3NzI4MzdlOGNlNGFlZjdkNDRiMzQzYmRmN2JhMjhkfGNyZWF0ZWRfYXQ9MjAxOC0wMy0zMFQxMTo0Njo0MC40Mzc4NDIwNzIrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=');
        this.state = {
            count: 0,
            loading: false
        };
    }


    componentWillMount() {
        this.props.actions.fetchCardDetails();
        this.props.getBrainTreeClientToken();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientToken !== this.props.clientToken) {
            BTClient.setup(nextProps.clientToken);
        }
        if (nextProps.userCardDetails !== this.props.userCardDetails && nextProps.userCardDetails.length !== 0 && this.state.count !== 0) {
            this.props.createBrainTreeClientToken(nextProps.userCardDetails[0].customer_id);
            this.setState({ count: 1 });
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
        const cardDetail = this.props.userCardDetails.length !== 0 ? this.props.userCardDetails[0] : [];
        this.props.navigation.navigate('creditCardForm', { selectedCard: cardDetail, process: 'payment' });
        this.props.setModalVisible(false);
    }


    render() {
        return (
            <View style={styles.modalBackground}>
                <Loader loading={this.state.loading || this.props.fetchingCardData} />
                <View style={[styles.modalContentContainer, { height: this.props.userCardDetails.length !== 0 ? 500 : 300 }]}>
                    <View style={styles.modalHeaderContainer}>
                        <View style={styles.cancelContainer}>
                            <TouchableHighlight
                                onPress={() => {
                                    this.props.setModalVisible(false);
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
        );
    }
}
