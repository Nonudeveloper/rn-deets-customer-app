import React from 'react';
import { StyleSheet, View, Keyboard } from 'react-native';
import { Field, reduxForm } from 'redux-form';
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
                placeholder={'Type your notes here!'}
                placeholderTextColor='grey'
                underlineColorAndroid="transparent"
                type="multilinetext"
                borderBotmWidth={styles.input}
            />
        </View>
      </View>
    );
  }
}


export default reduxForm({ 
    form: 'notes',
})(NotesScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    input: {
        padding: 10,
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: '#48BBEC',
        backgroundColor: '#000',
        color: 'grey',
        textAlignVertical: 'top'
    }
});
