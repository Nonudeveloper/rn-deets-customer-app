import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import StepIndicator from 'react-native-step-indicator';

//Make header component


const Header = (props) => {

  const labels = ["Cart","Delivery Address","Order Summary","Payment Method","Track"];
  const customStyles = {
  stepIndicatorSize: 20,
  currentStepIndicatorSize:20,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  separatorFinishedColor: '#4aae4f',
  separatorUnFinishedColor: '#a4d4a5',
  stepIndicatorFinishedColor: '#4aae4f',
  stepIndicatorUnFinishedColor: '#a4d4a5',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 15,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: 'rgba(255,255,255,0.5)',
  labelColor: '#666666',
  labelSize: 12,
  currentStepLabelColor: '#4aae4f'
}
    const { 
        textStyle, 
        viewStyle, 
        outerViewStyle, 
        menuIconStyle, 
        headerDetailStyle, 
        indicatorStyle, 
    } = styles;

    const myIcon = (<Icon name="arrow-circle-left" size={30} color="#f8f8f8" />);
    console.log('props under');
    console.log(props.navigation);

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
                        <Text style={textStyle}>{props.headerText}</Text>
                               <StepIndicator
                                    customStyles={customStyles}
                                    currentPosition={props.curre}
                                    stepCount={3}
                                />
                    </View>
                    {/* <View >
                        <TouchableOpacity onPress={() => goBack()}>
                            {myIcon}
                        </TouchableOpacity>
                    </View> */}
                </View>
          
            </View>
    );
};

const styles = {
    menuIconStyle: {
        marginLeft: 7
    },
    viewStyle: {
        backgroundColor: '#666666',
        height: 48,
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderRadius: 50,
        margin: 3,
        // width: 300
    },
    outerViewStyle: {
        height: 55,
        marginRight: 25,
        marginLeft: 25,
        marginTop: 1,
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 1.5,
        borderColor: 'grey',
    },
    textStyle: {
        fontSize: 17,
        color: '#fff',
    },
    indicatorStyle: {
        fontSize: 10,
        color: '#66cc00',
    },
    headerDetailStyle: {
       marginLeft: 80,
       // alignItems: 'center',

         position: 'absolute',
    }
};

export default connect()(Header);
