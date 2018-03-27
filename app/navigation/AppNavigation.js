
import React from 'react'; 
import { StackNavigator, DrawerNavigator } from 'react-navigation';
// import DrawerNav from './DrawerNavigation';
// import LoginNav from './LoginNavigation';
// import PersonalInformation from '../containers/register/personalInformation/index';
// import VehicleInformation from '../containers/register/vehicleInformation/index';
import LoginScreen from '../containers/login/index';
import StartScreen from '../containers/start/index';
// import ServiceAddress from '../containers/register/personalInformation/serviceAddress/index';
// import Availability from '../containers/register/availability/index';
// import SelectRegisteration from '../containers/start/SelectRegisteration';
import TestComponent from '../containers/TestComponent';
import { Animated, Easing, Text } from 'react-native';



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

/**Custom transition config */
// this.props.navigate({
//     routeName: 'SceneTwo',
//     params: {
//         transition: 'myCustomTransition'
//     }
// });

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

// drawer stack
const DrawerStack = DrawerNavigator({
  testComponent: { screen: TestComponent },
});

const DrawerNav = StackNavigator({
  drawerStack: { screen: DrawerStack }
}, {
  headerMode: 'float',
  navigationOptions: ({ navigation }) => ({
    headerStyle: { backgroundColor: 'green' },
    title: 'Logged In to your app!',
    headerLeft: <Text onPress={() => navigation.navigate('DrawerOpen')}>Menu</Text>
  })
});

// login stack
const LoginStack = StackNavigator({
  
  startScreen: { screen: StartScreen },
  loginScreen: { screen: LoginScreen },
  // personalInformation: { screen: PersonalInformation },
  // vehicleInformation: { screen: VehicleInformation },
  // availability: { screen: Availability },
  // selectRegisteration: { screen: SelectRegisteration },
  // serviceAddress: { screen: ServiceAddress },
  
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration
  
});

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  loginStack: { screen: LoginStack },
  drawerStack: { screen: DrawerNav }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'loginStack'
});

export default PrimaryNav;

