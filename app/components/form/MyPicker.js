import React from 'react';
import { Picker, View } from 'react-native';

export default function MyPicker(props) {
  const { input, value, children, ...pickerProps } = props;
  console.log(props);
   
  return (
    <View>
    <Picker
      selectedValue={value}
      onValueChange={input.onChange(props.selectedValue)}
      {...input}
      {...pickerProps}
      style={{ color: 'grey' }}
      itemStyle={{ backgroundColor: 'lightgrey' }}
      itemTextStyle={{ fontSize: 18, color: 'white' }}
      textStyle={{ color: 'red' }}
      mode='dialog'
    >
      { children }
    </Picker>
    </View>
  );
}
