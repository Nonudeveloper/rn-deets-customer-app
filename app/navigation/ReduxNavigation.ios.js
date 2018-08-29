import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { saveDeviceToken, loginThroughAccessToken } from '../redux/auth/actions';
import LoadingSplash from './LoadingSplash';
import { Platform, Alert, PushNotificationIOS } from 'react-native';

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

      PushNotificationIOS.addEventListener("register", function(token) {
        console.log("TOKEN", token);

        const deviceToken = {
          token,
          os: 'ios'
        };
        $this.setState( deviceToken );
        $this.props.dispatch(saveDeviceToken(deviceToken));
      });


      PushNotificationIOS.addEventListener("registrationError", function(token) {
        //console.log(token);
      });

      PushNotificationIOS.addEventListener("notification", function(notification) {
        // if (AppState.currentState === "background") {
        //   //$this.backgroundNotification = notification;
        // }
      });


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
