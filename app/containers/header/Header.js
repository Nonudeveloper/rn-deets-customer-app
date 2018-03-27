import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';

//Make header component

const backButton = require('../../assets/icons/2_back_btn_onclick.png');

const Header = (props) => {
    const { 
        textStyle, 
        viewStyle, 
        outerViewStyle, 
        menuIconStyle, 
        headerDetailStyle, 
    } = styles;

    const goBack = () => {
        props.navigation.goBack();
    };
    
    return (
            <View style={outerViewStyle}>
                <View style={viewStyle}>
                    <View style={menuIconStyle}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Image source={backButton} style={styles.backButton} />
                        </TouchableOpacity>
                    </View>
                    <View style={headerDetailStyle}>
                        <Text style={textStyle}>{props.headerText.toUpperCase()}</Text>
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
        marginTop:Platform.OS == "ios" ? 20 : 0
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
    }
};

export default (Header);
