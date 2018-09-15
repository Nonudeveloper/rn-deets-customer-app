import React from 'react';
import { Platform, View, Alert } from 'react-native';
import Header from '../../../header/Header';
import Loader from '../../../../deetscomponents/Loader';
import CarPicture from './CarPicture';
import VehicleForm from './VehicleForm';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import Button from '../../../../deetscomponents/Button';
import StyleConstants from '../../../../config/StyleConstants';
import VehicleFormIos from './VehicleFormIos';

const backButton = require('../../../../assets/icons/add_car_icon_onclick.png');

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Add Vehicle'
    };
  }

  componentWillMount() {
    // this.props.getVehicles();
    console.log(this.props);
    this.props.vehicleData.length === 0 ? this.props.getVehicles() : null;
    this.props.setBackToInitialState();
    if (this.props.navigation.state.params.items !== '') {
      this.setState({
        title: 'Update Vehicle'
      });
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
    const { isFetching } = this.props;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={{
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
        automaticallyAdjustContentInsets={false}
        bounces={false}
        keyboardShouldPersistTaps='handled'
      >
        <View style={{ flex: 1 }}>
          <Loader
            loading={isFetching}
          />
          <Header
            headerText={this.state.title}
            navigation={this.props.navigation}
            buttonType={'back'}
            showRightIcon
            rightText={this.state.title === 'Add Vehicle' ? 'Save' : 'Update'}
            onPress={this.saveData.bind(this)}
          />
          {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
          <View style={styles.container}>
            <View style={styles.t1}>
              <CarPicture getVehicleImage={this.getVehicleImage.bind(this)} vehicleImage={this.props.navigation.state.params.items !== '' ? this.props.navigation.state.params.items : null} />
            </View>
            <View style={{ flex: 3, justifyContent: 'center' }} >
              {Platform.OS === 'android' ? (
                <VehicleForm
                  style={styles.t2}
                  vehicleData={this.props.vehicleData}
                  fetchMakeModel={this.props.fetchMakeModel}
                  isFetching={this.props.isFetching}
                  makeModel={this.props.makeModel}
                  models={this.props.models}
                  updateModels={this.props.updateModels}
                  onRef={ref => (this.child = ref)}
                  authVehicleData={this.props.navigation.state.params.items !== '' ? this.props.navigation.state.params.items : null}
                  authUser={this.props.authUser}
                />

              ) : (

                  // <VehicleFormIos
                  //   style={styles.t2}
                  //   vehicleData={this.props.vehicleData}
                  //   fetchMakeModel={this.props.fetchMakeModel}
                  //   isFetching={this.props.isFetching}
                  //   makeModel={this.props.makeModel}
                  //   models={this.props.models}
                  //   updateModels={this.props.updateModels}
                  //   onRef={ref => (this.child = ref)}
                  //   authVehicleData={this.props.navigation.state.params.items !== '' ? this.props.navigation.state.params.items : null}
                  //   authUser={this.props.authUser}
                  // />
                  null
                )
              }
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}
