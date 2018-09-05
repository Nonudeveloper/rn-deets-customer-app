import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Loader from '../../deetscomponents/Loader';

const { width, height } = Dimensions.get('window');

const background = require('./images/back.png');

export default class StartScreen extends Component {

  constructor(props) {
    super(props);
  }

  goToNext() {
    //initiate loading and fetch vehicles
    this.props.getVehicles();
    this.props.navigation.navigate('selectRegisteration');
  }

  render() {
    const { isFetching } = this.props;
    return (
      <View style={styles.container}>
        <Loader
            loading={isFetching} 
        />
        <ImageBackground source={background} style={styles.background} resizeMode="cover">
       </ImageBackground>
        <View style={styles.buttonArea}>
              <TouchableOpacity style={styles.login} onPress={() => this.props.navigation.navigate('loginScreen')} >
                <Text style={{ color: '#cccccc', fontWeight: 'bold', fontSize: 16 }}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.register} onPress={this.goToNext.bind(this)} >
                <Text style={{ color: '#cccccc', fontWeight: 'bold',fontSize: 16 }}>Register{isFetching && 'Loading...'}</Text>
              </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width,
    height,
  },
  buttonArea: {
    backgroundColor: '#a8a8a8',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 20
  },
  login: {
    height: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    borderBottomLeftRadius: 100,
    borderTopLeftRadius: 100,
    flex: 1,
    alignItems: 'center',
    marginLeft: 20,
    borderRightWidth: 2,
    borderColor: '#a8a8a8',
  },
  register: {
    height: 50,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    borderBottomRightRadius: 100,
    borderTopRightRadius: 100,
    flex: 1,
    alignItems: 'center',
    marginRight: 20
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
    padding: 10,
    marginTop: 40
  }
});
