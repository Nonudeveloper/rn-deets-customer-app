import React from 'react';
import { TextInput, View, Text, StyleSheet, TouchableOpacity } from 'react-native';


/**
 * to be wrapped with redux-form Field component
 */
export default function CommonTextInput(props) {
  const { input, meta, ...inputProps } = props;
  const type = props.type ? props.type : 'text';
  // const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
  //   'submitting', 'touched', 'valid', 'visited'];
  return (
    <View>


      { type === 'text' && 
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, props.borderBotmWidth]}
          placeholderTextColor="#ccc"
          keyboardType="default"
        />
      }

      { type === 'password' && 
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, props.borderBotmWidth]}
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          keyboardType="default"
        />
      }

      { type === 'email' && 
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, props.borderBotmWidth]}
          onEndEditing={input.onBlur}
          placeholderTextColor="#ccc"
          keyboardType="email-address"
        />
      }

      { type === 'mobile' && 
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, props.borderBotmWidth]}
          placeholderTextColor="#ccc"
          keyboardType="phone-pad"
        />
      }
      {type === 'type' &&
      <TouchableOpacity onPress={props.onPress}>
        <TextInput
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          style={[styles.input, props.borderBotmWidth]}
          placeholderTextColor="#ccc"
          keyboardType="default"
          editable={false}
        />
      </TouchableOpacity>
    }
      
    </View>
  );
}
const styles = StyleSheet.create({
    input: {
      height: 54,
      borderColor: '#ccc',
      color: '#ccc',
      marginLeft: 25,
      fontSize: 16
    }
});
