import React from 'react';
import { View, TouchableOpacity, Dimensions, Image, Text, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import Header from '../header/Header';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';
import Button from '../../deetscomponents/Button';
import Loader from '../../deetscomponents/Loader';
import StyleConstants from '../../config/StyleConstants';
import DetailsItem from './DetailsItem';
import VehiclesScreen from './vehiclesDetail/index';

const window = Dimensions.get('window');
const editButton = require('../../assets/icons/edit_normal.png');
const logOutButton = require('../../assets/icons/logout_pressed.png');
const tickButton = require('../../assets/icons/tick_normal.png');

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    if (Platform.OS === 'android') {
          UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    this.state = {
        profileEditable: false,
        vehicleEditable: false,
        newImage: '',
        showPasswordButton: true,
        detailFlexValue: 2,
        vehicleFlexValue: 1,
        showDetailEditButton: true,
        showVehicleEditButton: false,
        showDetail: true,
        showVehicle: false,
        showDetailWidth: window.width,
        showVehicleWidth: 0,
        showDetailFlex: 1,
        showVehicleFlex: 0,
        stretchFlex: 3,
        image: '',
        selectedPage: 0
    };
  }

  componentWillMount() {
      this.props.actions.fetchAuthUserDetails();
  }

  getImage(image) {
      this.setState({ newImage: image });
  }

  editDetails() {
    this.state.profileEditable ? 
    this.setState(() => {
        return {
            profileEditable: false,
            showPasswordButton: true
        };
    }, () => {
        this.saveData();
    })
    :
    this.setState({
        profileEditable: true,
        showPasswordButton: false
    });
  } 

  editVehicles() {
    this.state.vehicleEditable ? 
    this.setState(() => {
        return {
            vehicleEditable: false,
        };
    }, () => {
        this.saveEditVehicleData();
    })
    :
    this.setState({
        vehicleEditable: true,
    });
  }

  saveData() {
    const errors = this.props.form.profileDetails.syncErrors;
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
       this.props.actions.editUserProfile(this.props.form.profileDetails.values, this.state.newImage);
    }
  }

  goToNext() {
    this.props.navigation.navigate('changePasswordScreen');
  }

  saveEditVehicleData() {
    const errors = this.props.form['editVehicleForm' + this.state.selectedPage].syncErrors;
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
    //    this.props.actions.editUserProfile(this.props.form.profileDetails.values, this.state.newImage);
    }
  }
  getSelectedPage(index) {
      this.setState({ selectedPage: index });
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

  changeLayout = (val) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
 
        if (val === 'detail') {
            this.setState({ 
                detailFlexValue: 2,
                vehicleFlexValue: 1,
                showDetailEditButton: true,
                showVehicleEditButton: false,
                showDetail: true,
                showVehicle: false,
                showPasswordButton: true,
                showDetailWidth: window.width,
                showVehicleWidth: 0,
                showDetailFlex: 1,
                showVehicleFlex: 0,
                stretchFlex: 3
            });
        } else {
            this.setState({ 
                detailFlexValue: 1,
                vehicleFlexValue: 2,
                showDetailEditButton: false,
                showVehicleEditButton: true,
                showDetail: false,
                showVehicle: true,
                showPasswordButton: false,
                showDetailWidth: 0,
                showVehicleWidth: window.width,
                showDetailFlex: 0,
                showVehicleFlex: 1,
                stretchFlex: 13
            });
        }
    }
    getVehicleImage(image) {
        this.setState({ image });
    }

  render() {
      console.log(this.state)
    if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
        <View style={styles.container}>
            <Header 
                headerText={'PROFILE'} 
                navigation={this.props.navigation} 
                buttonType={'back'}
            />
            {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
            <View style={styles.toggleButtonContainer}>
                <View style={{ flex: this.state.detailFlexValue, marginRight: 10, height: 60 }} >
                    <TouchableOpacity style={styles.detailButtonInnerContainer} onPress={this.changeLayout.bind(this, 'detail')} >
                        <View style={styles.detailButtonInnerWraper}>
                            <Text style={styles.detailTextContainer}>
                                Details
                            </Text>
                        </View>
                        { this.state.showDetailEditButton &&
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editDetails.bind(this)}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.profileEditable ? tickButton : editButton} />
                        </TouchableOpacity>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: this.state.vehicleFlexValue, marginLeft: 10, height: 60 }} >
                    <TouchableOpacity style={styles.vehicleButtonInnerContainer} onPress={this.changeLayout.bind(this, 'vehicle')} >
                    { this.state.showVehicleEditButton &&
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', left: 10 }} onPress={this.editVehicles.bind(this)}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.vehicleEditable ? tickButton : editButton} />
                        </TouchableOpacity>
                    }
                        <View style={styles.detailButtonInnerWraper}>
                        <Text style={styles.vehicleTextContainer}>
                            Vehicles
                        </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 7 }}>
            {/* <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                    <ProfilePic getImage={this.getImage.bind(this)} editable={this.state.profileEditable} getImage={this.getImage.bind(this)} profilePic={this.props.authUser.image} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Image 
                        style={{ width: '66%', height: '50%', }}
                        source={logOutButton}
                    />
                </View>
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} formEditable={this.state.profileEditable} authUser={this.props.authUser} />
            </View> */}
            { this.state.showDetail &&
            // <View style={{ flex: this.state.showDetailFlex, width: this.state.showDetailWidth }}>
            <DetailsItem
            getImage={this.getImage.bind(this)} editable={this.state.profileEditable} getImage={this.getImage.bind(this)} profilePic={this.props.authUser.image}
            navigation={this.props.navigation} formEditable={this.state.profileEditable} authUser={this.props.authUser}
            />
                // </View>
             }
            { this.state.showVehicle && 
            // <View style={{ flex: this.state.showVehicleFlex, width: this.state.showVehicleWidth }}>
            <VehiclesScreen 
                editable={this.state.vehicleEditable} 
                navigation={this.props.navigation}
                getVehicleImage={this.getVehicleImage.bind(this)}
                getSelectedPage={this.getSelectedPage.bind(this)}
            /> 
            //</View>
             }
            </View>
            { this.state.showPasswordButton &&
            <View style={styles.nextButtonContainer}>
            
                <Button 
                    style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                    onPress={this.goToNext.bind(this)}
                >
                Change Password
                </Button>
            
            </View>
            }
        </View>
    );
  }
}

