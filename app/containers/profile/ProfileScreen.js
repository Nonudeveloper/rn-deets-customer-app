import React, { Component } from 'react';
import { 
    View, 
    TouchableOpacity, 
    Dimensions, 
    Image, 
    Text, 
    Alert, 
    LayoutAnimation, 
    UIManager, 
    Platform, 
    ToastAndroid 
} from 'react-native';
import Header from '../header/Header';
import DetailsItem from './DetailsItem';
import styles from './styless';

const window = Dimensions.get('window');
const editButton = require('../../assets/icons/edit_normal.png');
const tickButton = require('../../assets/icons/tick_normal.png');

export default class ProfileScreen extends Component {

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

    changeLayout = (val) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
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

    render() {
        return (
            <View style={styles.container}>
                <Header 
                    headerText={'PROFILE'} 
                    navigation={this.props.navigation} 
                    buttonType={'back'}
                />
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
                                <TouchableOpacity style={{ flex: 1, position: 'absolute', right: 10 }} onPress={this.editDetails.bind(this)}>
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
            </View>
        );
    }
}