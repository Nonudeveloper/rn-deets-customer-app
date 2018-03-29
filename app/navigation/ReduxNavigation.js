import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';

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
        if (res !== null) {
          this.setState({
            loggedInStatus: true,
            checkedSignIn: true
          });
        } else {
          console.log(res);
        }
      })
      .catch(err => console.log(err));
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
    //   return <DrawerNavigation navigation={this.navigation} />;
    // } 

    return (
        <AppNavigation navigation={navigation} />
    );
  }
}

const mapStateToProps = state => ({ nav: state.nav });
export default connect(mapStateToProps)(ReduxNavigation);
