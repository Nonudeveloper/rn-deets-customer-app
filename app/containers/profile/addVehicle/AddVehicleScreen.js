import React from 'react';
import { View, Platform, Alert } from 'react-native';
import VehicleForm from './VehicleForm';
import VehicleFormIos from './VehicleFormIos';
import CarPicture from './CarPicture';
import styles from './styles';
import Loader from '../../../deetscomponents/Loader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../../header/Header';

export default class VehicleInformation extends React.Component {

  constructor(props) {
      super(props);
      //props.fetchVehiclesFromAsyncStorage(); 
      this.state = {
          image: {}
      }     
  }

  componentWillMount() {
    //   this.props.getVehicles();
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
        const formType = 'addVehicle';
        this.props.actions.fetchAddNewVehicle(this.props.form.values, this.state.image, formType);
    }
  }

  getVehicleImage(image) {
    console.log(image);
    this.setState({ image });
  }

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
    const { container } = styles;
    const { isFetching } = this.props;
    return (
      <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          automaticallyAdjustContentInsets={false}
          bounces={false}
          keyboardShouldPersistTaps='handled'
      >
       <View style={{ flex: 1 }}>
       {this.props.errorMessageForVehicle !== '' && this.renderAlert(this.props.errorMessageForVehicle.error)}
          <Loader
                loading={isFetching} 
          />
          <Header 
              headerText={'NEW VEHICLE'} 
              navigation={this.props.navigation} 
              showRightIcon
              rightText={'Save'}
              onPress={() => this.goToNext()}
          />
          <View style={container}>
              <View style={styles.t1}>
                <CarPicture getVehicleImage={this.getVehicleImage.bind(this)} />
              </View>
              <View style={{ flex: 3, justifyContent: 'center' }} >
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
                    onRef={ref => (this.child = ref)}
                  />)
                } 
          </View>
          </View>
       </View>
       </KeyboardAwareScrollView>
    );
  }
}
