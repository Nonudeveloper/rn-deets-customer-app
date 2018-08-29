import React from 'react';
import { StyleSheet, View, Keyboard, Text } from 'react-native';
import { Field, reduxForm, initialize } from 'redux-form';
import Header from '../../header/Header';
import Button from '../../../deetscomponents/Button';
import CommonTypeTextInput from '../../../components/form/Input';

const indicatorThree = require('../../../assets/icons/process3.png');

class NotesScreen extends React.Component {

  constructor(props) {
    super(props);
    // this.props.actions.fetchServices();
  }

  componentWillMount() {
      if (!this.props.userCardDetails.length) {
        this.props.actions.fetchCardDetails();
      }
  }

  componentDidMount() {
      const initialFormData = {
        notes: ''
    };
    this.props.dispatch(initialize('notes', initialFormData));
  }
  
  render() {
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        <Header 
            navigation={this.props.navigation} 
            headerText={'Notes'}
            showRightIcon
            rightText={'Next'}
            onPress={() => { 
                Keyboard.dismiss(); 
                this.props.navigation.navigate('reviewScreen');
            }}
            indicatorSource={indicatorThree}
        />
        {/* <Loader loading={isFetching} /> */}
        <View style={styles.inputView}>
            <Field
                name={'notes'}
                component={CommonTypeTextInput}
                props={this.props}
                placeholder={'Please enter your instructions here... '}
                placeholderTextColor='#fff'
                underlineColorAndroid="transparent"
                type="multilinetext"
                borderBotmWidth={styles.input}
            />
            <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, color: '#444' , letterSpacing: 1 }}>Enter any note or special instructions for the technician here, i.e where is your vehicle parked? where should we pick up your keys? Gate or garage codes?</Text>
            </View>
        </View>
      </View>
    );
  }
}


export default reduxForm({ 
    form: 'notes',
    enableReinitialize: true,
})(NotesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        padding: 15,
        margin:10,
        borderRadius: 10,
        borderColor: '#48BBEC',
        backgroundColor: '#000',
        color: '#fff',
        textAlignVertical: 'top',
        height: 150,
        fontWeight: 'bold',
        fontSize: 16
    },
    inputView: {
        paddingHorizontal: 10
    }
});
