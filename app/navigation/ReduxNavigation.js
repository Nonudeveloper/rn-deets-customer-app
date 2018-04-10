import React from 'react';
import * as ReactNavigation from 'react-navigation';
import { connect } from 'react-redux';
import DrawerNavigation from './DrawerNavigation';
import AppNavigation from './AppNavigation';
import { isSignedIn } from '../helpers/utility';
import { addListener } from '../helpers/utils/redux';
import { NavigationActions } from 'react-navigation'

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
          const actionToDispatch = NavigationActions.reset({
            index: 0,
            key: null,  // black magic
            actions: [NavigationActions.navigate({ routeName: 'drawerStack' })]
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
