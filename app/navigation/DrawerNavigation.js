import React from 'react';
import { Text } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import TestComponent from '../containers/TestComponent';


// drawer stack
const DrawerStack = DrawerNavigator({
  testComponent: { screen: TestComponent },
});

const DrawerNav = StackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: 'green' },
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
});

export default DrawerNav;

