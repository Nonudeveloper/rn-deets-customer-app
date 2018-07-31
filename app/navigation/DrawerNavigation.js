import React from 'react';
import { Animated, Easing } from 'react-native';
import { StackNavigator, DrawerNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import SelectVehileScreen from '../containers/appointment/vehicle/index';
import DrawerContainer from '../containers/drawer/DrawerContainer';
import HomeScreen from '../containers/home/index';
import AddVehicle from '../containers/appointment/vehicle/addEditVehicle/index';
import ServiceScreen from '../containers/appointment/services/index';
// import ServiceDetailScreen from '../containers/appointment/services/serviceDetail/index';
import DateTimeScreen from '../containers/appointment/dateTimeSchedule/index';
import NotesScreen from '../containers/appointment/notes/index';
import ReviewScreen from '../containers/appointment/review/index';
import CreditCardForm from '../containers/appointment/review/paymentInformation/index';
import DetailScreen from '../containers/profile/index';
import ChangePasswordScreen from '../containers/profile/changePassword/index';
import PastAppointmentsList from '../containers/appointmentList/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AddVehicleScreen from '../containers/profile/addVehicle/index';
import DrawerServicesList from '../containers/serviceList/index';
import PromotionCodeScreen from '../containers/promotionCode/index';
import AppointmentDetail from '../containers/appointmentList/detail/index';
import RecentLocations from '../containers/home/recentLocations/index';
import SummaryScreen from '../containers/summary/index';
import RunningAppointments from '../containers/runningAppointments/index';


const processOne = require('../assets/icons/4_burger_btn_onclick.png');

/**Cunstom Transitions */
const MyTransition = (toIndex, thisSceneIndex, height, width, scenes, position) => {
  const translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
          outputRange: [width, 0, 0]
  });
  const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0]
  });

  const slideFromRight = { transform: [{ translateX }] };
  const slideFromBottom = { transform: [{ translateY }] };

  const lastSceneIndex = scenes[scenes.length - 1].index;

  // Test whether we're skipping back more than one screen
  if (lastSceneIndex - toIndex > 1) {
      // Do not transoform the screen being navigated to
      if (scene.index === toIndex) return;
      // Hide all screens in between
      if (scene.index !== lastSceneIndex) return { opacity: 0 };
      // Slide top screen down
      return slideFromBottom;
  }
  return slideFromRight;
};

/**Transition Configurator */

const TransitionConfiguration = () => {
  return {
        transitionSpec: {
            duration: 550,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
      // Define scene interpolation, eq. custom transition
         screenInterpolator: (sceneProps) => {
            const { position, layout, scene, index, scenes } = sceneProps;
            const toIndex = index;
            const thisSceneIndex = scene.index;
            const height = layout.initHeight;
            const width = layout.initWidth;
            return MyTransition(toIndex, thisSceneIndex, height, width, scenes, position); 
        }
    };
};

// appointmentStack stack

const appointmentStack = StackNavigator({
  HomeComponent: { screen: HomeScreen },
  serviceScreen: { screen: ServiceScreen },
  SelectVehicleScreen: { screen: SelectVehileScreen },
  AddEditVehicle: { screen: AddVehicle },
  DateTimeScreen: { screen: DateTimeScreen },
  reviewScreen: { screen: ReviewScreen },
  notesScreen: { screen: NotesScreen },
  creditCardForm: { screen: CreditCardForm },
  detailsScreen: { screen: DetailScreen },
  changePasswordScreen: { screen: ChangePasswordScreen },
  addVehicleScreen: { screen: AddVehicleScreen },
  DrawerServicesList: { screen: DrawerServicesList },
  RecentLocations: { screen: RecentLocations },
  PastAppointmentsList: { screen: PastAppointmentsList },
  PastAppointmentsDetail: { screen: AppointmentDetail },
  PromotionCodeScreen: { screen: PromotionCodeScreen },
  SummaryScreen: { screen: SummaryScreen },
  RunningAppointments: { screen: RunningAppointments }
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration,
  contentOptions: {
    activeTintColor: '#e91e63',
    activeBackgroundColor: 'purple',
  },
});

// const AppStackNavigator = StackNavigator({
//   loginFlow: { 
//     screen: StackNavigator({
//       splash: { screen: SplashScreen },
//       login: { screen: LoginScreen },
//       forgotPassword: { screen: ForgotPasswordScreen }
//     })
//   },
//   mainFlow: {
//     screen: StackNavigator({
//       main: { screen: MainScreen },
//       settings: { screen: SettingsScreen },
//       someTab: { 
//         screen: TabNavigator({
//           firstTab: { screen: FirstTabScreen },
//           secondTab: { screen: SecondTabScreen },
//           thirdTab: { screen: ThirdTabScreen }
//         })
//       }
//     })
//   }
// });

const DrawerStack = DrawerNavigator({
  appointmentStack: {
    screen: appointmentStack
  },
}, {
  headerMode: 'none',
  gesturesEnabled: false,
  contentComponent: DrawerContainer,
  drawerBackgroundColor: 'transparent',
  drawerWidth: 240,
  useNativeAnimations: true
});

export default DrawerStack;

