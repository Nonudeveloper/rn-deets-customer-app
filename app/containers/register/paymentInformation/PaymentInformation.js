import React from 'react';
import { Text, View, Modal, TouchableHighlight, Image } from 'react-native';
import Header from '../../header/RegisterHeader';
import Button from '../../../components/Button';
import styles from './styles';

const BTClient = require('react-native-braintree-xplat');

const processThree = require('../../../assets/icons/process_selection_03.png');
const buttonIcon = require('../../../assets/icons/3_paypal_icon.png');
const smallPaypalLogo = require('../../../assets/icons/papal.png');
const visaLogo = require('../../../assets/icons/small_VISA.png');


export default class PaymentInformation extends React.Component {

  constructor(props) {
    super(props);
    BTClient.setup('eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiIwNTQ3MGEyNDUzYzljOTViMDc1ZTJhMGM4NzJmMDVmZmI3NzI4MzdlOGNlNGFlZjdkNDRiMzQzYmRmN2JhMjhkfGNyZWF0ZWRfYXQ9MjAxOC0wMy0zMFQxMTo0Njo0MC40Mzc4NDIwNzIrMDAwMFx1MDAyNm1lcmNoYW50X2lkPTM0OHBrOWNnZjNiZ3l3MmJcdTAwMjZwdWJsaWNfa2V5PTJuMjQ3ZHY4OWJxOXZtcHIiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvMzQ4cGs5Y2dmM2JneXcyYi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzLzM0OHBrOWNnZjNiZ3l3MmIvY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tLzM0OHBrOWNnZjNiZ3l3MmIifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiQWNtZSBXaWRnZXRzLCBMdGQuIChTYW5kYm94KSIsImNsaWVudElkIjpudWxsLCJwcml2YWN5VXJsIjoiaHR0cDovL2V4YW1wbGUuY29tL3BwIiwidXNlckFncmVlbWVudFVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS90b3MiLCJiYXNlVXJsIjoiaHR0cHM6Ly9hc3NldHMuYnJhaW50cmVlZ2F0ZXdheS5jb20iLCJhc3NldHNVcmwiOiJodHRwczovL2NoZWNrb3V0LnBheXBhbC5jb20iLCJkaXJlY3RCYXNlVXJsIjpudWxsLCJhbGxvd0h0dHAiOnRydWUsImVudmlyb25tZW50Tm9OZXR3b3JrIjp0cnVlLCJlbnZpcm9ubWVudCI6Im9mZmxpbmUiLCJ1bnZldHRlZE1lcmNoYW50IjpmYWxzZSwiYnJhaW50cmVlQ2xpZW50SWQiOiJtYXN0ZXJjbGllbnQzIiwiYmlsbGluZ0FncmVlbWVudHNFbmFibGVkIjp0cnVlLCJtZXJjaGFudEFjY291bnRJZCI6ImFjbWV3aWRnZXRzbHRkc2FuZGJveCIsImN1cnJlbmN5SXNvQ29kZSI6IlVTRCJ9LCJtZXJjaGFudElkIjoiMzQ4cGs5Y2dmM2JneXcyYiIsInZlbm1vIjoib2ZmIn0=');
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  withPaypal = () => {
    console.log('in with paypal');
    BTClient.showPayPalViewController().then(function(nonce) {
      //payment succeeded, pass nonce to server
      console.log(nonce);
    })
    .catch(function(err) {
      //error handling
      console.log(err);
    });
  }

  withCard = () => {
    this.setModalVisible(!this.state.modalVisible);
    this.props.navigation.navigate('creditCardForm');
  }

  renderModal = () => {
    return (
        <Modal
            visible={this.state.modalVisible} 
            transparent
            animationType={'none'}
            onRequestClose={() => console.log('hjk')}
        >
           <View style={styles.modalBackground}>
                <View style={styles.modalContentContainer}>
                  <View style={styles.modalHeaderContainer}>
                    <View style={styles.cancelContainer}>
                      <TouchableHighlight
                        onPress={() => {
                          this.setModalVisible(!this.state.modalVisible);
                        }}
                        style={styles.cancelStyle}
                      >
                        <Text style={{ color: '#4da6ff' }}>Cancel</Text>
                      </TouchableHighlight>
                    </View>
                    <View style={styles.titleContainer}>
                      <Text style={styles.title}>Select Payment Method</Text>
                    </View>
                  </View>
                  <View style={styles.modalBodyContainer}>
                        <TouchableHighlight onPress={() => this.withPaypal()}>
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
                            <View >
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
        </Modal>
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
          <Header 
            headerText={'Payment Information'} 
            curre={1} 
            navigation={this.props.navigation} 
            process={processThree}
          />
        <View style={{ flex: 1 }}>
          <Button 
            style={{ 
              borderWidth: 4, 
              borderColor: '#b3d9ff', 
              backgroundColor: '#4da6ff',
              borderRadius: 100,
              marginHorizontal: 25,
              marginTop: 20 
            }}
            source={buttonIcon}
            onPress={() => {
              this.setModalVisible(true);
            }}
          >
            Add Payment Method
          </Button>
        </View>
          {this.renderModal()}
            
      </View>
    );
  }
}
