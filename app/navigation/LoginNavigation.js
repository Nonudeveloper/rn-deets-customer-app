import { StackNavigator } from 'react-navigation';
import PersonalInformation from '../containers/register/personalInformation/index';
import VehicleInformation from '../containers/register/vehicleInformation/index';
import LoginScreen from '../containers/login/index';
import StartScreen from '../containers/start/StartScreen';

// login stack
const LoginStack = StackNavigator({
  startScreen: { screen: StartScreen },
  loginScreen: { screen: LoginScreen },
  personalInformation: { screen: PersonalInformation },
  vehicleInformation: { screen: VehicleInformation },
}, {
  headerMode: 'none',
  navigationOptions: {
    headerStyle: { marginTop: 15, backgroundColor: 'red' },
    title: 'You are not logged in'
  } 
  
});

const LoginNav = StackNavigator({
    loginStack: { screen: LoginStack },
}, {
    headerMode: 'none',
    initialRouteName: 'loginStack'
});

export default LoginNav;

