import React from 'react';
import { TextInput, View, Text } from 'react-native';

import styles from './loginScreen.style';

/**
 * to be wrapped with redux-form Field component
 */
export default function CommonTextInput(props) {
  const { input, meta, ...inputProps } = props;
  const formStates = ['active', 'autofilled', 'asyncValidating', 'dirty', 'invalid', 'pristine',
    'submitting', 'touched', 'valid', 'visited'];
  return (
    <View>
      <TextInput
        {...inputProps}
        onChangeText={input.onChange}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        value={input.value}
        style={styles.input}
      />
    </View>
  );
}
