import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import HomeScreen from '../containers/home/index';


// drawer stack
const DrawerStack = DrawerNavigator({
  HomeComponent: { screen: HomeScreen }
});

const DrawerNav = StackNavigator({
  drawerStack: { screen: DrawerStack }
}, {
  headerMode: 'none',
  // navigationOptions: ({ navigation }) => ({
  //   headerStyle: { backgroundColor: 'green' },
  //   title: 'Logged In to your app!',
  //   headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  // })
});

export default DrawerNav;

