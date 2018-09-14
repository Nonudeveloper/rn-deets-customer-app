import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
// const backButton = require('../../assets/icons/2_back_btn_onclick.png');
const hamBurger = require('../../assets/icons/5_burger_btn.png');
const deetsLogo = require('../../assets/icons/4_deets_logo-metal.png');

const backButton = (<Icon name="arrow-left" size={30} borderWidth={2} color="black" />);

const Header = (props) => {
    const {
        textStyle,
        viewStyle,
        outerViewStyle,
        menuIconStyle,
        headerDetailStyle,
        logoImg,
        rightTextStyle,
        textStyleDeets
    } = styles;

    const navigate = () => {
        if (props.buttonType === 'burger') props.navigation.navigate('DrawerOpen');
        else {
            Keyboard.dismiss();
            props.navigation.goBack();
        }
    };

    const title = props.titleType === 'logo' ? (

        <Text style={textStyleDeets}>DEETS</Text>
        // <View>        
        //     <Image style={logoImg} source={deetsLogo} />            
        // </View>

    ) : (
            <Text style={textStyle}>{props.headerText.toUpperCase()}</Text>
        );

    const rightIcon = props.rightIconType === 'image' ? (
        <Image
            source={props.rightImageSource}
            style={styles.rightIcon}
        />
    ) : (
            <Text style={rightTextStyle}>{props.rightText}</Text>
        );

    const leftIcon = props.buttonType === 'burger' ? (
        <Image
            source={hamBurger}
            style={styles.backButton}
        />
    ) : (
            backButton
        );

    return (
        <View style={outerViewStyle}>
            <View style={viewStyle}>
                <View style={menuIconStyle}>
                    <TouchableOpacity onPress={() => navigate()} activeOpacity={1}>
                        {leftIcon}
                    </TouchableOpacity>
                </View>
                <View style={[headerDetailStyle, { right: props.showRightIcon ? 0 : 10 }]}>
                    {title}
                    <Image style={styles.indicatorStyle} source={props.indicatorSource} />
                </View>

                <View style={styles.rightIconContainer}>
                    <TouchableOpacity onPress={() => { Keyboard.dismiss(); props.onPress(); }} activeOpacity={1}>
                        {props.showRightIcon && rightIcon}
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = {
    menuIconStyle: {
        marginLeft: 18,
    },
    viewStyle: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    outerViewStyle: {
        height: Platform.OS == "ios" ? 70 : 47,
        justifyContent: 'center',
        marginTop: Platform.OS == "ios" ? 10 : 0,
        backgroundColor: 'transparent'
    },
    textStyle: {
        fontSize: 20,
        color: '#00802b',
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    textStyleDeets: {
        fontSize: 25,
        color: '#00802b',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
        letterSpacing: 5,
        fontStyle: 'italic'
    },
    rightTextStyle: {
        fontSize: 20,
        color: '#000',
    },
    headerDetailStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Platform.OS == "ios" ? 20 : 0,
    },
    backButton: {
        resizeMode: 'contain',
        width: 25,
        height: 25
    },
    rightIcon: {
        resizeMode: 'contain',
        width: 35,
        height: 30
    },
    logoImg: {
        resizeMode: 'contain',
        width: 120,
        height: 50,
    },
    rightIconContainer: {
        right: 12,

    },
    indicatorStyle: {
        resizeMode: 'contain',
        width: 150,
        height: 20
    }
};

export default (Header);
