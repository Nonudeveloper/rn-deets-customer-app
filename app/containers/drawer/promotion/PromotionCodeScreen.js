import React from 'react';
import { Text, View, Keyboard, Image, Alert } from 'react-native';
import { Field, reduxForm } from 'redux-form';
import Header from '../../header/Header';
import Button from '../../../deetscomponents/Button';
import CommonTextInput from '../../../deetscomponents/form/Input';
import styles from './styles';


const promoIcon = require('../../../assets/icons/promo_icon.png');
const buttonIcon = require('../../../assets/icons/edit_btn.png');


class PromotionCodeScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.actions.fetchCardDetails();
  }

  saveData() {
    const errors = this.props.forms.promotion.syncErrors;
    let errorCount = 0;
    for (const error in errors) {
      if (errors[error] !== undefined && errorCount === 0) {
        Alert.alert(
          'Error',
          errors[error],
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
        errorCount++;
      }
   }
   if (errorCount === 0) {
    // this.props.navigation.navigate('vehicleInformation');
   }
}
  
  render() {
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'PROMOTION CODE'}
        />
        <View style={{ flex: 1 }}>
            <View style={styles.inputView}>
                <View style={styles.inputViewInnerContainer}>
                    <Image style={{ height: '50%', width: '10%' }} source={promoIcon} />
                    <Field
                        name={'promo_code '}
                        component={CommonTextInput}
                        props={this.props}
                        placeholder={'Enter Promotional Code'}
                        placeholderTextColor='grey'
                        underlineColorAndroid="transparent"
                        type="text"
                        borderBotmWidth={{ width: 500 }}
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
                        <Image style={styles.iconImageStyle} source={buttonIcon} />
                    </View>
                    <View style={styles.iconInnerContainer}>
                        <Image style={styles.iconImageStyle} source={buttonIcon} />
                    </View>
                    <View style={styles.iconInnerContainer}>
                        <Image style={styles.iconImageStyle} source={buttonIcon} />
                    </View>
                    <View style={styles.iconInnerContainer}>
                        <Image style={styles.iconImageStyle} source={buttonIcon} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={styles.textStyle}>
                        Share this Promo Code
                        PROMO10 and on your behalf
                        they will receive a $50 credits
                        towards one of our services.
                    </Text>
                </View>

        </View>
      </View>
    );
  }
}


export default reduxForm({ 
    form: 'promotion',
    validate: (values) => {
        const errors = {};
        errors.promo_code  = !values.promo_code 
          ? 'Promo Codo field is required'
          : undefined;
          
        return errors;
    },
})(PromotionCodeScreen);
