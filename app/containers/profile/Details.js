import React from 'react';
import { View, TouchableOpacity, Dimensions, Image, Text, Alert, LayoutAnimation, UIManager, Platform } from 'react-native';
import Header from '../header/Header';
import styles from './styles';
import Button from '../../deetscomponents/Button';
import Loader from '../../deetscomponents/Loader';
import StyleConstants from '../../config/StyleConstants';
import DetailsItem from './DetailsItem';
import VehiclesScreen from './vehiclesDetail/index';
import withToast from '../../hoc/withToast';

const window = Dimensions.get('window');
const editButton = require('../../assets/icons/edit_normal.png');
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
            stretchFlex: 3,
            image: '',
            selectedPage: 0
        };
    }

    componentWillMount() {
        this.props.actions.fetchAuthUserDetails();
        this.props.getVehicles();
        this.props.actions.getAuthUserVehicleDetails();
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
            const pageSelected = this.state.selectedPage;
            const imagePageSelected = this.state.image.currentPage;
            const imageSelected = pageSelected === imagePageSelected ? this.state.image.response : {};
            this.props.actions.fetchAddNewVehicle(this.props.form['editVehicleForm' + this.state.selectedPage].values, imageSelected);
        }   
    }

    deleteVehicle() {
        const vehicleId = this.props.form['editVehicleForm' + this.state.selectedPage].values.vehicle_id;
        this.props.actions.deleteVehicle(vehicleId);
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

    renderDeleteAlert(error) {
        Alert.alert(
            'Error',
            error.log,
            [
                { 
                text: 'OK', 
                onPress: () => {
                //dispath an action to make showAlert false
                this.props.actions.hideAlert();
                    if (error.flag === 35) {
                        this.props.navigation.navigate('detailsScreen');
                    }
                } 
                },
            ],
            { cancelable: false }
        );
    }

    changeLayout = (val) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        if (val === 'detail') {
            this.setState({ 
                detailFlexValue: val === 'detail' ? 2 : 1,
                vehicleFlexValue: val === 'detail' ? 1 : 2,
                showDetailEditButton: val === 'detail',
                showVehicleEditButton: val !== 'detail',
                showDetail: val === 'detail',
                showVehicle: val !== 'detail',
                showPasswordButton: val === 'detail',
                showDetailWidth: val === 'detail' ? window.width : 0,
                showVehicleWidth: val === 'detail' ? 0 : window.width,
                stretchFlex: val === 'detail' ? 3 : 9,
                profileEditable: false,
                vehicleEditable: false,
            });
        }
    }

    getVehicleImage(image) {
        this.setState({ image });
    }

  render() {
    // if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
    return (
        <View style={styles.container}>
            <Header 
                headerText={'PROFILE'} 
                navigation={this.props.navigation} 
                buttonType={'back'}
            />
            {this.props.errorMessage !== '' && this.renderAlert(this.props.errorMessage.error)}
            {this.props.vehicleDeleteMessage !== '' && this.renderDeleteAlert(this.props.vehicleDeleteMessage)}
            {this.props.logoutMessage !== '' && withToast(this.props.logoutMessage.error)}
            <View style={styles.toggleButtonContainer}>
                <View style={{ flex: this.state.detailFlexValue, marginRight: 10, height: 60 }} >
                    <TouchableOpacity 
                        activeOpacity={1} 
                        style={[styles.detailButtonInnerContainer, this.state.detailFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                        onPress={this.changeLayout.bind(this, 'detail')} 
                    >
                        <View style={styles.detailButtonInnerWraper}>
                            <Text style={styles.detailTextContainer}>
                                Details
                            </Text>
                        </View>
                        { this.state.showDetailEditButton &&
                            <TouchableOpacity style={{ flex: 1, right: 10 }} onPress={this.editDetails.bind(this)}>
                                <Image style={{ width: 30, height: 30 }} source={this.state.profileEditable ? tickButton : editButton} />
                            </TouchableOpacity>
                        }
                    </TouchableOpacity>
                </View>
                <View style={{ flex: this.state.vehicleFlexValue, marginLeft: 10, height: 60 }} >
                    <TouchableOpacity 
                        activeOpacity={1} 
                        style={[styles.vehicleButtonInnerContainer, this.state.vehicleFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                        onPress={this.changeLayout.bind(this, 'vehicle')} 
                    >
                    { this.state.showVehicleEditButton &&
                        <TouchableOpacity style={{ flex: 1, left: 10 }} onPress={this.editVehicles.bind(this)}>
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
            <View style={{ flex: this.state.stretchFlex }}>
                { this.state.showDetail &&
                <DetailsItem
                    getImage={this.getImage.bind(this)} 
                    editable={this.state.profileEditable} 
                    getImage={this.getImage.bind(this)} 
                    profilePic={this.props.authUser.image}
                    navigation={this.props.navigation} 
                    formEditable={this.state.profileEditable} 
                    authUser={this.props.authUser}
                    logout={this.props.logout}
                />
                }
                { this.state.showVehicle && 
                <VehiclesScreen 
                    editable={this.state.vehicleEditable} 
                    navigation={this.props.navigation}
                    getVehicleImage={this.getVehicleImage.bind(this)}
                    getSelectedPage={this.getSelectedPage.bind(this)}
                /> 
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

