import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';

import DrawerNavigation from './DrawerNavigation';
import LoginNavigation from './LoginNavigation';


// here is our redux-aware our smart component

class ReduxNavigation extends React.Component {
  constructor(props) {
    super(props);
    const { dispatch, nav } = props;
    const navigation = ReactNavigation.addNavigationHelpers({
      dispatch,
      state: nav
    });
    this.state = {
      loggedInStatus: false
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('deetsUser',
    (user) => {
      if (user !== null) {
        this.setState({ loggedInStatus: true });
      }
    });
  }

  render() {
    if (this.state.loggedInStatus === true) {
      return <DrawerNavigation navigation={this.navigation} />;
    } else if (this.state.loggedInStatus === false) {
      return <LoginNavigation navigation={this.navigation} />;
    }
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
