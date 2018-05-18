import React from 'react';
import { Text, View, Keyboard, Image, Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Header from '../../header/Header';
import Button from '../../../deetscomponents/Button';
import CommonTextInput from '../../../deetscomponents/form/Input';
import Loader from '../../../deetscomponents/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';


const promoIcon = require('../../../assets/icons/promo_icon.png');

const facebookIcon = (<Icon name="facebook" size={18} color="black" />);
const twitterIcon = (<Icon name="twitter" size={18} color="black" />);
const envelopeIcon = (<Icon name="envelope" size={18} color="black" />);
const info = (<Icon name="flickr" size={18} color="black" />);


class PromotionCodeScreen extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.actions.fetchPromoCode();
    }

    saveData() {
        if (this.props.forms.promotion.values) {
            this.props.actions.usePromoCodeByUser(this.props.forms.promotion.values);
        } else {
            Alert.alert(
                'Error',
                'Promo Codo field is required',
                [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false }
            );
        }
    }

    renderAlert(error) {
        console.log('here')
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

    renderSuccessAlert(success) {
        Alert.alert(
            success,
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
        return (
        <View style={styles.container}>
            <Header 
                navigation={this.props.navigation} 
                headerText={'PROMOTION CODE'}
            />
            <Loader loading={this.props.isFetching} />
            {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
            {this.props.successMessage !== '' && this.renderSuccessAlert(this.props.errorMessage)}
            <View style={{ flex: 1 }}>
                <View style={styles.inputView}>
                    <View style={styles.inputViewInnerContainer}>
                        <Image style={{ height: '50%', width: '10%' }} source={promoIcon} />
                        <Field
                            name={'promo_code'}
                            component={CommonTextInput}
                            props={this.props}
                            placeholder={'Enter Promotional Code'}
                            placeholderTextColor='grey'
                            underlineColorAndroid="transparent"
                            type="text"
                            borderBotmWidth={{ width: 500 }}
                            validate={[
                                (val) => val ? undefined : 'Password field is required',
                            ]}
                        />
                    </View>
                </View>
                <Button 
                    style={styles.applyButton}
                    onPress={() => {
                        Keyboard.dismiss();
                        this.saveData();
                    }}
                >
                    Apply
                </Button>
            </View>
            <View style={styles.textContainer}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Invite friends and relatives to join
                        and expeience how deets is
                        revolutionizing the car wash
                        and detailing industry.
                    </Text>
                </View>
                <View style={styles.iconContainer}>
                    <View style={styles.iconInnerContainer}>
                        {/* <Image style={styles.iconImageStyle} source={buttonIcon} /> */}
                        {twitterIcon}
                    </View>
                    <View style={styles.iconInnerContainer}>
                        {/* <Image style={styles.iconImageStyle} source={buttonIcon} /> */}
                        {facebookIcon}
                    </View>
                    <View style={styles.iconInnerContainer}>
                        {/* <Image style={styles.iconImageStyle} source={buttonIcon} /> */}
                        {envelopeIcon}
                    </View>
                    <View style={styles.iconInnerContainer}>
                        {/* <Image style={styles.iconImageStyle} source={buttonIcon} /> */}
                        {info}
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {this.props.promotionCode !== '' ?
                    <Text style={styles.textStyle}>
                         Share this Promo Code {this.props.promotionCode.promo_code_name} and on your behalf
                        they will receive a ${this.props.promotionCode.dollar_value} credits
                         towards one of our services.
                    </Text>
                    :
                    <Text style={styles.textStyle}>
                        No Promo Code Available
                    </Text>}
                </View>
            </View>
        </View>
        );
    }
}


export default reduxForm({ 
    form: 'promotion'
})(PromotionCodeScreen);
