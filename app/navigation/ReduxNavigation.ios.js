import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import { Platform, Alert, PushNotificationIOS } from 'react-native';
import Instabug from 'instabug-reactnative';
 

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

    let $this = this;
      //console.log(PushNotificationIOS);
      PushNotificationIOS.requestPermissions();

      PushNotificationIOS.addEventListener("register", async(token) => {
        console.log("TOKEN", token);

        const deviceToken = {
          token,
          os: 'ios'
        };

        await $this.setState( deviceToken );
        $this.props.dispatch(saveDeviceToken(deviceToken));
        $this.syncToken(deviceToken);
      });


      PushNotificationIOS.addEventListener("registrationError", function(token) {
        console.log(token);
      });

      PushNotificationIOS.addEventListener("notification", function(notification) {
          console.log('PUSH data: ', notification);
          Instabug.logInfo(notification);
          if (notification.message) {
          setTimeout(() => {
            Alert.alert(
              'Deets',
              notification.message,
              [
                { text: 'Ok', onPress: () => console.log('ok pressed'), style: 'cancel' },
                { text: 'View', onPress: () => {
                  switch (parseInt(notification.type)) {
                    case 1:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                      break;
                    case 2:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'RunningAppointments', params: { timeInterval: 0 } }));
                      break;
                    case 3:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SummaryScreen' }));
                      break;
                    case 4:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'SuggestedServices' }));
                      break;
                    case 5:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                      break;
                    case 6:
                     $this.props.dispatch(ReactNavigation.NavigationActions.navigate({ routeName: 'PastAppointmentsList' }));
                      break;
                    default:
                      break;
                  }
                } },
              ],
              { cancelable: false }
            );
          }, 500);
        }
      });

      isSignedIn()
      .then(res => {
        if (res !== false) {
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

    }

    syncToken(deviceToken) {
        isSignedIn()
        .then(res => {
          if (res !== false) {
            this.props.dispatch(loginThroughAccessToken(deviceToken));
          }
       });     
    }

    render() {
      console.log(this.props);
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
