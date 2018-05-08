import React from 'react';
import { View, Image, Alert, TouchableOpacity } from 'react-native';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import styles from '../styles';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import Loader from '../../../deetscomponents/Loader';
import { ViewPager } from 'rn-viewpager';

const logOutButton = require('../../../assets/icons/logout_pressed.png');
const firstIndicatorStyles  = {
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
      currentPage:0
    }
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(nextState.currentPage != this.state.currentPage) {
      if(this.viewPager) {
        this.viewPager.setPage(nextState.currentPage)
      }
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
    const totalPages = this.props.authVehiclesData.length;

    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator customStyles={firstIndicatorStyles} currentPosition={this.state.currentPage} stepCount={totalPages} />
        </View>
        <ViewPager
          style={{flexGrow:1}}
          onPageSelected={(page) => {this.setState({ currentPage: page.position }); this.props.getSelectedPage(page.position)}}
          >
             {
            this.props.authVehiclesData.map((item, i) =>
          <View key={i} style={{ flex: 1, top: 10 }}>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                <CarPicture getVehicleImage={this.props.getVehicleImage} vehicleImage={item.data.vehicle_image} editable={this.props.editable} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <TouchableOpacity style={{ flex: 1, position: 'absolute' }} onPress={() => this.props.navigation.navigate('addVehicleScreen')} >
                            <Image style={{ width: 100, height: 58 }} source={logOutButton} />
                        </TouchableOpacity>
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
                item={item}
                style={styles.t2} 
                vehicleData={this.props.vehicleData} 
                onRef={ref => (this.child = ref)}
                vehicleInfo={item.data}
                editable={this.props.editable}
                form={'editVehicleForm' + i}
                fetchVehiclesMakeModelByYear={this.props.actions.fetchVehiclesMakeModelByYear}
              /> 
            </View>
            </View>)
        }
          </ViewPager>
      </View>
    );
  }
}
