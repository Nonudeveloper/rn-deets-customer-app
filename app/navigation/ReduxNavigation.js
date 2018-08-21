import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import FCM from "react-native-fcm";
import { Platform, Alert } from 'react-native';
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
      if (notif.fcm.action !== null && notif.message) {
      Alert.alert(
        'Notification',
        notif.message,
        [
          { text: 'Ok', onPress: () => console.log('ok pressed'), style: 'cancel' },
          { text: 'View', onPress: () => {
            switch (parseInt(notif.type)) {
              case 1:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                break;
              case 2:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'RunningAppointments', params: { timeInterval: 0 } }));
                break;
              case 3:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SummaryScreen' }));
                break;
              case 4:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SuggestedServices' }));
                break;
              case 5:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                break;
              case 6:
              this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                break;
              default:
                break;
            }
          } },
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
  
    // if (Platform.OS === "android") {
    //   FCM.getFCMToken().then(token => {
    //     console.log("TOKEN (getFCMToken)", token);
    //     const deviceToken = {
    //       token,
    //       os: 'android'
    //     };
    //     this.setState({ deviceToken: token });
    //     this.props.dispatch(saveDeviceToken(deviceToken));
    //   });
    // }

    // topic example
    // FCM.subscribeToTopic('sometopic')
    // FCM.unsubscribeFromTopic('sometopic')
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
