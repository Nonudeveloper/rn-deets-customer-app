import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';

//Make header component

const backButton = require('../../assets/icons/2_back_btn_onclick.png');
const hamBurger = require('../../assets/icons/5_burger_btn.png');
const deetsLogo = require('../../assets/icons/4_deets_logo.png');

const Header = (props) => {
    const { 
        textStyle, 
        viewStyle, 
        outerViewStyle, 
        menuIconStyle, 
        headerDetailStyle, 
        logoImg
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
            style={styles.backButton} 
        />
    ) : (
        <Text style={textStyle}>{props.rightText}</Text>
    );
    
    return (
            <View style={outerViewStyle}>
                <View style={viewStyle}>
                    <View style={menuIconStyle}>
                        <TouchableOpacity onPress={() => navigate()}>
                            <Image 
                                source={props.buttonType === 'burger' ? hamBurger : backButton} 
                                style={styles.backButton} 
                            />
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
        flex: 1,
        marginLeft: 7,
        position: 'absolute'
    },
    viewStyle: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    outerViewStyle: {
        height: 47,
        justifyContent: 'center',
        marginTop:Platform.OS == "ios" ? 20 : 0,
        backgroundColor: 'grey'
    },
    textStyle: {
        fontSize: 20,
        color: '#8ac10b',
        fontWeight: 'bold'
    },
    headerDetailStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backButton: {
        resizeMode: 'contain', 
        width: 30, 
        height: 30 
    },
    logoImg: {
        resizeMode: 'contain',
        width: 100,
        height: 30,
    },
    rightIconContainer: { 
        flex: 1, 
        position: 'absolute', 
        right: 7,
      
    },
    indicatorStyle: {
        resizeMode: 'contain',
        width: 100,
        height: 20
    }
};

export default (Header);
