import { Animated, Easing } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PersonalInformation from '../containers/register/personalInformation/index';
import VehicleInformation from '../containers/register/vehicleInformation/index';
import LoginScreen from '../containers/login/index';
import ForgotPasswordScreen from '../containers/login/forgotPassword/index';
import StartScreen from '../containers/start/index';
import SelectRegisteration from '../containers/start/SelectRegisteration';
import PaymentInformation from '../containers/register/paymentInformation/PaymentInformation';
import CreditCardForm from '../containers/register/paymentInformation/CreditCardForm';

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


// login stack
const LoginStack = StackNavigator({
  paymentInformation: { screen: PaymentInformation },
  startScreen: { screen: StartScreen },
  loginScreen: { screen: LoginScreen },
  forgotPasswordScreen: { screen: ForgotPasswordScreen },
  personalInformation: { screen: PersonalInformation },
  vehicleInformation: { screen: VehicleInformation },
  selectRegisteration: { screen: SelectRegisteration },
  creditCardForm: { screen: CreditCardForm },
  
}, {
  headerMode: 'none',
  transitionConfig: TransitionConfiguration
  
});


export default LoginStack;

