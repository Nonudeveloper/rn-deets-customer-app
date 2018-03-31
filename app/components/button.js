import React from 'react';
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Image
} from 'react-native';

const Button = ({ children, onPress, style, buttonTextStyle, source }) => {
  const {
        buttonStyle,
        textStyle
    } = styles;

  return (
    <TouchableOpacity style={[buttonStyle, style]} onPress={onPress}>
        <Image 
            style={{ width: 30, height: 30, position: 'absolute', left: 10 }}
            source={source}
        />
      <Text style={[textStyle, buttonTextStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Button;
