import React from 'react';
import { View, Image, Alert, TouchableHighlight } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { ViewPager } from 'rn-viewpager';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import styles from '../styless';


const addVehicleButton = require('../../../assets/icons/add_car_pressed.png');

const firstIndicatorStyles = {
  stepIndicatorSize: 18,
  currentStepIndicatorSize: 18,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorUnFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#4aae4f',
  stepIndicatorCurrentColor: '#000000',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#ffffff',
  labelSize: 13,
  currentStepLabelColor: '#ffffff'
};

export default class VehiclesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0
    };
  }


  componentWillMount() {
    // this.props.getVehicles();
    // this.props.actions.getAuthUserVehicleDetails();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.currentPage !== this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage);
      }
    }
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

  render() {
    const totalPages = this.props.authVehiclesData.length;
    return (
      <View style={[{ opacity: this.props.opacity, flex: this.props.flex }]}>
          <View style={{ marginHorizontal: 100, top: 5 }}>
            <StepIndicator 
              customStyles={firstIndicatorStyles} 
              currentPosition={this.state.currentPage} 
              stepCount={totalPages} 
            />
        </View>
        <ViewPager
          style={{ flexGrow: 1 }}
          onPageSelected={(page) => { this.setState({ currentPage: page.position }); this.props.getSelectedPage(page.position); }}
        >
          {this.props.authVehiclesData.map((item, i) =>
         
          <View key={i} >
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                  <CarPicture 
                    getVehicleImage={this.props.getVehicleImage} 
                    currentPage={this.state.currentPage} 
                    vehicleImage={item.data.vehicle_image} 
                    editable={this.props.editable} 
                  />
                </View>
                <View style={[styles.logoutButtonContainer, {}]}>
                    <TouchableHighlight 
                      underlayColor={'transparent'} 
                      style={{ position: 'absolute' }} 
                      onPress={() => this.props.navigation.navigate('addVehicleScreen')} 
                    >
                      <Image style={{ width: 80, height: 52 }} source={addVehicleButton} />
                    </TouchableHighlight>
                </View>
            </View>
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
