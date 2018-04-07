import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const processOne = require('../../assets/icons/4_burger_btn_onclick.png');

export default class TestComponent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('DrawerOpen')}>
            <Image source={processOne} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
          <Text>TestComponent</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    shadowColor: '#000000',
    shadowOpacity: 0.4,
    shadowOffset: { height: -5, width: -5 },
    shadowRadius: 10,
    backgroundColor: 'grey',
},
navBar: {
    height: 50,
    justifyContent: 'center',
    paddingHorizontal: 15
}
});
