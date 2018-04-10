
import React from 'react'; 
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNavigation';
import LoginNav from './LoginNavigation';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginNav },
  drawerStack: { screen: DrawerNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'loginStack'
});

export default PrimaryNav;

