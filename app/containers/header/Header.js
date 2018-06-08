import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
// const backButton = require('../../assets/icons/2_back_btn_onclick.png');
const hamBurger = require('../../assets/icons/5_burger_btn.png');
const deetsLogo = require('../../assets/icons/4_deets_logo.png');

const backButton = (<Icon name="arrow-left" size={30} color="black" />);

const Header = (props) => {
    const { 
        textStyle, 
        viewStyle, 
        outerViewStyle, 
        menuIconStyle, 
        headerDetailStyle, 
        logoImg,
        rightTextStyle
    } = styles;

    const navigate = () => {
        if (props.buttonType === 'burger') props.navigation.navigate('DrawerOpen');
        else props.navigation.goBack();
    };

    const title = props.titleType === 'logo' ? (
        <View style={{ backgroundColor: 'green' }}>
            <Image style={logoImg} source={deetsLogo} />
        </View>
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
                        <TouchableOpacity onPress={() => navigate()}>
                          {leftIcon}
                        </TouchableOpacity>
                    </View>
                    <View style={headerDetailStyle}>
                        {title}
                        <Image style={styles.indicatorStyle} source={props.indicatorSource} />
                    </View>
                    
                    <View style={styles.rightIconContainer}>
                        <TouchableOpacity onPress={props.onPress}>
                            {props.showRightIcon && rightIcon}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
    );
};

const styles = {
    menuIconStyle: {
        marginLeft: 7,
    },
    viewStyle: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    outerViewStyle: {
        height: 47,
        justifyContent: 'center',
        marginTop:Platform.OS == "ios" ? 20 : 0,
        backgroundColor: 'transparent'
    },
    textStyle: {
        fontSize: 20,
        color: '#00802b',
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 2 },
        textShadowRadius: 15,
        letterSpacing: 5,
    },
    rightTextStyle: {
        fontSize: 20,
        color: 'grey',
        fontWeight: 'bold',
    },
    headerDetailStyle: {
        justifyContent: 'center',
        alignItems: 'center',
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
        width: 100,
        height: 30,
    },
    rightIconContainer: { 
        right: 7,
      
    },
    indicatorStyle: {
        resizeMode: 'contain',
        width: 100,
        height: 20
    }
};

export default (Header);
