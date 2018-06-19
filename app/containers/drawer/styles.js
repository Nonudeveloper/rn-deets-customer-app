import { StyleSheet } from 'react-native';


export const colors = {
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

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 20
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
      top: 30,
      right: 0,
      bottom: 0,
      left: 0,
      // width: SideMenuWidth,
      backgroundColor: 'transparent',
    },
    sideMenuTitle: {
        marginLeft: 20,
        marginBottom: 30
    },
    menu: {
        paddingHorizontal: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        height: 40,
        justifyContent: 'center'
    },
    menuText: {
        marginLeft: 20,
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
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

  export default styles;
