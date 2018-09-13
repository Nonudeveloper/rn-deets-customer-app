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
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        borderWidth: 4,
        borderColor: '#2ea549',
        justifyContent: 'center',
        alignItems: 'center'
    },
    formArea: {
        marginTop: 20,
        backgroundColor: '#333333',
    },
    nextButtonContainer: {
        // flex: 1, 
        top: 20,
        marginHorizontal: 25, 
        justifyContent: 'center'
    }

});
