import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import Header from '../../../header/Header';
import Loader from '../../../../deetscomponents/Loader';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Button from '../../../../deetscomponents/Button';
import StyleConstants from '../../../../config/StyleConstants';

const backButton = require('../../../../assets/icons/add_car_icon_onclick.png');

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    // this.props.getVehicles();
  }

  saveData() {
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
      // this.props.navigation.navigate('paymentInformation');
      this.props.actions.addUpdateVehicle(this.props.form.values, this.props.vehicleImage);
    }
  }

  getVehicleImage(image) {
    this.props.actions.storeVehicleImage(image);
  }

  render() {
    console.log(this.props)
    const { vehicleFetching } = this.props;
    return (
      <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={ {
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          automaticallyAdjustContentInsets={false}
          bounces={false}
          keyboardShouldPersistTaps='always'
      >
          <View style={{ flex: 1 }}>
            <Loader
              loading={vehicleFetching} 
            />
            <Header 
                headerText={'Add Vehicle'} 
                navigation={this.props.navigation} 
                buttonType={'back'} 
                // titleType={'logo'}
                // showRightIcon
                // rightText={'Next'}
                // onPress={() => this.props.navigation.navigate('selectVehicle')}
                // rightImageSource={backButton}
                // rightIconType={'image'}
            />
            <View style={styles.container}>
              <View style={styles.t1}>
                <CarPicture getVehicleImage={this.getVehicleImage.bind(this)} vehicleImage={this.props.navigation.state.params ? this.props.navigation.state.params : null} />
              </View>
              <VehicleForm 
                style={styles.t2} 
                vehicleData={this.props.vehicleData} 
                fetchMakeModel={this.props.fetchMakeModel} 
                isFetching={this.props.isFetching} 
                makeModel={this.props.makeModel}
                models={this.props.models}
                updateModels={this.props.updateModels}
                onRef={ref => (this.child = ref)}
                authVehicleData={this.props.navigation.state.params ? this.props.navigation.state.params : null}
                authUser={this.props.authUser}
              /> 
              <View style={[styles.nextButtonContainer, styles.t3]}>
                <Button 
                  style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                  onPress={this.saveData.bind(this)}
                >
                  save
                </Button>
              </View>
            </View>
          </View>
      </KeyboardAwareScrollView>
    );
  }
}
