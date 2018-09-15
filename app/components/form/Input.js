import React, { Component } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';


/**
 * to be wrapped with redux-form Field component
 */
export default class CommonTextInput extends Component {
  render() {
    const { input, refField, ...inputProps, } = this.props;
    const type = this.props.type ? this.props.type : 'text';
    // const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    //   'submitting', 'touched', 'valid', 'visited'];
    return (
      <View>
        { type === 'multilinetext' && 
          <TextInput
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            style={[this.props.borderBotmWidth]}
            placeholderTextColor="#ccc"
            keyboardType="default"
            multiline
            numberOfLines={8}
            maxLength={500}
          />
        }
        { type === 'modaltype' &&
          <TouchableOpacity onPress={this.props.onPress}>
            <TextInput
              {...inputProps}
              onChangeText={input.onChange}
              onBlur={input.onBlur}
              onFocus={input.onFocus}
              value={input.value}
              style={[styles.input, this.props.borderBotmWidth]}
              placeholderTextColor="#ccc"
              keyboardType="default"
              editable={false}
              ref={refField}
            />
          </TouchableOpacity>
        }
        
      </View>
    );
  }

  
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
