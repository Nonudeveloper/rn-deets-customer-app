import React from 'react';
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native';
import Header from '../../header/RegisterHeader';
import VehicleForm from './VehicleForm';
import VehicleFormIos from './VehicleFormIos';
import CarPicture from './CarPicture';
import styles from './styles';
import Loader from '../../../components/Loader';

const processTwo = require('../../../assets/icons/process_selection_02.png');


export default class VehicleInformation extends React.Component {

  constructor(props) {
      super(props);
      //props.fetchVehiclesFromAsyncStorage();      
  }

  goToNext() {
    const errors = this.props.form.syncErrors;
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
      this.props.navigation.navigate('paymentInformation');
    }
  }

  getVehicleImage(image) {
    this.props.storeVehicleImage(image);
  }
  
  render() {
    const { container } = styles;
    const { isFetching } = this.props;
    return (
       <View style={{ flex: 1 }}>
          <Loader
                loading={isFetching} 
          />
          <Header 
            headerText={'Vehicle Information'} 
            curre={1} 
            navigation={this.props.navigation} 
            process={processTwo}
          />
          <View style={container}>
              <View style={styles.t1}>
                <CarPicture getVehicleImage={this.getVehicleImage.bind(this)} />
              </View>
                { Platform.OS === 'android' ? ( 
                  <VehicleForm 
                    style={styles.t2} 
                    vehicleData={this.props.vehicleData} 
                    fetchMakeModel={this.props.fetchMakeModel} 
                    isFetching={this.props.isFetching} 
                    makeModel={this.props.makeModel}
                    models={this.props.models}
                    updateModels={this.props.updateModels}
                    onRef={ref => (this.child = ref)}
                  /> 
                  
                  ) : (
                
                  <VehicleFormIos 
                    style={styles.t2} 
                    vehicleData={this.props.vehicleData} 
                    fetchMakeModel={this.props.fetchMakeModel} 
                    isFetching={this.props.isFetching} 
                    makeModel={this.props.makeModel}
                    models={this.props.models}
                    updateModels={this.props.updateModels}
                  /> )
                } 
              <View style={[styles.nextButtonContainer, styles.t3]}>
                  <TouchableOpacity
                    style={styles.nextButtonStyle}
                    onPress={this.goToNext.bind(this)}
                  >
                    <Text style={{ color: '#fff' }}>Next</Text>
                  </TouchableOpacity>
              </View>
          </View>
       </View>
    );
  }
}
