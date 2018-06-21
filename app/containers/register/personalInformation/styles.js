import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // marginVertical: 50
  },
    nextButtonContainer: {
        paddingTop: 60
    },
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        // backgroundColor: '#8ac10b',
        borderWidth: 4,
        borderColor: '#bfff80',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePic: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 7
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
        width: 85,
        height: 85,
        borderRadius: 100
    },
    formArea: {
        marginTop: 20,
        backgroundColor: '#333333',
    },
    textStyle: {
        color: '#fff'
    },
    crossButtonContainer: { 
        flex: 1, 
        borderBottomWidth: 2, 
        borderColor: '#ccc', 
        flexDirection: 'row', 
        paddingTop: 20 
    },
    editButtonWrapper: { 
        zIndex: 999, 
        justifyContent: 'flex-end', 
        marginLeft: 68, 
        marginBottom: 63 
    },
    editIcon: {
        resizeMode: 'contain', 
        width: 25, 
        height: 25,
        zIndex: 999,
    },
    mainContainer: {
        flex: 1, 
        flexDirection: 'column', 
        justifyContent: 'center', 
        marginVertical: 20
    }

});
