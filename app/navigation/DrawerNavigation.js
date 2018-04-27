import React from 'react';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import SelectVehileScreen from '../containers/appointment/vehicle/index';
import DrawerContainer from '../containers/drawer/DrawerContainer';
import HomeScreen from '../containers/home/index';
import AddVehicle from '../containers/appointment/vehicle/addEditVehicle/index';
import ServiceScreen from '../containers/appointment/services/index';
import ServiceDetailScreen from '../containers/appointment/services/serviceDetail/index';
import DateTimeScreen from '../containers/appointment/dateTimeSchedule/index';
import NotesScreen from '../containers/appointment/notes/index';
import ReviewScreen from '../containers/appointment/review/index';


const processOne = require('../assets/icons/4_burger_btn_onclick.png');
// drawer stack

const appointmentStack = StackNavigator({
  HomeComponent: { screen: HomeScreen },
  serviceScreen: { screen: ServiceScreen },
  serviceDetailScreen: { screen: ServiceDetailScreen },
  SelectVehicleScreen: { screen: SelectVehileScreen },
  AddEditVehicle: { screen: AddVehicle },
  DateTimeScreen: { screen: DateTimeScreen },
  reviewScreen: { screen: ReviewScreen },
  notesScreen: { screen: NotesScreen },
}, {
  contentOptions: {
    activeTintColor: "#e91e63",
    activeBackgroundColor: 'purple',
  },
  headerMode: 'none'
});

const DrawerStack = DrawerNavigator({
  appointmentStack: {
    screen: appointmentStack
  },
}, {
  headerMode: 'none',
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerBackgroundColor: 'transparent'
});

// const DrawerNav = StackNavigator({
//   drawerStack: { screen: DrawerStack }
 
// }, {
//   headerMode: 'none'
// });

export default DrawerStack;

