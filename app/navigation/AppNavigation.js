
import React from 'react'; 
import { StackNavigator } from 'react-navigation';
import DrawerNav from './DrawerNavigation';
import LoginNav from './LoginNavigation';
import Login from '../components/chat/Login';
import Users from '../components/chat/Users';

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginNav },
  drawerStack: { screen: DrawerNav },
  login: { screen: Login },
  users: { screen: Users }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'login'
});

export default PrimaryNav;

