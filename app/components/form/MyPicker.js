import React from 'react';
import { Picker, View } from 'react-native';

export default function MyPicker(props) {
  const { input, children, ...pickerProps } = props;
  return (
    <View>
    <Picker
     {...input}
      selectedValue={input.value}
      onValueChange={input.onChange}
      {...pickerProps}
      style={{ color: '#ccc' }}
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
