import React from 'react';
import { View, Alert } from 'react-native';
import Header from '../../header/Header';
import styles from './styles';
import Button from '../../../deetscomponents/Button';
import StyleConstants from '../../../config/StyleConstants';
import FormArea from './Form';


export default class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  goToNext() {
    const errors = this.props.form.changePassword.syncErrors;
    let errorCount = 0;
    for (const error in errors) {
      if (errors[error] !== undefined && errorCount === 0) {
        Alert.alert(
          'Error',
          errors[error],
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
        errorCount++;
      }
    }
    if (errorCount === 0) {
       this.props.actions.changeUserPassword(this.props.form.changePassword.values);
    }
  }
  
  renderAlert(error) {
    Alert.alert(
      'Error',
      error,
      [
        { 
          text: 'OK', 
          onPress: () => {
            //dispath an action to make showAlert false
            this.props.actions.hideAlert();
          } 
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    return (
        <View style={styles.container}>
            <Header 
                headerText={'Change Password'} 
                navigation={this.props.navigation} 
                buttonType={'back'}
            />
            {this.props.passwordConfirmation !== '' && this.renderAlert(this.props.passwordConfirmation.log)}
            <FormArea />
            <View style={styles.nextButtonContainer}>
                <Button 
                    style={[styles.nextButtonStyle, { backgroundColor: StyleConstants.RegisterButtonBColor }]}
                    onPress={this.goToNext.bind(this)}
                >
                Save
                </Button>
            </View>
        </View>
    );
  }
}

