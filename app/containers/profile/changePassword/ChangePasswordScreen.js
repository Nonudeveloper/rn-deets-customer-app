import React from 'react';
import { View, Alert } from 'react-native';
import { initialize } from 'redux-form';
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
      setTimeout(() => {  
        Alert.alert(
          'Error',
          errors[error],
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      }, 500);
        errorCount++;
      }
    }
    if (errorCount === 0) {
       this.props.actions.changeUserPassword(this.props.form.changePassword.values);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { passwordConfirmation } = nextProps;
    passwordConfirmation &&
    passwordConfirmation.log !== this.props.passwordConfirmation.log &&
    (() => {
      const { passwordConfirmation: { log } } = nextProps;
      this.renderAlert(log);
    })();
  }
  
  renderAlert(error) {
    setTimeout(() => {
        Alert.alert(
          'Deets',
          error,
          [
            { 
              text: 'OK', 
              onPress: () => {
                //dispath an action to make showAlert false
                this.props.actions.hideAlert();
                const initialFormData = {
                  current_password: '',
                  confirmPassword: '',
                  new_password: ''
              };
              this.props.navigation.dispatch(initialize('changePassword', initialFormData));
              } 
            },
          ],
          { cancelable: false }
        );
    }, 500);
  }

  render() {
    return (
        <View style={styles.container}>
            <Header 
                headerText={'Change Password'} 
                navigation={this.props.navigation} 
                buttonType={'back'}
            />
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

