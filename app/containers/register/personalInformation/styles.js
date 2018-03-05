import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  nextButtonContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  nextButtonStyle: {
    borderRadius: 100,
    height: 55,
    backgroundColor: '#66cc00',
    borderWidth: 4,
    borderColor: '#bfff80',
    justifyContent: 'center',
    alignItems: 'center'
  },
   profilePic: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
       
    },
    circle: {
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#000',
        height: 50,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center'

    },
    proImageStyle: {
        width: 55,
        height: 55,
        borderRadius: 100
    },
    formArea: {
        flex: 4,
        backgroundColor: '#1a1a1a',
    },
    textStyle: {
        color: '#fff'
    }

});