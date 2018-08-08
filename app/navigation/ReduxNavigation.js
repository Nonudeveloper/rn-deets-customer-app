import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import FCM from "react-native-fcm";
import { Platform } from 'react-native';
import { registerAppListener, registerKilledListener } from '../pushNotifications/Listeners';

registerKilledListener();
const background = require('../containers/start/images/back.png');

class ReduxNavigation extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      loggedInStatus: false,
      checkedSignIn: false,
      showLoadingSplash: true,
      deviceToken: ''
    };
  }

  promisedSetState = (newState) => new Promise(resolve => {
      this.setState(newState, () => {
          resolve();
      });
  })

  checkForSignedIn() {
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
          this.setState({
            loggedInStatus: false,
            checkedSignIn: false,
            showLoadingSplash: false
          });
        }
      })
      .catch(err => console.log(err));
  }

  async componentWillMount() {
    registerAppListener(this.props.navigation);
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      });
      if (notif && notif.targetScreen === "detail") {
        setTimeout(() => {
          this.props.navigation.navigate("Detail");
        }, 500);
      }
    });

    try {
      let result = await FCM.requestPermissions({
        badge: false,
        sound: true,
        alert: true
      });
    } catch (e) {
      console.error(e);
    }

    if (Platform.OS === "android") {
      let token = await FCM.getFCMToken();
      await this.promisedSetState({ deviceToken: token });
      this.props.dispatch(saveDeviceToken(token));
      this.checkForSignedIn();
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
      return <LoadingSplash source={background} />;
    } else {
      return <AppNavigation navigation={navigation} />;
    }
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
