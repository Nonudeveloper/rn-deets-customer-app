import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, Dimensions } from 'react-native';
import Header from '../../header/RegisterHeader';
import Button from '../../../components/button';

const processThree = require('../../../assets/icons/process_selection_03.png');
const buttonIcon = require('../../../assets/icons/3_paypal_icon.png');

export default class PaymentInformation extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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
                  <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableHighlight
                      onPress={() => {
                        this.setModalVisible(!this.state.modalVisible);
                      }}
                      style={styles.cancelStyle}
                    >
                      <Text>Cancel</Text>
                    </TouchableHighlight>
                    <Text>Select Payment Method</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: '#00000040',
  },
  modalContentContainer: {
    backgroundColor: '#e6e6e6',
    height: 200,
    width: Dimensions.get('window').width - 10,
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelStyle: { 
    position: 'absolute', 
    left: 0 
  }
});
