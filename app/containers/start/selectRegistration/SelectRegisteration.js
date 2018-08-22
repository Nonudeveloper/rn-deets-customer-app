import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from '../../../deetscomponents/hr';
import Header from '../../header/Header';
import DeetsFacebook from '../../../deetscomponents/facebook';
import StyleConstants from '../../../config/StyleConstants';
import Button from '../../../deetscomponents/Button';
import GoogleSignInScreen from '../../../deetscomponents/google';
import Loader from '../../../deetscomponents/Loader';
//Make Select Register component

const buttonIcon = require('../../../assets/icons/3_email_icon.png');

const SelectRegisteration = (props) => {
    const {
        container
    } = styles;


    const registerWithEmail = () => {
        props.navigation.navigate('personalInformation');
    };

    const registerWithGoogle = (data) => {
        const userImage = data.user.photo;
        const vehicleImage = '';
        const form1 = {
            fname: data.user.givenName,
            lname: data.user.familyName,
            email: data.user.email,
            gtm_access_token: data.accessToken,
            gtm_id: data.user.id,
            flag: 2,
            device_token: props.deviceToken
        };
        const form2 = '';
        const nonce = '';
        props.actions.registerRequest(userImage, vehicleImage, form1, form2, nonce);
    };

    const registerWithFacebook = (fbData) => {
        const fbUserData = JSON.parse(fbData.profile);
        const userImage = fbUserData.picture.data.url;
        const vehicleImage = '';
        const form1 = {
            fname: fbUserData.first_name,
            lname: fbUserData.last_name,
            flag: 1,
            fb_access_token: fbData.credentials.token,
            fb_id: fbUserData.id,
            email: fbUserData.email,
            gender: fbUserData.gender,
            device_token: props.deviceToken
        };
        const form2 = '';
        const nonce = '';
        props.actions.registerRequest(userImage, vehicleImage, form1, form2, nonce);
    };

    return (
        <View style={container}>

            <Header headerText={'Registration'} navigation={props.navigation} />
            <Loader loading={props.isFetching} />
            <View style={styles.innerContainer}>
                <View style={styles.buttonArea}>
                    <DeetsFacebook title="Register with Facebook" navigation={props.navigation} fbRegister={registerWithFacebook} showHalfButton />
                    <GoogleSignInScreen title="Register with Google" navigation={props.navigation} gtmRegister={registerWithGoogle} showHalfButton />
                </View>
                <Hr color="black" width={2} marginleft={25} marginright={25}>
                    <Text style={styles.textWithDivider}>OR</Text>
                </Hr>
                <Button
                    style={styles.registerWithEmail}
                    buttonTextStyle={styles.buttonStyle}
                    source={buttonIcon}
                    onPress={
                        () => registerWithEmail()
                    }
                >
                    Register with Email
                </Button>
            </View>
        </View>
    );
};

const styles = {
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    registerWithEmail: {
        height: 50,
        backgroundColor: StyleConstants.RegisterWithEmailBColor,
        borderRadius: 100,
        borderColor: '#a8a8a8',
        marginHorizontal: 25
    },
    textWithDivider: {
        color: 'black',
        marginVertical: 10,
        paddingHorizontal: 10
    },
    buttonStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    buttonArea: {
        height: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    innerContainer: {
        flex: 1,
        top: 50
    }
};

export default (SelectRegisteration);
