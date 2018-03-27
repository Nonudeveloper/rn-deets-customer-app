import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
    nextButtonContainer: {
        flex: 1,
    },
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        backgroundColor: '#8ac10b',
        borderWidth: 4,
        borderColor: '#bfff80',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    profilePic: {
        flex: 1,
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
        width: 55,
        height: 55,
        borderRadius: 100
    },
    formArea: {
        flex: 5,
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
        marginLeft: 48, 
        marginBottom: 43 
    },
    editIcon: {
        resizeMode: 'contain', 
        width: 25, 
        height: 25,
        zIndex: 999,
    }

});
