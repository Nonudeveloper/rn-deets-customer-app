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
    Animated
} from 'react-native';
import Header from '../header/Header';
import StyleConstants from '../../config/StyleConstants';
import DetailsItem from './DetailsItem';
import Button from '../../deetscomponents/Button';
import VehiclesScreen from './vehiclesDetail/index';
import Loader from '../../deetscomponents/Loader';
import AnimatedBar from './AnimatedBar';
import styles from './styless';

const window = Dimensions.get('window');
const DELAY = 1;

const editButton = require('../../assets/icons/edit_normal.png');
const tickButton = require('../../assets/icons/tick_normal.png');


class MyComponent extends Component {
    components = {
        details: DetailsItem,
        vehicles: VehiclesScreen
    };
    render() {
       const TagName = this.components[this.props.tag || 'details'];
       return <TagName />;
    }
}

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
            detailFlexValue: 2,
            vehicleFlexValue: 1,
            showDetailEditButton: true,
            showVehicleEditButton: false,
            showDetail: true,
            showVehicle: false,
            showDetailWidth: window.width,
            showVehicleWidth: 0,
            image: '',
            selectedPage: 0,
            detailsOpacity: 100,
            data: [],
        };
    }

    componentWillMount() {
        this.props.actions.fetchAuthUserDetails();
        this.props.getVehicles();
        this.props.actions.getAuthUserVehicleDetails();
        clearInterval(this.interval);
    }

    componentDidMount() {
        this.generateData();
        this.interval = setInterval(() => {
          this.generateData();
        }, 1000);
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

    animate = val => {
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
        });
    }

    animateDetailBarTo = (delay, value) => {
        console.log('animateDetailBarTo');
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(this._detailBarFlex, {
            toValue: value,
          }),
        ]).start();
    }

    animateVehicleBarTo = (delay, value) => {
        console.log('animateVehicleBarTo');
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(this._vehicleBarFlex, {
            toValue: value,
          }),
        ]).start();
    }

    changeLayout = val => {
        this.setState({ 
            detailsOpacity: val === 'detail' ? 100 : 0
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

    getVehicleImage(image) {
        this.setState({ image });
    }

    getSelectedPage(index) {
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
        const detailBarStyle = {
            flex: this._detailBarFlex
        };

        const vehicleBarStyle = {
            flex: this._vehicleBarFlex
        };
        if (this.props.isFetching) return <Loader loading={this.props.isFetching} />;
        return (
            <View style={styles.container}>
                <Header 
                    headerText={'PROFILE'} 
                    navigation={this.props.navigation} 
                    buttonType={'back'}
                />
                <View style={styles.toggleButtonContainer}>
                    <Animated.View style={[detailBarStyle, { backgroundColor: 'blue', marginRight: 10, height: 60, top: 25 }]} >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.detailButtonInnerContainer, this.state.detailFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                            onPress={() => {
                                this.setState({
                                    detailsOpacity: 100
                                });
                                this.animateVehicleBarTo(DELAY, 1);
                                this.animateDetailBarTo(DELAY, 2);
                            }} 
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
                    </Animated.View>
                    <Animated.View style={{ flex: this._vehicleBarFlex, marginLeft: 10, height: 60, top: 25 }} >
                        <TouchableOpacity 
                            activeOpacity={1} 
                            style={[styles.vehicleButtonInnerContainer, this.state.vehicleFlexValue === 2 ? styles.activeButtonStyle : styles.unactioveButtonStyle]} 
                            onPress={() => {
                                this.setState({
                                    detailsOpacity: 0
                                });
                                this.animateVehicleBarTo(DELAY, 2);
                                this.animateDetailBarTo(DELAY, 1);
                            }} 
                        >
                        { this.state.showVehicleEditButton &&
                            <TouchableOpacity 
                                style={{ flex: 1, position: 'absolute', left: 10 }} 
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
                        </TouchableOpacity>
                    </Animated.View>
                </View>
          
                {/* <MyComponent
                    getImage={this.getImage.bind(this)} 
                    editable={this.state.profileEditable} 
                    getImage={this.getImage.bind(this)} 
                    profilePic={this.props.authUser.image}
                    navigation={this.props.navigation} 
                    formEditable={this.state.profileEditable} 
                    authUser={this.props.authUser}
                    logout={this.props.logout}
                    tag={'details'}
                /> */}

                <DetailsItem
                        getImage={this.getImage.bind(this)} 
                        editable={this.state.profileEditable} 
                        getImage={this.getImage.bind(this)} 
                        profilePic={this.props.authUser.image}
                        navigation={this.props.navigation} 
                        formEditable={this.state.profileEditable} 
                        authUser={this.props.authUser}
                        logout={this.props.logout}
                        opacity={this.state.detailsOpacity}
                        flex={this.state.detailsOpacity ? 5 : 0}
                />

                <VehiclesScreen 
                        editable={this.state.vehicleEditable} 
                        navigation={this.props.navigation}
                        getVehicleImage={this.getVehicleImage.bind(this)}
                        getSelectedPage={this.getSelectedPage.bind(this)}
                        opacity={this.state.detailsOpacity ? 0 : 100}
                        flex={this.state.detailsOpacity ? 0 : 5}
                /> 
              
                {/* {this.state.showDetail ? (
                    <DetailsItem
                        getImage={this.getImage.bind(this)} 
                        editable={this.state.profileEditable} 
                        getImage={this.getImage.bind(this)} 
                        profilePic={this.props.authUser.image}
                        navigation={this.props.navigation} 
                        formEditable={this.state.profileEditable} 
                        authUser={this.props.authUser}
                        logout={this.props.logout}
                        opacity={this.state.detailsOpacity}
                    />
                ) : (
                    <VehiclesScreen 
                        editable={this.state.vehicleEditable} 
                        navigation={this.props.navigation}
                        getVehicleImage={this.getVehicleImage.bind(this)}
                        getSelectedPage={this.getSelectedPage.bind(this)}
                    /> 
                )} */}

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
            // <View style={{ flex: 1, backgroundColor: '#F5FCFF', justifyContent: 'center'}}>
            //     <View>
            //         <AnimatedBar value={200} delay={DELAY} key={1} />
            //     </View>
            // </View>
        );
    }
}
