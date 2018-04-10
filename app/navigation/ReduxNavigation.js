import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import PushNotification from 'react-native-push-notification';
import { saveDeviceToken } from '../redux/auth/actions';
 
class ReduxNavigation extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      loggedInStatus: false,
      checkedSignIn: false
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => {
        console.log(res);
        if (res !== false) {
          this.setState(() => {
            return {
              loggedInStatus: true,
              checkedSignIn: true
            };
        }, () => {
          const actionToDispatch = ReactNavigation.NavigationActions.reset({
            index: 0,
            key: null,  // black magic
            actions: [ReactNavigation.NavigationActions.navigate({ routeName: 'drawerStack' })]
          });
          this.props.dispatch(actionToDispatch);
        });

        } else {
          // this.setState({
          //   loggedInStatus: false,
          //   checkedSignIn: false
          // });
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    console.log('Did mount');
    PushNotification.configure({
      
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: (token) => {
        this.props.dispatch(saveDeviceToken(token));
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification) => {
        console.log('NOTIFICATION:', notification);
      },

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '422724865895',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });
    // if (!this.state.checkedSignIn) {
    //   return null;
    // }
    // if (this.state.loggedInStatus) {
    //   // return <DrawerNavigation navigation={this.navigation} />;
    //   return <AppNavigation navigation={navigation}  />;
    // } else {
      return <AppNavigation navigation={navigation} />;
    // }
    
//     if (!this.state.checkedSignIn) {
//       return null;
//     }
//     if (this.state.loggedInStatus) {
//       return <DrawerNavigation navigation={this.navigation} />;
//     } 

    // return (
    //     <AppNavigation navigation={navigation} />
    // );
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
