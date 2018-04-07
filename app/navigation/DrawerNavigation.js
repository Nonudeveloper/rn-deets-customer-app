import React from 'react';
import { Text, Image,TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import TestComponent from '../containers/home/TestComponent';
import DrawerContainer from '../containers/home/DrawerContainer';

const processOne = require('../assets/icons/4_burger_btn_onclick.png');
// drawer stack

const DrawerStack = DrawerNavigator({
  testComponent: { screen: TestComponent },
}, {
  gesturesEnabled: false,
  contentComponent: DrawerContainer
});

const DrawerNav = StackNavigator({
  drawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: 'gray' },
    // title: 'Logged In to your app!',
    headerLeft: <TouchableOpacity style={{ paddingLeft: 5 }}
                  onPress={() => {
                    console.log(navigation)
                      if (navigation.state.index === 0) {
                          navigation.navigate('DrawerOpen');
                      } else {
                          navigation.navigate('DrawerClose');
                      }
                  }}
                >
                  <Image source={processOne} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
  })
});

export default DrawerNav;

