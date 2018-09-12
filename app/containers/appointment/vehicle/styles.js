import { StyleSheet } from 'react-native';

// const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    vehicleContainer: {
        height: 100,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
        borderTopWidth: 2,
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
        // top: 10,
        paddingHorizontal: 12,
    },
    radioButtonContainer: {
        marginRight: 10
    },
    vehicleInnerContainer: {
        flex: 1,
        width: 300,
        flexDirection: 'row',
    },
    selectedArrayItemsBtn: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignSelf: 'stretch'
    },
    nextButtonContainer: {
        paddingBottom: 20,
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
    vehicleFont: {
        fontSize: 15,
        color: '#586069'
    },
    licenceFont: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold'
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    radioButtonHolder: {
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    radioIcon: {
        // borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        marginLeft: 10,
        fontSize: 20
    },
    selectedTextHolder: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectedText: {
        fontSize: 18,
        color: 'white'
    },
    notAvailableContainer: {
        flex: 1,
        alignItems: 'center',
        marginVertical: 20
    },
    notAvailableText: {
        fontSize: 20,
        color: '#1a1a1a',
        paddingTop: 20,
        textAlign: 'center'
    },
    notAvailableImage: {
        width: 72,
        height: 75
    }
});

