import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../header/RegisterHeader';
import Button from '../../../components/button';

const processThree = require('../../../assets/icons/process_selection_03.png');
const buttonIcon = require('../../../assets/icons/3_paypal_icon.png');
export default class PaymentInformation extends React.Component {

  constructor(props) {
    super(props);
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
              marginHorizontal: 25 
            }}
            source={buttonIcon}
          >
            Add Payment Method
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
