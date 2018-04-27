import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import { onSignOut } from '../../helpers/utility';
import LinearGradient from 'react-native-linear-gradient'

const userPic = require('../../assets/icons/3_user_img.png');
// let SideMenuWidth = 300;
const colors = {
  txtMain: '#214559',
  txtMainRed: '#FE6165',
  txtDescription: '#757575',
  txtDark: '#214559',
  txtWhite: '#ffffff',

  bgMain: '#5699b5',
  bgMainDark: '#214559', // For screens > auth
  bgMainRed: '#FE6165',
  bgWhite: '#ffffff',
  bgError: '#fb642d',
  bgChat: '#f1f1f1',
  bgSuccess: '#25ce66',

  bdMain: '#214559',
  bdMainRed: '#FE6165',
  bdWhite: '#ffffff',
  bdLine: '#dddddd',
  bdInput: '#cbcbcb'
};

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
    console.log(this.props);
    return (
      // <View style={styles.container}>
      <LinearGradient 
        start={{ x: 0.0, y: 0.25 }} 
        end={{ x: 0.5, y: 1.0 }}
        locations={[0.1, 0.75, 1]}
        // colors={['#5cb85c', '#94c194', '#5cb85c']} 
        style={styles.container}
      >
{/* </LinearGradient> */}
        <View style={{ alignSelf: 'center' }}>
          <Image source={userPic} style={styles.imageStyle} />
        </View>
        <View style={styles.sideMenu}>
          <View style={{ paddingHorizontal: 30 }}>
            <TouchableOpacity 
              style={[styles.menu, this.props.activeItemKey === 'appointmentStack' ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('appointmentStack')} 
            >
                  <Icon name='home' color={colors.txtWhite} size={24} />
                  <Text style={styles.menuText} type='h5White'>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.menu, this.props.activeItemKey === 'HomeComponent' ? { backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 5 } : { backgroundColor: 'transparent' }]}
              onPress={() => navigation.navigate('DateTimeScreen')} 
            >
                  <Icon name='cog' color={colors.txtWhite} size={24} />
                  <Text style={styles.menuText} type='h5White'>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.menu}>
                  <Icon name='bell-o' color={colors.txtWhite} size={24} />
                  <Text style={styles.menuText} type='h5White'>Appointments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={ styles.menu } onPress={() => onSignOut().then(() => navigation.navigate('loginStack'))} >
                  <Icon name='sign-out' color={colors.txtWhite} size={24} />
                  <Text style={styles.menuText} type='h5White'>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ alignSelf: 'center' }}>
          <Image source={userPic} style={styles.imageStyle} />
         </View>
        <Text
          onPress={() => navigation.navigate('screen1')}
          style={styles.uglyDrawerItem}>
          Screen 1
        </Text>
        <Text
          onPress={() => navigation.navigate('screen2')}
          style={styles.uglyDrawerItem}>
          Screen 2
        </Text>
        <Text
          onPress={() => navigation.navigate('screen3')}
          style={styles.uglyDrawerItem}>
          Screen 3
        </Text>
        <Text
          onPress={this.logout}
          style={styles.uglyDrawerItem}>
          Log Out
        </Text> */}
        </LinearGradient>
      // </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f6f6f6',
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.bgMain,
  },
  uglyDrawerItem: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E73536',
    padding: 15,
    margin: 5,
    borderRadius: 2,
    borderColor: '#E73536',
    borderWidth: 1,
    textAlign: 'center'
  },
  imageStyle: {
    width: 55,
    height: 55,
    borderRadius: 100,
    alignSelf: 'center'
    
  },
  sideMenu: {
    position: 'absolute',
    top: 100,
    right: 0,
    bottom: 0,
    left: 0,
    // width: SideMenuWidth,
    backgroundColor: 'transparent'
},
sideMenuTitle: {
    marginLeft: 20,
    marginBottom: 30
},
menu: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10
},
menuText: {
    marginLeft: 20,
    color: 'white',
    fontSize:15
},
header: {
    marginTop: 20,
    marginBottom: 20
},
userInfosHolder: {
    flexDirection: 'row',
    justifyContent: 'space-between'
},
avatar: {
    width: 60,
    height: 60,
    borderRadius: 30
},
userInfos: {
    height: 50,
    justifyContent: 'center'
},
username: {
    fontWeight: '700'
},
linearGradient: {
  flex: 1,
  paddingLeft: 15,
  paddingRight: 15,
  borderRadius: 5
},
buttonText: {
  fontSize: 18,
  fontFamily: 'Gill Sans',
  textAlign: 'center',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
},
});
