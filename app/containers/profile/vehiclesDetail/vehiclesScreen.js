import React from 'react';
import { View, Image, Alert, TouchableHighlight, Text, Platform } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import { ViewPager } from 'rn-viewpager';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import VehicleFormIos from './VehicleFormIos';
import styles from '../styless';
import Icon from 'react-native-vector-icons/FontAwesome';

const info = (<Icon name="plus" size={20} color="#28a745" />);


const addVehicleButton = require('../../../assets/icons/add_car_pressed.png');
const logOutClosedButton = require('../../../assets/icons/logout_closed.png');

const firstIndicatorStyles = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 17,
  separatorStrokeWidth: 3,
  currentStepStrokeWidth: 0,
  stepStrokeWidth: 0,
  separatorUnFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#4aae4f',
  stepIndicatorCurrentColor: '#000000',
  stepIndicatorLabelFontSize: 14,
  currentStepIndicatorLabelFontSize: 14,
  stepIndicatorLabelCurrentColor: '#ffffff',
  labelSize: 14,
  currentStepLabelColor: '#ffffff'
};

export default class VehiclesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      marginLeft: 312
    };
    this.vehicleForm = null;
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextState.currentPage !== this.state.currentPage) {
      if (this.viewPager) {
        this.viewPager.setPage(nextState.currentPage);
      }
    }
  }

  blurAll = () => {
    this.vehicleForm.blurAll();
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
      <View style={[{ display: this.props.opacity === 0 ? 'none': 'flex', flex: this.props.flex }]}>
        <View style={{ marginHorizontal: 100 }}>
          <StepIndicator
            customStyles={firstIndicatorStyles}
            currentPosition={this.state.currentPage}
            stepCount={totalPages}
          />
        </View>
        {/* <TouchableHighlight 
            underlayColor={'transparent'} 
            style={styles.floatingVehicleAddButton}
            onPress={() => this.props.navigation.navigate('addVehicleScreen')} 
          >
            <Image style={{ width: 80, height: 52 }} source={addVehicleButton} />
          </TouchableHighlight> */}
        <View style={[styles.logoutButtonContainer, styles.floatingVehicleAddButton, { left: this.state.marginLeft }]}>
          <TouchableHighlight
            underlayColor={'transparent'}
            onPress={this.props.logout}
            style={[styles.touchableLogoutClosedButtonContainer, { marginLeft: 5 }]}
            onPress={() => {
              this.setState({
                marginLeft: this.state.marginLeft === 312 ? 260 : 312
              });
            }}
          >
            {info}
          </TouchableHighlight>
          <TouchableHighlight underlayColor={'transparent'} style={{ width: 60 }} onPress={() => this.props.navigation.navigate('AddEditVehicle', { items: '' })} >
            <Text style={{ color: '#28a745', left: 7 }}>Add</Text>
          </TouchableHighlight>
        </View>
        {this.props.authVehiclesData.length === 0 ?
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18 }}>No vehicle added</Text>
          </View> :
          <ViewPager
            style={{ flexGrow: 1 }}
            onPageSelected={(page) => { this.setState({ currentPage: page.position }); this.props.getSelectedPage(page.position); }}
          >
            {this.props.authVehiclesData.map((item, i) =>

              <View key={i} >
                <View style={[styles.pictureWraper, { justifyContent: 'center' }]}>
                  <CarPicture
                    getVehicleImage={this.props.getVehicleImage}
                    currentPage={this.state.currentPage}
                    vehicleImage={item.vehicle_image}
                    editable={this.props.editable}
                  />

                </View>
                <View style={styles.formContainer}>
                { Platform.OS === 'android' ? ( 

                    <VehicleForm 
                      item={item}
                      style={styles.t2} 
                      vehicleData={this.props.vehicleData} 
                      editable={this.props.editable}
                      form={`editVehicleForm${i}`}
                      fetchVehiclesMakeModelByYear={this.props.actions.fetchVehiclesMakeModelByYear}
                      makeModelData={this.props.makeModelData}
                      count={this.props.count}
                      onRef={ref => this.vehicleForm = ref}
                    />

                    ) : (
                    <VehicleFormIos 
                      item={item}
                      style={styles.t2} 
                      vehicleData={this.props.vehicleData} 
                      onRef={ref => (this.child = ref)}
                      editable={this.props.editable}
                      form={'editVehicleForm' + i}
                      fetchVehiclesMakeModelByYear={this.props.actions.fetchVehiclesMakeModelByYear}
                      makeModelData={this.props.makeModelData}
                      count={this.props.count}
                    />)
                    }
                  
                </View>
              </View>)
            }
          </ViewPager>
        }
      </View>
    );
  }
}
