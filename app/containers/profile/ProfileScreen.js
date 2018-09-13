import React, { Component } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Dimensions, 
    Image, 
    Text, 
    Alert, 
    UIManager, 
    Platform, 
    Animated,
    Easing,
    TouchableHighlight
} from 'react-native';
import Header from '../header/Header';
import StyleConstants from '../../config/StyleConstants';
import DetailsItem from './DetailsItem';
import Button from '../../deetscomponents/Button';
import VehiclesScreen from './vehiclesDetail/index';
import Loader from '../../deetscomponents/Loader';
import styles from './styless';
import withToast from '../../hoc/withToast';

const window = Dimensions.get('window');

const editButton = require('../../assets/icons/edit_normal.png');
const tickButton = require('../../assets/icons/tick_normal.png');
const crossButton = require('../../assets/icons/2_cross_btn.png');

export default class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }

        this._detailBarFlex = new Animated.Value(2);
        this._vehicleBarFlex = new Animated.Value(1);
        
        this.state = {
            profileEditable: false,
            vehicleEditable: false,
            newImage: '',
            showPasswordButton: true,
            showDetailEditButton: true,
            showVehicleEditButton: false,
            image: '',
            selectedPage: 0,
            detailsOpacity: 100,
            detailFlexValue: 2,
            vehicleFlexValue: 1,
            showVehicleComponent: false
        };
    }

    componentWillMount() {
        
        
    }

    componentDidMount() {
        if (this.props.authUser.length === 0) {
            this.props.actions.fetchAuthUserDetails();
        }
        if (this.props.authVehiclesData.length === 0) {
            this.props.actions.getAuthUserVehicleDetails();
        }
        this.props.vehicleData.length === 0 ? this.props.getVehicles() : null;
        this.setState({ showVehicleComponent: true });
    }

    generateData = () => {
        const data = [];
        for (let i = 0; i < 10; i++) {
          data.push(Math.floor(Math.random() * window.width));
        }
    
        this.setState({
          data,
        });
    }

    getImage(image) {
        this.setState({ newImage: image });
    }

    setStates = val => {
        this.setState({ 
            detailsOpacity: val === 'detail' ? 100 : 0,
            showDetailEditButton: val === 'detail',
            showVehicleEditButton: val !== 'detail',
            showPasswordButton: val === 'detail',
            detailFlexValue: val === 'detail' ? 2 : 1,
            vehicleFlexValue: val === 'detail' ? 1 : 2,
            vehicleEditable: false,
            profileEditable: false
        });
    }

    animateBars = (whichBar) => {
        Animated.timing(
            this._detailBarFlex,
            {
                toValue: whichBar === 'detail' ? 2 : 1,
                duration: 500,
                easing: Easing.quad
            }
        ).start();

        Animated.timing(
            this._vehicleBarFlex,
            {
                toValue: whichBar === 'detail' ? 1 : 2,
                duration: 500,
                easing: Easing.quad
            }
        ).start();
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
            showPasswordButton: false,
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
        } else {
            this.setState({ profileEditable: true });
        }
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

    getVehicleImage(image) {
        this.setState({ image });
    }

    getSelectedPage(index) {
        this.state.selectedPage !== index ? this.setState({ vehicleEditable: false }) : this.setState({ vehicleEditable: true });
        this.setState({ selectedPage: index });
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
            const formType = 'editVehicle';
            const pageSelected = this.state.selectedPage;
            const imagePageSelected = this.state.image.currentPage;
            const imageSelected = pageSelected === imagePageSelected ? this.state.image.response : {};
            this.props.actions.fetchAddNewVehicle(this.props.form['editVehicleForm' + this.state.selectedPage].values, imageSelected, formType);
        } else {
            this.setState({ vehicleEditable: true });
        }
    }

    renderAlert(error) {
        setTimeout(()=> {
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
        }, 500);
       
    }

    renderDeleteAlert(error) {
        setTimeout(()=>{
            Alert.alert(
                'Success',
                error.log,
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
        }, 500);
        
    }

    deleteVehicle() {
        Alert.alert(
            'Delete',
            'Are you sure you want to delete this vehicle?',
            [
                { 
                text: 'OK', 
                onPress: () => {
                //dispath an action to make showAlert false
                const vehicleId = this.props.form['editVehicleForm' + this.state.selectedPage].values.vehicle_id;
                this.props.actions.deleteVehicle(vehicleId);
                } 
                },
                { text: 'Cancel' },
            ],
            // { cancelable: false }
        );
    }

    render() {
        console.log(this.props);
        const detailFlex = {
            flex: this._detailBarFlex
        };

        const vehicleFlex = {
            flex: this._vehicleBarFlex
        };
        return (
            <View style={styles.container}>
                <Header 
                    headerText={'PROFILE'} 
                    navigation={this.props.navigation} 
                    buttonType={'back'}
                />
                <Loader loading={this.props.isFetching} />
                
                {(this.props.errorMessage !== undefined && this.props.errorMessage !== '') && this.renderAlert(this.props.errorMessage.error)}
                {this.props.vehicleDeleteMessage !== '' && this.renderDeleteAlert(this.props.vehicleDeleteMessage)}
                {this.props.logoutMessage !== '' && withToast(this.props.logoutMessage.error)}
                
                <View style={styles.toggleButtonContainer}>
                    <Animated.View style={[detailFlex, { marginRight: 10, height: 60, top: 25 }]} >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.detailButtonInnerContainer, this.state.detailFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                            onPress={() => {
                                this.animateBars('detail');
                                this.setStates('detail');
                            }} 
                        >
                            <View style={styles.detailButtonInnerWraper}>
                                <Text style={styles.detailTextContainer}>
                                    Details
                                </Text>
                            </View>
                            { this.state.showDetailEditButton &&
                                <TouchableOpacity style={{ flex: 1, right: 10, alignItems: 'flex-end' }} onPress={this.editDetails.bind(this)}>
                                    <Image style={{ width: 30, height: 30 }} source={this.state.profileEditable ? tickButton : editButton} />
                                </TouchableOpacity>
                            }
                        </TouchableOpacity>
                    </Animated.View>
                    <Animated.View style={[vehicleFlex, { marginLeft: 10, height: 60, top: 25 }]} >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.vehicleButtonInnerContainer, this.state.vehicleFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                            onPress={() => {
                                this.animateBars('vehicle');
                                this.setStates('vehicle');
                            }} 
                        >
                        { this.state.showVehicleEditButton && this.props.authVehiclesData.length !== 0 &&
                            <TouchableOpacity 
                                style={{ flex: 1, left: 10 }} 
                                onPress={this.editVehicles.bind(this)}
                            >
                                <Image 
                                    style={{ width: 30, height: 30 }} 
                                    source={this.state.vehicleEditable ? tickButton : editButton} 
                                />
                            </TouchableOpacity>
                        }
                            <View style={styles.detailButtonInnerWraper}>
                                <Text style={styles.vehicleTextContainer}>
                                    Vehicles
                                </Text>
                            </View>
                            { this.state.showVehicleEditButton && this.props.authVehiclesData.length !== 0 &&
                            <TouchableOpacity 
                                style={{ flex: 1, alignItems: 'flex-end', right: 10 }} 
                                onPress={this.deleteVehicle.bind(this)}
                            >
                                <Image 
                                    style={{ width: 30, height: 30 }} 
                                    source={crossButton} 
                                />
                            </TouchableOpacity>
                        }
                        </TouchableOpacity>
                    </Animated.View>
                </View>
          
                <View style={{ flex: 4 }}>
                    <DetailsItem
                        getImage={this.getImage.bind(this)} 
                        editable={this.state.profileEditable} 
                        profilePic={this.props.authUser.image}
                        navigation={this.props.navigation} 
                        formEditable={this.state.profileEditable} 
                        authUser={this.props.authUser}
                        logout={this.props.logout}
                        opacity={this.state.detailsOpacity}
                        flex={this.state.detailsOpacity ? 5 : 0}
                    />
                        {this.state.showVehicleComponent &&
                    <VehiclesScreen 
                        editable={this.state.vehicleEditable} 
                        navigation={this.props.navigation}
                        getVehicleImage={this.getVehicleImage.bind(this)}
                        getSelectedPage={this.getSelectedPage.bind(this)}
                        opacity={this.state.detailsOpacity ? 0 : 100}
                        flex={this.state.detailsOpacity ? 0 : 5}
                        authVehiclesData={this.props.authVehiclesData}
                    /> 
                        }
                </View>
         

                { this.state.showPasswordButton &&
                    <View style={styles.nextButtonContainer}>
                        <Button 
                            style={[styles.nextButtonStyle, { backgroundColor: 'green' }]}
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
