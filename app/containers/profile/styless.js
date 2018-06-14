import { StyleSheet, Dimensions } from 'react-native';

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width / 7;

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    nextButtonStyle: {
        borderRadius: 100,
        height: 55,
        borderWidth: 4,
        borderColor: '#bfff80',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profilePic: {
        alignItems: 'center',
        justifyContent: 'center',
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
        width: 100,
        height: 100,
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
        marginLeft: 73, 
        marginBottom: 78 
    },
    editIcon: {
        resizeMode: 'contain', 
        width: 25, 
        height: 25,
        zIndex: 999,
    },
    crossButtonContainerMobile: {
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 20 
    },
    toggleButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    detailButtonInnerContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,
        height: 55,
        // backgroundColor: '#28a745',
        // borderWidth: 4,
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderRightWidth: 6,
        // borderColor: '#5eaf71',
    },
    detailButtonInnerWraper: {
        flex: 1, 
        justifyContent: 'flex-end'
    },
    detailTextContainer: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10,
    },
    vehicleButtonInnerContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 100,
        borderTopLeftRadius: 100,
        height: 55,
        // backgroundColor: 'black',
        // borderWidth: 4,
        // borderColor: 'grey',
        borderTopWidth: 6,
        borderBottomWidth: 6,
        borderLeftWidth: 6,
    },
    vehicleTextContainer: {
        alignSelf: 'center',
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    },
    pictureWraper: {
        flex: 1,
        flexDirection: 'row',
    },
    profilePicContainer: {
        flex: 1,
    },
    logoutButtonContainer: {
        justifyContent: 'center', 
        alignItems: 'flex-end' 
    },
    formContainer: {
        flex: 4, 
        flexDirection: 'column',
        backgroundColor: 'red'
    },
    nextButtonContainer: {
        flex: 1, 
        marginHorizontal: 25, 
        justifyContent: 'center'
    },
    activeButtonStyle: {
        backgroundColor: '#28a745',
        borderColor: '#5eaf71',
    },
    unactioveButtonStyle: {
        backgroundColor: 'black',
        borderColor: 'grey',
    },
    vehiclesContainer: {
        flex: 5,
    }

});
