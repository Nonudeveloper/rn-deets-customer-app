import React from 'react';
import { View, Alert } from 'react-native';
import { LiteCreditCardInput } from 'react-native-credit-card-input'; // 0.4.1
import Header from '../../../header/Header';
import styles from '../styles';
import { getItem } from '../../../../helpers/asyncStorage';
import Loader from '../../../../deetscomponents/Loader';


const BTClient = require('react-native-braintree-xplat');

class CreditCardForm extends React.Component {

    constructor(props) {
        super(props);
        // BTClient.setup('MIIBCgKCAQEAto8NFR7f6BJvtlpTkWG0ISdI6ektkAMBMfVECOMfTr7R6Ujushm/fUGXO/dGsH29XXYir7WsRsv43Ay7LbMtf25C33Ne3+6ds02DDG4b7Ri0H3ddi6+r3QFUn8sJvb6YTRfuYEQ2ZzYXHv2mWOtAYTwlJWAReZssZ/fOJ3QHdurvUstTlZkupur6gGn/tcYKZx49yBj/vJgrPnc+6Wb7N+vnXefwMwUlZfPwy4DoLs4m5U8i1bAtI4snvzCeUQlSPMBJrx5uoQaLK/xS/4JCluFskSl1H6F1z45xA4beHzNjjUC3Z4sd+mXt1hahyfScSgWjqLmC/Wxj4kfdMk/SIwIDAQAB');
    }
    state = {
        card: {
            number: '4111111111111111',
            expirationDate: '10/20', // or "10/2020" or any valid date
            cvv: '400',
            type: ''
        },
        nowCanSubmit: false,
        user: ''
    }

    componentWillMount() {
        this.props.navigation.state.params !== undefined && this.props.navigation.state.params.selectedCard.length !== 0 ? this.props.createBrainTreeClientToken(this.props.navigation.state.params.selectedCard.customer_id) : this.props.getBrainTreeClientToken();
        getItem('user')
            .then(res => {
                this.setState({ user: JSON.parse(res) });
            })
            .catch(err => alert("An error occurred"));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.clientToken !== this.props.clientToken) {
            BTClient.setup(nextProps.clientToken);
        }
    }

    getNonceAndSubmit = (card) => {

        if (this.state.nowCanSubmit) {
            BTClient.getCardNonce(card).then((nonce) => {
                if (this.props.navigation.state.params !== undefined) {
                    const cardDetails = this.props.navigation.state.params.selectedCard;
                    const options = {
                        customer_id: cardDetails.length !== 0 ? cardDetails.customer_id : 0,
                        is_default: 2,
                        email: this.state.user.email,
                        first_name: this.state.user.first_name,
                        last_name: this.state.user.last_name,
                        nonce,
                        type: this.state.card.type,
                        access_token: this.state.user.access_token,
                        process: this.props.navigation.state.params.process,
                        id: cardDetails.length !== 0 ? cardDetails.id : '',
                    };
                    this.props.actions.addNewCardDetails(options);
                }
            })
                .catch((err) => {
                    //error handling
                    console.log(err);
                });
        } else {
            Alert.alert(
                'Error',
                'All Fields are required!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }

    _onChange = (formData) => {
        if (formData.valid) {
            this.setState({
                card: {
                    number: formData.values.number.toString(),
                    expirationDate: formData.values.expiry,
                    cvv: formData.values.cvc,
                    type: formData.values.type
                },
                nowCanSubmit: true
            });
        } else {
            this.setState({
                nowCanSubmit: false
            });
        }
    };

    _onFocus = (field) => console.log('focusing', field);

    renderAlert(error) {
        Alert.alert(
            'Error',
            error,
            [
                {
                    text: 'OK',
                    onPress: () => {
                        //dispath an action to make showAlert false
                        this.props.actions.hideAlert();
                    }
                },
            ],
            { cancelable: false }
        );
    }

    render() {
        const { fetchingCardData } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    navigation={this.props.navigation}
                    headerText={'Credit Card'}
                    showRightIcon
                    rightText={'Add'}
                    onPress={() => this.getNonceAndSubmit(this.state.card)}
                />
                <Loader loading={fetchingCardData} />
                {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
                <View style={styles.container2}>
                    <LiteCreditCardInput
                        autoFocus
                        inputStyle={styles.input}
                        validColor={'#fff'}
                        invalidColor={'red'}
                        placeholderColor={'darkgray'}
                        onFocus={this._onFocus}
                        onChange={this._onChange}
                    />
                </View>
            </View>
        );
    }
}

export default CreditCardForm;
