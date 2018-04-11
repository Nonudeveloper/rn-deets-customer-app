import React from 'react';
import { Text, Image,TouchableOpacity } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import SelectVehileScreen from '../containers/appointment/vehicle/index';
import DrawerContainer from '../containers/home/DrawerContainer';
import Profile from '../containers/home/Profile';
import HomeScreen from '../containers/home/index';
import AddVehicle from '../containers/appointment/vehicle/addEditVehicle/index';
import ServiceScreen from '../containers/services/index';


const processOne = require('../assets/icons/4_burger_btn_onclick.png');
// drawer stack

const DrawerStack = DrawerNavigator({
  serviceScreen: { screen: ServiceScreen },
  HomeComponent: { screen: HomeScreen },
  SelectVehileScreen: { screen: SelectVehileScreen },
  test: { screen: Profile },
  AddEditVehicle: { screen: AddVehicle }
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

