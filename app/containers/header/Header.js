import React from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//Make header component


const Header = (props) => {
    const { 
        textStyle, 
        viewStyle, 
        outerViewStyle, 
        menuIconStyle, 
        headerDetailStyle, 
    } = styles;

    const myIcon = (<Icon name="arrow-circle-left" size={30} color="#66cc00" />);

    const goBack = () => {
        props.navigation.goBack();
    };
    
    return (
            <View style={outerViewStyle}>
                <View style={viewStyle}>
                    <View style={menuIconStyle}>
                        <TouchableOpacity onPress={() => goBack()}>
                            {myIcon}
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
        marginLeft: 7
    },
    viewStyle: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    outerViewStyle: {
        height: 80,
        justifyContent: 'center',
        marginTop:Platform.OS == "ios" ? 20 : 0
    },
    textStyle: {
        fontSize: 18,
        color: '#1a1a1a',
        fontWeight: 'bold'

    },
    headerDetailStyle: {
       flex: 2,
       alignItems: 'flex-start',
       marginLeft: 36
    }
};

export default (Header);
