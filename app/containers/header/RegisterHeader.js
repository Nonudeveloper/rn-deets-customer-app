import React from 'react';
import { Text, View, TouchableOpacity, Platform, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

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
                        <TouchableOpacity onPress={() => goBack()} >
                            <Image source={backButton} style={styles.backButton} />
                            {/* {myIcon} */}
                        </TouchableOpacity>
                    </View>
                    <View style={headerDetailStyle}>
                        <Text style={textStyle}>{props.headerText.toUpperCase()}</Text>
                        <View style={styles.activityIndicatorWrapper}>
                            <Image source={props.process} style={styles.indicatorStyle} />
                        </View>
                    </View>

                </View>
            </View>
    );
};

const styles = {
    menuIconStyle: {
        flex: 1,
        marginLeft: 7
    },
    viewStyle: {
        height: 48,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // width: 300
    },
    outerViewStyle: {
        height: 55,
        justifyContent: 'center',
        marginTop:Platform.OS == "ios" ? 20 : 0,
        marginBottom: 8
    },
    textStyle: {
        flex: 1,
        fontSize: 20,
        color: '#8ac10b',
        fontWeight: 'bold'
    },
    headerDetailStyle: {
       flex: 1,
       position: 'absolute',
    },
    indicatorStyle: { 
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
    },
    activityIndicatorWrapper: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    backButton: {
        resizeMode: 'contain', 
        width: 30, 
        height: 30 
    }
};

export default connect()(Header);
