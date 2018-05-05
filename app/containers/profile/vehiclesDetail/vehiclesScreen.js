import React from 'react';
import { View, Image } from 'react-native';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import styles from '../styles';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';

const logOutButton = require('../../../assets/icons/logout_pressed.png');
const customStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize:18,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  // stepStrokeCurrentColor: '#4aae4f',
  // stepStrokeFinishedColor: '#4aae4f',
  // stepStrokeUnFinishedColor: '#4aae4f',
  // separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#4aae4f',
  // stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#4aae4f',
  stepIndicatorCurrentColor: '#000000',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#ffffff',
  // stepIndicatorLabelFinishedColor: '#ffffff',
  // stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  // labelColor: '#000000',
  labelSize: 13,
  currentStepLabelColor: '#ffffff'
};

export default class VehiclesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        'https://gitlab.pro/yuji/demo/uploads/d6133098b53fe1a5f3c5c00cf3c2d670/DVrj5Hz.jpg_1',
        'https://gitlab.pro/yuji/demo/uploads/2d5122a2504e5cbdf01f4fcf85f2594b/Mwb8VWH.jpg',
        'https://gitlab.pro/yuji/demo/uploads/4421f77012d43a0b4e7cfbe1144aac7c/XFVzKhq.jpg',
        'https://gitlab.pro/yuji/demo/uploads/576ef91941b0bda5761dde6914dae9f0/kD3eeHe.jpg'
      ],
    }
  }

  componentWillMount() {
    this.props.getVehicles();
    this.props.actions.getAuthUserVehicleDetails();
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
      this.props.navigation.goBack();
    }
  }

  getVehicleImage(image) {
    this.props.actions.storeVehicleImage(image);
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
    return (
        <View style={styles.container}>
        {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
        <Swiper loadMinimal showsPagination={false} loadMinimalSize={1} style={{ flex: 1 }} loop={false} >
        {
            this.props.authVehiclesData.map((item, i) =>
          <View key={i} style={{ flex: 1, top: 10 }}>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                <CarPicture getVehicleImage={this.getVehicleImage.bind(this)} vehicleImage={item.data.vehicle_image} editable={this.props.editable} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Image 
                        style={{ width: '67%', height: '35%', }}
                        source={logOutButton}
                    />
                </View>
            </View>
            {/* <View style={[styles.stepIndicatorHeader, {marginHorizontal: 100}]}>
            <StepIndicator
                    customStyles={customStyles}
                    currentPosition={1}
                    stepCount={3}
                />
              </View> */}
            <View style={styles.formContainer}>
            <VehicleForm 
                style={styles.t2} 
                vehicleData={this.props.vehicleData} 
                onRef={ref => (this.child = ref)}
                vehicleInfo={item.data}
                makeModelData={item.makeModel.data}
                editable={this.props.editable}
                form={'editVehicleForm' + i}
              /> 
            </View>
            </View>)
        }
            </Swiper>
        </View>
    );
  }
}

