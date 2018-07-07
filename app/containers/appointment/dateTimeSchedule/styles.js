import { StyleSheet, Dimensions } from 'react-native';
import StyleConstants from '../../../config/StyleConstants';

// const window = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonStyle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },
    nextButtonStyle: {
        marginTop: 15,
        borderRadius: 100,
        height: 60,
        backgroundColor: '#28A060',
        borderWidth: 4,
        borderColor: '#70db70',
        justifyContent: 'center',
        alignItems: 'center',
    },
    technicianContainer: {
        height: 85, 
        backgroundColor: 'white',
        borderBottomWidth: 2, 
        borderBottomColor: '#e0e0e0', 
        borderTopWidth: 2, 
        borderTopColor: '#e0e0e0',
        flexDirection: 'row',
        alignItems: 'center',
        // top: 10,
        paddingHorizontal: 20
    },
    radioButtonContainer: {
        paddingHorizontal: 17
    },
    technicianInnerContainer: {
        flex: 1, 
        width: 300, 
        flexDirection: 'row',
        alignItems: 'center',
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
    vehicleFont: { 
        fontSize: 12, 
        color: '#586069',
        // marginHorizontal: 3
    },
    licenceFont: { 
        fontSize: 19, 
        color: '#586069', 
        // fontWeight: 'bold',
        top: 0
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        backgroundColor: '#00000040',
    },
    modalContentContainer: {
        backgroundColor: StyleConstants.LoginButtonBColor,
        height: 350,
        width: Dimensions.get('window').width,
        // borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'flex-start',
    },
     modalHeaderContainer: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        top: 8,
        height: 40,
    },
    cancelContainer: { 
        flex: 1, 
        left: 10 
    },
    titleContainer: { 
        flex: 1, 
        position: 'absolute'
    },
    title: { 
        fontWeight: 'bold', 
        color: '#1a1a1a' 
    },
    modalBodyContainer: {
        position: 'relative',
        // top: 30,
        justifyContent: 'flex-start'
    },
    cardImage: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
    },
    paypalImg: {
        resizeMode: 'contain', 
        width: 80, 
        height: 20 
    },
    boldText: {
        fontWeight: 'bold', 
        color: '#1a1a1a' 
    },
    paymentItem: { 
        flexDirection: 'row', 
        height: 40, 
        alignItems: 'center', 
        borderBottomColor: '#a8a8a8', 
        borderBottomWidth: 1 
    },
    cardBigImage: {
        resizeMode: 'contain', 
        width: 100, 
        height: 100 
    },
    switch: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    container2: {
        backgroundColor: '#333333',
        marginTop: 60,
    },
    label: {
        color: 'black',
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: 'grey',
    },
    technicianInfoContainer: {
        flex: 3,
    },
    ratingContainer: {
        flex: 1,
        flexDirection: 'row',
        top: 7
    },
    availabilityOuterContainer: {
        top: 1, 
        height: 50, 
        backgroundColor: '#333333', 
        flexDirection: 'row',
    },
    availabilityInnerContainer: {
        flex: 5, 
        borderLeftColor: '#fff', 
        borderLeftWidth: 1, 
        marginHorizontal: 10,
        marginVertical: 6
    },
    hourContainer: {
        flex: 1,
        borderLeftColor: '#fff', 
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 6
    },
    hourText: {
        alignItems: 'center',
        fontSize: 18, 
        color: '#fff'
    },
    scrollViewText: {
        fontSize: 18, 
        color: '#fff', 
        paddingHorizontal: 10
    },
    scrollViewSelectedText: {
        backgroundColor: StyleConstants.LoginButtonBColor, 
        borderRadius: 10,
        fontSize: 18, 
        color: '#fff',
        paddingHorizontal: 10
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

