import React from 'react';
import { View, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../header/Header';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';
import Button from '../../deetscomponents/Button';
import StyleConstants from '../../config/StyleConstants';

const window = Dimensions.get('window');
const editButton = require('../../assets/icons/edit_btn.png');
const logOutButton = require('../../assets/icons/logout_pressed.png');
const crossButton = require('../../assets/icons/cross_black.png');

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profileEditable: false,
        buttonText: 'Change Password',
        vehicleEditable: false
    };
  }

  componentWillMount() {
      this.props.actions.fetchAuthUserDetails();
  }

  getImage(image) {
    this.props.actions.storeImage(image);
  }

  editDetails() {
    this.state.profileEditable ? 
    this.setState({
        profileEditable: false,
        buttonText: 'Change Password',
    }) :
    this.setState({
        profileEditable: true,
        buttonText: 'Save',
    });
  } 

  editVehicles() {

  }

  render() {
      const width = window.width/2 - 10;
    return (
        <View style={styles.container}>
        {/* <Loader
                loading={isFetching} 
        /> */}
            <Header 
                headerText={'PROFILE'} 
                navigation={this.props.navigation} 
                buttonType={'back'}
            />
            <View style={styles.toggleButtonContainer}>
                <View style={{ width, height: 60 }} >
                    <TouchableOpacity style={styles.detailButtonInnerContainer} >
                        <View style={styles.detailButtonInnerWraper}>
                            <Text style={styles.detailTextContainer}>
                                Details
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editDetails.bind(this)}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.profileEditable ? crossButton : editButton} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={{ width, height: 60, }} >
                    <TouchableOpacity style={styles.vehicleButtonInnerContainer} >
                        <Text style={styles.vehicleTextContainer}>
                            Vehicles
                        </Text>
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editVehicles}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.vehicleEditable ? crossButton : editButton} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                    <ProfilePic getImage={this.getImage.bind(this)} editable={this.state.profileEditable} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Image 
                        style={{ width: '76%', height: '60%', }}
                        source={logOutButton}
                    />
                </View>
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} editable={this.state.profileEditable} />
            </View>
            <View style={styles.nextButtonContainer}>
                <Button 
                    style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                    // onPress={this.goToNext.bind(this)}
                >
                {this.state.buttonText}
                </Button>
            </View>
        </View>
    );
  }
}

