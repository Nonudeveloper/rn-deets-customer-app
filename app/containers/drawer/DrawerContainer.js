import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { onSignOut } from '../../helpers/utility';
import styles, { colors } from './styles';
import LinearGradient from 'react-native-linear-gradient';


const userPic = require('../../assets/icons/3_user_img.png');
// let SideMenuWidth = 300;


export default class DrawerContainer extends React.Component {

  // logout = () => {
  //   // This will reset back to loginStack
  //   // https://github.com/react-community/react-navigation/issues/1127
  //   const actionToDispatch = NavigationActions.reset({
  //     index: 0,
  //     key: null,  // black magic
  //     actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
  //   })
  //   console.log(this.props)
  //   this.props.navigation.dispatch(actionToDispatch)
  // }

  render() {
    const { navigation } = this.props;
    return (
      // <View style={styles.container}>
      <LinearGradient 
        start={{ x: 0.0, y: 0.25 }} 
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.1, 0.75, 1]}
        colors={['#5cb85c', '#94c194', '#5cb85c']} style={styles.container}
      >
{/* </LinearGradient> */}
        <View style={styles.sideMenu}>
          <View style={{}}>
            <TouchableOpacity 
              style={[styles.menu, this.props.activeItemKey === 'SelectVehileScreen' ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('SelectVehileScreen')} 
            >
                  <Text style={styles.menuText} type='h5White'>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menu, this.props.activeItemKey === 'HomeComponent' ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('DateTimeScreen')} 
            >
                  <Text style={styles.menuText} type='h5White'>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu}>
                  <Text style={styles.menuText} type='h5White'>Notification</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu} onPress={() => onSignOut().then(() => navigation.navigate('loginStack'))} >
                  <Text style={styles.menuText} type='h5White'>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        </LinearGradient>
    );
  }
}

