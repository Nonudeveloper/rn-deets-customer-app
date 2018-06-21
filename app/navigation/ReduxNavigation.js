import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
//import PushNotification from 'react-native-push-notification';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import FCM, { NotificationActionType } from "react-native-fcm";
import { Platform } from 'react-native';
 
class ReduxNavigation extends React.Component {
  constructor(props) {
    super(props);
    
    
    this.state = {
      loggedInStatus: false,
      checkedSignIn: false,
      showLoadingSplash: true,
      deviceToken: 'dfdf878500mkhfdvcoiuyrwazx'
    };
  }

  componentWillMount() {
    isSignedIn()
      .then(res => {
        if (res !== false) {
          console.log('in if');
          this.setState(() => {
            return {
              loggedInStatus: true,
              checkedSignIn: true,
              showLoadingSplash: false
            };
          }, () => {
              const actionToDispatch = ReactNavigation.NavigationActions.reset({
              index: 0,
              key: null,  // black magic
              actions: [ReactNavigation.NavigationActions.navigate({ routeName: 'drawerStack' })]
            });
            this.props.dispatch(actionToDispatch);
            this.props.dispatch(loginThroughAccessToken(this.state.deviceToken));
          });
        } else {
          console.log('in else');
          this.setState({
            loggedInStatus: false,
            checkedSignIn: false,
            showLoadingSplash: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      const deviceToken = {
        token,
        os: 'android'
      };
      this.setState({ deviceToken: token });
      this.props.dispatch(saveDeviceToken(deviceToken));
    });

    if (Platform.OS === "ios") {
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
        const deviceToken = {
          token,
          os: 'ios'
        };
        this.setState({ deviceToken: token });
        this.props.dispatch(saveDeviceToken(deviceToken));
      });
    }
  }

  render() {
    const { dispatch, nav } = this.props;
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav,
      addListener,
    });
    if (this.state.showLoadingSplash) {
      return <LoadingSplash />;
    } else {
      return <AppNavigation navigation={navigation} />;
    }
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
