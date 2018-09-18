import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import FCM from "react-native-fcm";
import { Platform, Alert, PushNotificationIOS } from 'react-native';
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

  componentWillMount() {

    if (Platform.OS === "android") {
      FCM.getFCMToken().then(token => {
        console.log("TOKEN (getFCMToken)", token);
        const deviceToken = {
          token,
          os: 'android'
        };
        this.setState({ deviceToken });
        this.props.dispatch(saveDeviceToken(deviceToken));
      });
    }

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

  async componentDidMount() {
    registerAppListener(ReactNavigation, this.props);
    FCM.getInitialNotification().then(notif => {
      console.log('here');
      if (notif.fcm.action !== null && notif.message) {
        Alert.alert(
          'Notification',
          notif.message,
          [
            { text: 'Ok', onPress: () => console.log('ok pressed'), style: 'cancel' },
            {
              text: 'View', onPress: () => {
                switch (parseInt(notif.type)) {
                  case 1:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                    }, 500);
                    break;
                  case 2:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'RunningAppointments', params: { timeInterval: 0 } }));
                    }, 500);
                    break;
                  case 3:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SummaryScreen' }));
                    }, 500);
                    break;
                  case 4:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SuggestedServices' }));
                    }, 500);
                    break;
                  case 5:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                    }, 500);
                    break;
                  case 6:
                    setTimeout(() => {
                      this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                    }, 500);
                    break;
                  default:
                    break;
                }
              }
            },
          ],
          { cancelable: false }
        );
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
