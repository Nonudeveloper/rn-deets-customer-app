import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Hr from '../../deetscomponents/hr';
import Header from '../header/Header';
import DeetsFacebook from '../../deetscomponents/facebook';
import StyleConstants from '../../config/StyleConstants';
import Button from '../../deetscomponents/Button';
//Make Select Register component

const buttonIcon = require('../../assets/icons/3_email_icon.png');

const SelectRegisteration = (props) => {
    const { 
        container
    } = styles;


    const registerWithEmail = () => {
        props.navigation.navigate('personalInformation');
    };

    return (
        <View style={container}>
        
            <Header headerText={'Registration'} navigation={props.navigation} />
            
            <DeetsFacebook title="Register with Facebook" navigation={props.navigation} />

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
        color: "black",
        marginVertical: 10,
        paddingHorizontal: 10
    },
    buttonStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
};

export default (SelectRegisteration);
