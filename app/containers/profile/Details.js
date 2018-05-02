import React from 'react';
import { View, TouchableOpacity, Dimensions, Image, Text, Alert } from 'react-native';
import Header from '../header/Header';
import ProfilePic from './ProfilePic';
import FormArea from './Form';
import styles from './styles';
import Button from '../../deetscomponents/Button';
import Loader from '../../deetscomponents/Loader';
import StyleConstants from '../../config/StyleConstants';

const window = Dimensions.get('window');
const editButton = require('../../assets/icons/edit_normal.png');
const logOutButton = require('../../assets/icons/logout_pressed.png');
const tickButton = require('../../assets/icons/tick_normal.png');

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        profileEditable: false,
        vehicleEditable: false,
        newImage:'',
        showPasswordButton: true
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
    const width = window.width/2 - 10;
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
                <View style={{ width, height: 60 }} >
                    <TouchableOpacity style={styles.detailButtonInnerContainer} >
                        <View style={styles.detailButtonInnerWraper}>
                            <Text style={styles.detailTextContainer}>
                                Details
                            </Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editDetails.bind(this)}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.profileEditable ? tickButton : editButton} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
                <View style={{ width, height: 60, }} >
                    <TouchableOpacity style={styles.vehicleButtonInnerContainer} >
                        <Text style={styles.vehicleTextContainer}>
                            Vehicles
                        </Text>
                        <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editVehicles}>
                            <Image style={{ width: 30, height: 30 }} source={this.state.vehicleEditable ? tickButton : editButton} />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.pictureWraper}>
                <View style={styles.profilePicContainer}>
                    <ProfilePic getImage={this.getImage.bind(this)} editable={this.state.profileEditable} getImage={this.getImage.bind(this)} profilePic={this.props.authUser.image} />
                </View>
                <View style={styles.logoutButtonContainer}>
                    <Image 
                        style={{ width: '76%', height: '60%', }}
                        source={logOutButton}
                    />
                </View>
            </View>
            <View style={styles.formContainer}>
                <FormArea navigation={this.props.navigation} formEditable={this.state.profileEditable} authUser={this.props.authUser} />
            </View>
            <View style={styles.nextButtonContainer}>
            { this.state.showPasswordButton &&
                <Button 
                    style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                    onPress={this.goToNext.bind(this)}
                >
                Change Password
                </Button>
            }
            </View>
        </View>
    );
  }
}

